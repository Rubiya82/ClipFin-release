(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  let language = 'ko', demoType = 'file', step = 0, release = null, releaseError = false;
  const say = (ko, en) => language === 'ko' ? ko : en;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
    return value;
  }
  function validManifest(data) {
    if (!data || data.schemaVersion !== 1 || data.platform !== 'windows-x64' || data.published === false) return false;
    const v = data.version;
    return typeof v === 'string' && /^\d+\.\d+\.\d+$/.test(v) && data.downloadUrl === `https://github.com/Rubiya82/ClipFin-release/releases/download/v${v}/ClipFin-${v}-win-x64.zip` && /^[0-9a-f]{64}$/.test(data.sha256) && /^[0-9a-f]{64}$/.test(data.exeSha256) && Number.isSafeInteger(data.sizeBytes) && data.sizeBytes > 0 && data.sizeBytes <= 134217728 && typeof data.releaseNotes?.ko === 'string' && typeof data.releaseNotes?.en === 'string' && data.signatureAlgorithm === 'ecdsa-p256-sha256' && /^[0-9a-f]{128}$/.test(data.signature);
  }
  async function verifyManifest(data, pem) {
    if (!validManifest(data) || !crypto.subtle) return false;
    const bytes = Uint8Array.from(atob(pem.replace(/-----[^-]+-----|\s/g, '')), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey('spki', bytes, {name: 'ECDSA', namedCurve: 'P-256'}, false, ['verify']);
    const signature = Uint8Array.from(data.signature.match(/../g), x => parseInt(x, 16));
    const payload = {...data}; delete payload.signature;
    return crypto.subtle.verify({name: 'ECDSA', hash: 'SHA-256'}, key, signature, new TextEncoder().encode(JSON.stringify(canonical(payload))));
  }
  function renderRelease() {
    const button = $('download-asset');
    if (!release) {
      button.removeAttribute('href'); button.setAttribute('aria-disabled', 'true');button.textContent=say('배포 파일 확인 중','Checking release');
      $('download-state').textContent = releaseError ? say('현재 배포 정보를 확인할 수 없습니다. 공식 릴리스 페이지에서 확인해 주세요.', 'Release information is unavailable. Please check the official releases page.') : say('공식 배포 정보를 확인하고 있어요.', 'Checking the official release.');
      return;
    }
    button.href = release.downloadUrl; button.setAttribute('aria-disabled', 'false');button.textContent=say('Windows용 다운로드','Download for Windows');
    $('download-state').textContent = say('배포 서명 확인 완료 · 무료 다운로드', 'Release signature verified · free download');
    $('download-version').textContent = `v${release.version}`;
    $('release-meta').hidden = false;
    $('meta-version').textContent = `ClipFin ${release.version}`;
    $('meta-date').textContent = new Date(release.publishedAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US');
    $('meta-size').textContent = `${(release.sizeBytes / 1048576).toFixed(1)} MB · ZIP`;
    $('meta-sha').textContent = release.sha256;
    $('meta-notes').textContent = release.releaseNotes[language];
  }
  function renderDemo() {
    const content = $('demo-content'); content.replaceChildren();
    const art = document.createElement(demoType === 'text' ? 'pre' : 'div');
    art.className = demoType === 'file' ? 'source-file-icon' : demoType === 'image' ? 'source-picture' : 'source-code';
    art.textContent = demoType === 'file' ? 'FILE' : demoType === 'text' ? 'const share = clipboard.copy();\nconst link = clipfin.create(share);\nchat.paste(link);' : '';
    const name = document.createElement('strong');
    name.textContent = demoType === 'file' ? 'Project-assets.zip' : demoType === 'image' ? 'Capture-a8f3.png' : 'Code.text';
    const help = document.createElement('small'); help.textContent = say('설명을 위한 예시 콘텐츠', 'Illustrative content');
    content.append(art, name, help);
    document.querySelectorAll('[data-demo-type]').forEach(button => {const active = button.dataset.demoType === demoType; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));});
    $('demo-toast').disabled = step !== 1; $('demo-paste').disabled = step !== 2; $('demo-message').hidden = step < 3;
    $('demo-status').textContent = step === 0 ? say('먼저 복사를 체험해 보세요.', 'Try copying something first.') : step === 1 ? say('알림을 누르면 공유 링크가 준비돼요.', 'Click the notification to prepare a link.') : step === 2 ? say('이제, 메신저에 붙여넣기.', 'Now paste it into your messenger.') : say('파일 대신 링크로, 공유 완료.', 'A link instead of an attachment. Shared.');
    document.querySelectorAll('[data-step]').forEach(element => element.classList.toggle('active', Number(element.dataset.step) === Math.min(step, 2)));
  }
  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'ko'; document.documentElement.lang = language;
    document.querySelectorAll('[data-ko][data-en]').forEach(element => {element.textContent = element.dataset[language].replace(/\\n/g, "\n");});
    document.querySelectorAll('[data-aria-ko][data-aria-en]').forEach(element => element.setAttribute('aria-label', element.dataset[language === 'ko' ? 'ariaKo' : 'ariaEn']));
    $('language').textContent = language === 'ko' ? 'EN' : '한국어';
    $('language').setAttribute('aria-label', say('Switch to English', '한국어로 변경'));
    try {localStorage.setItem('sailfish-site-language', language);} catch (_) {}
    renderDemo(); renderRelease();
  }
  $('language').addEventListener('click', () => setLanguage(language === 'ko' ? 'en' : 'ko'));
  document.querySelectorAll('[data-demo-type]').forEach(button => button.addEventListener('click', () => {demoType = button.dataset.demoType; step = 0; renderDemo();}));
  $('demo-copy').addEventListener('click', () => {step = 1; renderDemo();});
  $('demo-toast').addEventListener('click', () => {if (step === 1) {step = 2; renderDemo();}});
  $('demo-paste').addEventListener('click', () => {if (step === 2) {step = 3; renderDemo();}});
  $('download-asset').addEventListener('click', event => {if (!release) event.preventDefault();});
  document.querySelectorAll('[data-preview-theme]').forEach(button => button.addEventListener('click', () => {
    const theme = button.dataset.previewTheme; $('theme-preview').dataset.theme = theme;
    $('theme-logo').src = `assets/clipfin-${theme}.png`;
    document.querySelectorAll('[data-preview-theme]').forEach(item => {const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));});
  }));
  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('has-observer');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible'); observer.unobserve(entry.target);}}), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }
  const progress = document.querySelector('.scroll-progress'); let queued = false;
  function scrollProgress() {const height = document.documentElement.scrollHeight - innerHeight; if (progress) progress.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`; queued = false;}
  addEventListener('scroll', () => {if (!queued) {queued = true; requestAnimationFrame(scrollProgress);}}, {passive: true});
  addEventListener('resize', scrollProgress); scrollProgress();
  try {language = localStorage.getItem('sailfish-site-language') || 'ko';} catch (_) {}
  setLanguage(language);
  Promise.all([fetch('clipfin-version.json', {cache: 'no-cache'}).then(r => {if (!r.ok) throw Error('manifest'); return r.json();}), fetch('update-public-key.pem', {cache: 'force-cache'}).then(r => {if (!r.ok) throw Error('key'); return r.text();})]).then(async ([data, key]) => {
    if (!await verifyManifest(data, key)) throw Error('signature'); release = data; renderRelease();
  }).catch(() => {releaseError = true; renderRelease();});
  window.ClipFinSite = {validManifest, verifyManifest, setLanguage, getState: () => ({language, step, demoType, releaseReady: !!release})};
})();
