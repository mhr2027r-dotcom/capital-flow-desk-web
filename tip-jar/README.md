# Desk Tip Jar

**Desk Tip Jar** is a design-first Telegram Mini App page for optional tips that support Capital Flow Desk (research + games desk). Soft CTA only — never guilt, never fake urgency, never blocks browsing. Tips use **Telegram Stars** via `WebApp.openInvoice` when a real invoice link is configured. **$0 ads**, no wallet-connect phishing, no dark patterns.

## Status (Converter)

**Stars tip invoice is LIVE** (50★ Desk Tip Jar · payload `desk_tip:jar:v1` · zero entitlement).

- Invoice URL: `https://t.me/$ic3mYzz2eFG1BQAAH_XBWPvgUQA`
- Wired into `index.html` → `STARS_INVOICE_LINK`
- Dedicated tip SKU — **not** UnlockFlow Flash Brief (49★)
- Host/Pages redeploy may still be needed for public Mini App; local file is set


## What it is

- Static, self-contained `index.html` (HTML + CSS + JS)
- Navy + gold premium desk aesthetic (Apple-clean, mobile-first ~390px)
- Works as a plain GitHub Pages page; Telegram features activate inside Telegram
- Preset tip chips (50 / 100 / 250 / 500 ★) are **visual until** an invoice link exists
- Until the link is set: CTA shows **Coming soon** / **Open in Telegram to tip** and never crashes

## How to set the Stars invoice link

1. Create a Stars invoice with your bot (official Bot API only), e.g.:
   - [createInvoiceLink](https://core.telegram.org/bots/api#createinvoicelink) with currency `XTR` (Telegram Stars), **or**
   - Your Converter / payments tool that returns a Stars invoice URL / slug Telegram accepts in `openInvoice`
2. Copy the returned invoice link (or payload string your bot expects for `openInvoice`).
3. Open `index.html` and set the constant near the top of the script:

```js
var STARS_INVOICE_LINK = "https://t.me/$YourInvoiceLinkHere";
var INVOICE_PLACEHOLDER = STARS_INVOICE_LINK;
```

4. Redeploy / push to GitHub Pages.
5. Open the Mini App **inside Telegram** and tap **Tip with Stars** — it calls `Telegram.WebApp.openInvoice(link, callback)`.

**Until the link is filled:** leave `STARS_INVOICE_LINK = ""`. The button stays soft (“Coming soon”); chip taps explain tips aren’t live yet. No crash outside Telegram.

**Security:** never put the bot HTTP API token in this front-end. Invoice creation stays on the bot / Converter side.

## GitHub Pages host steps

1. Put this folder in a GitHub repo (standalone or under `tg-games/tip-jar/` in an existing desk repo).
2. Push:

```bash
git add tg-games/tip-jar
git commit -m "Ship Desk Tip Jar Mini App"
git push origin main
```

3. Repo → **Settings → Pages**
4. **Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main` (or `gh-pages`), folder `/` or `/docs` as appropriate
5. After deploy, confirm HTTPS URL, e.g.:
   - `https://<username>.github.io/<repo>/`
   - or `https://<username>.github.io/<repo>/tg-games/tip-jar/`
6. Smoke-open the URL in a browser — page should load with “Coming soon” until the invoice is set.

HTTPS is required for Telegram Mini Apps; GitHub Pages provides it.

## BotFather Mini App / menu button steps

White-hat, official Bot API path only.

1. Open [@BotFather](https://t.me/BotFather) → `/mybots` → select your bot (e.g. `@CapitalFlowDeskBot`).
2. **Bot Settings** → **Configure Mini App** / **Main Mini App** and/or **Menu Button**.
3. Paste the GitHub Pages HTTPS URL that serves this `index.html`.
4. Optional: short title “Desk Tip Jar”, description, photo.
5. In Telegram, open the bot → tap menu / Mini App — Tip Jar should launch.
6. Alternate: `/setmenubutton` with the same HTTPS URL.

### Gotchas

- URL **must be HTTPS** (no `http://`, no `file://`).
- Trailing slash vs not can matter — test both if the app fails to load.
- Never embed bot tokens in `index.html`.
- Stars invoice must be created by **your** bot for `openInvoice` to succeed for that bot’s users.
- `telegram-web-app.js` loads from Telegram’s CDN; offline / plain browser still shows the static page with graceful fallbacks.

## Local preview

```bash
cd tg-games/tip-jar

# Option A — open the file
open index.html          # macOS
xdg-open index.html      # Linux

# Option B — static server
python3 -m http.server 8080
# visit http://localhost:8080
```

Fully usable as a static demo. Telegram theme, haptics, and `openInvoice` activate when opened inside Telegram with a real invoice link.

## Files

```
tip-jar/
  index.html   # self-contained Tip Jar page
  README.md    # this file
```

## License note

Ship and host for the desk / community. Keep it white-hat: no phishing, no fake wallets, no ads, no malware.
