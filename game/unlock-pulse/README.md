# Unlock Pulse

**Telegram Mini App game** — 10-second flash rounds teaching UnlockFlow literacy: **Calendar / Lockup / Flow**.

Capital Flow Desk · Apple-clean dark navy + gold · soft CTA to bot `pay_19` · **NFA** · **no Members invite**.

## Play (GitHub Pages)

| | |
|--|--|
| **Live URL** | https://mhr2027r-dotcom.github.io/capital-flow-desk-web/game/ |
| **Repo path** | `capital-flow-desk-web` → `/game/index.html` |
| **Source (desk monorepo)** | `crypto-research-desk/tg-games/unlock-pulse/` |
| **Soft CTA** | https://t.me/CapitalFlowDeskBot?start=pay_19 |

## What you learn

| Lens | Meaning |
|------|---------|
| **Calendar** | When tokens unlock — dates, cliffs ending, schedule rows |
| **Lockup** | Who & how — allocation buckets, linear vest, cliffs |
| **Flow** | What moved — CEX inflows, recipient behavior, sell pressure |

Wedge: *Calendar is input; realized flow is the read.*

## Local preview

```bash
cd tg-games/unlock-pulse
python3 -m http.server 8091
# open http://127.0.0.1:8091/
```

Single file: `index.html` (CSS + JS inlined).

## BotFather — attach as Mini App

**Prefer keeping checkout Mini App at site root.** Attach the game at `/game/` as a second surface (Menu Button label or shareable link), not as a blind replace of Main Mini App unless Operator asks.

1. Open Telegram → [@BotFather](https://t.me/BotFather)
2. `/mybots` → **@CapitalFlowDeskBot**
3. **Bot Settings** → **Menu Button** *or* **Configure Mini App** / create a game Mini App entry if available
4. Set URL to:  
   `https://mhr2027r-dotcom.github.io/capital-flow-desk-web/game/`
5. Title suggestion: `Unlock Pulse`
6. Save. Open the bot → Menu / Mini App → confirm game loads (classify flash cards).

**Deep-link only (no BotFather change):** share the Pages `/game/` URL in Free channel; soft CTA inside opens `t.me/CapitalFlowDeskBot?start=pay_19`.

## Deploy / sync to Pages

```bash
cp tg-games/unlock-pulse/index.html /path/to/capital-flow-desk-web/game/index.html
cd /path/to/capital-flow-desk-web
git add game/ README.md
git commit -m "Add Unlock Pulse Mini App game under /game"
git push origin main
```

Smoke:

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://mhr2027r-dotcom.github.io/capital-flow-desk-web/game/
curl -sS https://mhr2027r-dotcom.github.io/capital-flow-desk-web/game/ | grep -F 'Calendar'
curl -sS https://mhr2027r-dotcom.github.io/capital-flow-desk-web/game/ | grep -F 'pay_19'
```

Expect HTTP 200, Calendar/Lockup/Flow UI, soft CTA `pay_19`, **no** Members invite link.

## Rules (doctrine)

- Soft CTA only → `@CapitalFlowDeskBot?start=pay_19`
- NFA footer always
- Never publish Members channel invite on free / public surfaces
- White-hat · education framing only

## Status

Shipped 2026-09-20 (Asia/Dubai). Portfolio: Unlock Pulse → viral play → bot.
