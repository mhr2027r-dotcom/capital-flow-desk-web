# CFD Agent Feed — UnlockFlowEvent v1

**Product:** Capital Flow Desk Data API (SKU B)  
**Admin:** [@Mohammad_GNA](https://t.me/Mohammad_GNA)  
**Schema:** Scout-approved **UnlockFlowEvent** `schema.json` · `schema_version: "1"`  
**Pricing (draft):** **99 USDT/mo** Starter · **299 USDT/mo** Pro — see `../PRODUCTS.md`. Access is **keyed by admin after Tx confirm** (not an instant self-serve live feed).  
**No API tokens in this repo.**

## Wedge

**Supply shock → capital-flow judgment.**

Calendar unlock size is the *input*. Realized recipient behavior, CEX inflow context, float depth, and falsifiable invalidation are the *read*. We are not another unlock calendar API.

Horizons: `T-30` · `T-7` · `T-48h` · `T0` · `T+7`.

## Beat-lines (vs category)

| Player | What they sell | CFD Agent Feed difference |
|--------|----------------|---------------------------|
| **Tokenomist** | Unlock calendars / vesting schedules | We emit **judgment** (sell-pressure score + invalidation + evidence), not just schedule rows |
| **Delphi** | Long-form human research | We ship **machine-stable JSON** for bots/MCPs — same desk DNA, agent-native surface |
| **Liquid State** | Market / liquidity analytics | We specialize the **unlock×flow window** with horizon passes and recipient-to-CEX framing |
| **Nansen / Arkham** | Labels, wallet intel, broad on-chain | We package **desk-curated unlock pressure** with precision grade + sources — fuel, not raw explorer noise |
| **DefiLlama** | TVL / stables / protocol metrics | We use float/stable context as *support*; product is **supply-shock flow judgment**, not aggregate dashboards |

## Artifact

| File | Role |
|------|------|
| `schema.json` | JSON Schema **UnlockFlowEvent** v1 (+ embedded example) |
| `example-unlock-event.json` | Standalone **illustrative** sample (`illustrative: true`) |
| `sample-week.json` | Public **sample week** envelope (multi-event) for buyers to preview before pay |

Legacy weekly-brief `example-issue.json` removed in favor of UnlockFlowEvent.

## Field map (v1)

- **Identity:** `event_id`, `schema_version`, `asset`, `asset_name`, `chain`, `contract_address?`
- **Timing:** `unlock_ts`, `horizon`, `observed_at`, `update_freq`
- **Size:** `value_usd`, `amount_tokens`, `pct_circulating`, `vtmc`, `float_depth_usd?`
- **Allocation:** `allocation[{bucket,pct,recipient_label?,vesting_type?}]`, `vesting_type`, `precision_grade`
- **Flow judgment:** `sell_pressure_score`, `confidence`, `cex_inflow_z?`, `recipient_to_cex?`, `pre_event_drift_note`, `invalidation`, `evidence[]`
- **Provenance:** `sources[{name,url?,retrieved_at}]`, `human_memo_ref?`, `disclaimer` (`"NFA"`), `webhook_topic` (`cfd.unlock_flow.v1`)

## Suggested MCP tool surface (draft)

No live endpoints or tokens are published here. Wire against your own authenticated URL after onboarding with @Mohammad_GNA.

```text
tool: cfd_get_unlock_events
  args: asset?:string, horizon?:enum, since?:datetime
  → GET {FEED_BASE}/v1/unlock-events
  → application/json  (UnlockFlowEvent[] )

tool: cfd_get_unlock_event
  args: event_id:string
  → GET {FEED_BASE}/v1/unlock-events/{event_id}

tool: cfd_get_schema
  → GET {FEED_BASE}/v1/schema  (or ship schema.json in-repo)
```

### Pro webhook (draft)

`POST` to subscriber URL on publish / horizon refresh:

```http
POST /hooks/cfd-unlock-flow
Content-Type: application/json
X-CFD-Signature: sha256=…   # TBD HMAC over raw body
X-CFD-Topic: cfd.unlock_flow.v1
X-CFD-Event-Id: uf_…

{ … UnlockFlowEvent … }
```

Verify signature before ingest. Retry with exponential backoff on non-2xx.

## Agent usage rules

1. Always surface `disclaimer` (`NFA`) to end users.  
2. Prefer `invalidation` + `evidence[]` when summarizing risk.  
3. Do not convert `sell_pressure_score` into buy/sell instructions.  
4. Cite `sources[]` when surfacing numbers; respect `precision_grade`.  
5. `confidence` is editorial framing confidence — not trade confidence.  
6. Ignore payloads with `illustrative: true` for live decisions.

## Soft discovery (optional)

After you preview `sample-week.json` / `schema.json`, these are **optional** bot deep links — gratitude and plan discovery only. **Zero entitlement.** No Members invite on this page. **NFA.**

| Action | Link |
|--------|------|
| Free channel (UnlockFlow drills) | https://t.me/CapitalFlowDeskHQ |
| Members intro **19** USDT (bot checkout) | https://t.me/CapitalFlowDeskBot?start=pay_19 |
| **Desk Tip Jar** · 50★+ (Stars · gratitude only · no unlock) | https://t.me/CapitalFlowDeskBot?start=tip |
| Tip Jar Mini App page | [../tip-jar/](../tip/) |

Tips never unlock Agent Feed access. Paid feed onboarding stays with [@Mohammad_GNA](https://t.me/Mohammad_GNA) after USDT confirm.

## Onboarding

1. DM [@Mohammad_GNA](https://t.me/Mohammad_GNA) — subject: Agent Feed / UnlockFlowEvent.  
2. Pay draft tier in USDT TRC-20 to `TNY3pyHMVeJ3Ac5RXWuEigj11wPWnggs2t`.  
3. Receive feed credentials / drop method (**no tokens in this repo**).  
4. Validate payloads against `schema.json`.

*Not financial advice.*
