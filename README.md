# Sailfish · Clipboard share

Free Windows 11 x64 clipboard sharing and peer messages for reachable intranet networks.

**Product website:** https://rubiya82.github.io/sailfish-release/

**Download:** use the `Sailfish-<version>-win-x64.zip` asset in [Releases](https://github.com/Rubiya82/sailfish-release/releases). GitHub's automatically generated source archives are not the Windows program.

This public repository hosts the product website, release assets, signed `version.json`, public verification key and notices. Application source is maintained privately. No shared files or conversations are hosted here.

- One EXE, Korean/English, light/dark.
- Copy → notification click → paste a link, or drop files to share.
- Browser download/preview/text copy; native parallel/resumable reception.
- Direct peer messages, contact aliases and receive refusal.
- User-controlled verified updates: download first, then update now or at actual quit.

Intranet routing must allow direct connections. Senders must remain online. File sharing uses HTTP; peer messages use mutually authenticated TLS 1.3 after both users verify the matching code. See the [release and update policy](https://rubiya82.github.io/sailfish-release/policy.html).

Seokwon Choi 2026. Third-party notices: [JSON](licenses/JSON-LICENSE.txt), [miniz](licenses/MINIZ-LICENSE.txt).

From 1.0.1: TLS 1.3 peer messages with mutual device certificates and an explicit first-contact verification code. Both peers must update and approve the matching code. Local records use current-user DPAPI and device private keys stay nonexportable in Windows CNG. File sharing remains HTTP.

Android: separately signed release APKs use `android-v<version>` tags and `android/version.json`. Same-signer increasing-versionCode updates preserve app data and require Android installer approval. The Windows update manifest stays separate.

Windows 1.0.4 / Android 1.0.1: left/right conversation bubbles, message timestamps and delivery state, compact conversation controls and a fixed composer. Windows client fonts use fixed 96-DPI pixel sizes to avoid text-only growth at 125% display scaling.
