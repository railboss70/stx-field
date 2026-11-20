# STX Field

One phone app for STX supervisors and foremen. It opens to a home screen with three buttons:

| Button | What it is | Folder |
|---|---|---|
| **Tool Trailer Inventory** | Weekly tool trailer inspection → signed PDF | `trailer/` |
| **Daily Report** | Daily Project Summary → PDF to reports@stxrailroad.com | `daily/` |
| **Visa Summary** | Code Synovus Visa charges, attach receipts → one packet PDF | `visa/` (built from `source/visa/`) |

Live at **https://railboss70.github.io/stx-field/**

The home screen also shows:
- **"Good morning, [first name]"** using the name already saved in Tool Trailer or Daily Report (or Visa).
- **Unfinished work** on each button: an inspection in progress, unsent daily drafts, Visa charges still to code. Otherwise it shows the last one done.
- **Help:** Call or Text Matthew Pitsenbarger (470-755-4860).
- **Version** at the bottom, and a green **"new version is ready → Update"** bar when you push a change.

Inside each app, a **Home tab** sits on the left edge. Tap once to open "Back to STX Home", tap again to go home.

## Put it on a phone
- **iPhone:** open the link in **Safari** → **Share** → **Add to Home Screen** → name it **STX Field**.
- **Android:** open the link in Chrome → **⋮** → **Add to Home screen**.

## These are copies
The apps in this repo are **copies** of `stx-tool-trailer-inspection`, `stx-daily-summary` and
`stx-visa-packet`, made on Nov 20, 2026. Those original apps and their links were not changed and keep
working. **Make future changes here**; the originals are frozen.

The copies share saved data with the originals on the same phone browser (same website), except on
iPhone home-screen apps, where each icon keeps its own data. If you ever change how an app saves its
data, give the STX Field copy new storage names first.

## Making changes
| To change… | Edit | Then |
|---|---|---|
| Home screen (buttons, help contact, wording) | `index.html` | bump `APP_VERSION` in `index.html` **and** `VERSION` in `sw.js` |
| Tool Trailer | files in `trailer/` (see the table in the original repo's README) | bump `VERSION` in `trailer/sw.js` |
| Daily Report | `daily/app.js`, `daily/index.html` | bump `CACHE` in `daily/sw.js` |
| Visa | source in `source/visa/src/` | build it (below) |
| Icon | `assets/icon-1024.png` is the master; the other sizes are made from it | bump versions as above |

Keep `home-button.js` (in `trailer/js/`, `daily/`, `source/visa/public/`) and the line that loads it in each
app's `index.html`. If the Home tab disappears after a change, that line is what went missing.

### Building Visa
```bash
cd source/visa
npm ci
npm run build:pages     # writes the finished app into ../../visa/
```
Commit both `source/visa/` and `visa/`. The Visa version number is `APP_VERSION` in
`source/visa/src/routes/index.tsx`. The Visa training example (July 31) is under Visa → Settings → Training.

## Adding another app later
1. Copy its files into a new folder (e.g. `transfer/`).
2. In that app's `index.html`: load `./home-button.js`, and point `rel="manifest"` and `apple-touch-icon` at `../`.
3. Give its service worker cache names that start with `stx-field-<app>-` and only delete its own.
4. Add an `<a class="tile">` to the home screen `index.html` and bump the versions.

## Hosting
GitHub Pages → Settings → Pages → Deploy from a branch → **main / (root)**.
