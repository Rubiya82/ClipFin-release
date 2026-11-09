# ClipFin · Clipboard share

Free clipboard sharing and peer messages for reachable intranet networks, built for Windows 11 x64 with Windows 10 x64 support.

**Product website:** https://rubiya82.github.io/ClipFin-release/

**Download:** use the `ClipFin-<version>-win-x64.zip` asset in [Releases](https://github.com/Rubiya82/ClipFin-release/releases). GitHub's automatically generated source archives are not the Windows program.

This public repository hosts the product website, release assets, signed `version.json`, public verification key and notices. Application source is maintained privately. No shared files or conversations are hosted here.

- One EXE, Korean/English, light/dark.
- Copy → notification click → paste a link, or drop files to share.
- Browser download/preview/text copy; native parallel/resumable reception.
- Direct peer messages, contact aliases and receive refusal.
- User-controlled verified updates: download first, then update now or at actual quit.

Intranet routing must allow direct connections. Senders must remain online. File sharing uses HTTP; peer messages use mutually authenticated TLS 1.3 after both users verify the matching code. See the [release and update policy](https://rubiya82.github.io/ClipFin-release/policy.html).

Seokwon Choi 2026. Third-party notices: [JSON](licenses/JSON-LICENSE.txt), [miniz](licenses/MINIZ-LICENSE.txt).

From 1.0.1: TLS 1.3 peer messages with mutual device certificates and an explicit first-contact verification code. Both peers must update and approve the matching code. Local records use current-user DPAPI and device private keys stay nonexportable in Windows CNG. File sharing remains HTTP.

Android: separately signed release APKs use `android-v<version>` tags and `android/version.json`. Same-signer increasing-versionCode updates preserve app data and require Android installer approval. The Windows update manifest stays separate.

Windows 1.0.4 / Android 1.0.1: left/right conversation bubbles, message timestamps and delivery state, compact conversation controls and a fixed composer. Windows client fonts use fixed 96-DPI pixel sizes to avoid text-only growth at 125% display scaling.

Windows 1.0.41: choose a sharing network from the menu or sharing IP. Automatic selection prefers connected physical Wi-Fi, then Ethernet, with Windows-confirmed Internet access preferred within each type; manual adapter selection persists across restarts. Successful link creation clears the pending file selection, and browser code previews are improved. Direct mouse testing is deferred to the user; isolated popup and command checks passed. Android stays on 1.0.36. [Network recovery guide](network-recovery.html) · [User manual](manual.html) · [PDF, base 1.0.36](manual.pdf).

Windows 1.0.42: sent messages show the number of recipients who have not read them next to Delivered. Direct chats start at 1; group chats count the recipients at send time. The count decreases once per reader and disappears when everyone has read. Both Windows peers need 1.0.42 or later. Read receipts are protected locally and retried after reconnecting. Android remains 1.0.36 and does not send read receipts.

Windows 1.0.43: defer automatic conversation, contact, read-status and preview updates while composing a draft, and apply native Unicode Edit IME result/focus handling. Text/IME messages bypass tooltip/dialog work, with less scrollbar drawing during input. The reported Korean IME delay, reordered input and separated jamo have not yet been reproduced and confirmed resolved with actual user IME input. Web images display at their original dimensions, scrolling large images without enlarging small ones. Android remains 1.0.36.

Windows 1.0.44: send Excel cell ranges as table messages and copy values with formatting back to Excel (both Windows peers need 1.0.44). Organize personal contact groups, export/share/import address books with a preview, and use themed address-book dialogs. Imported contacts still require recipient acceptance and mutual verification before conversation. Android remains 1.0.36.

Windows 1.0.45: move address-book contacts into one personal group using drag-and-drop or the contact context menu. Ungrouped clears membership; changes save immediately. Existing multiple memberships retain the first recorded group. Imports preserve existing personal assignments. Direct user-desktop mouse verification was not completed because app access approval timed out; isolated UI and command checks are covered. Android remains 1.0.36.

Windows 1.0.46: refreshed messenger layout with avatars, bubbles and a rounded composer; add Light / Dark / Messenger theme selection. Existing Light/Dark RGB colors, settings and messaging formats remain compatible. Isolated clipboard, TLS and updater checks passed; physical multi-monitor DPI and direct user-desktop pointer/IME verification remain for user review. Android remains 1.0.36.

Windows 1.0.47: restore visible Messenger-theme main tab backgrounds, replace message button drawings with high-resolution Fluent icons, and use Malgun Gothic in message windows. Header X now dismisses the active conversation without hiding the window; history and drafts are retained, and incoming messages leave the dismissed view empty until selection. Existing Light/Dark main-screen pixels remain identical. Android remains 1.0.36. [Fluent System Icons license](licenses/FLUENT-SYSTEM-ICONS-LICENSE.txt).

Windows 1.0.48: complete the 12 zodiac profile animals; fix the final read group remaining in Unread; add visible new-group creation and add-people flows from direct chats while preserving the original history; show participant avatars, presence and invitation status; initialize messaging for mutual contact registration when receiving shared files. Approval and refusal settings are preserved. Android remains 1.0.36.

Windows 1.0.49: reduce embedded logos to 256×256 while preserving the 1254px originals privately, and losslessly compress all 31 profile PNGs with identical RGBA pixels. The single Windows EXE shrinks from about 12.44MB to 10.53MB. Android remains 1.0.36.
