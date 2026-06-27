# Case Study: AI Voice Receptionist for Med Spas

## The Problem: Every Missed Call Is Lost Revenue

Med spas operate in a high-intent, appointment-driven market where **the phone call is the sale**. A prospective client searching "Botox near me" or "lip filler consultation" is ready to book — if someone answers.

The reality for most med spas:

| Metric | Industry Average | Source |
|--------|-----------------|--------|
| Missed inbound calls | 25-40% | Medical spa industry benchmarks |
| Average booking value (injectables) | $650-$900 | Per-syringe filler pricing |
| Average booking value (facials) | $199-$350 | HydraFacial / chemical peel range |
| Monthly missed-call revenue loss | $8,000-$25,000 | Based on 30-80 missed calls/month at avg. booking value |
| Cost of a full-time receptionist | $3,500-$5,000/month | Salary + benefits + training + turnover |

Front desks are busiest during treatment hours — the same hours when calls peak. Staff are checking clients in, processing payments, answering in-person questions. The phone rings, goes to voicemail, and a $750 lip filler appointment walks to a competitor who picked up.

Voicemail callback rates in med spas average **12-18%**. The caller already found someone else.

---

## The Solution: Maya — 24/7 AI Receptionist That Books, Confirms, and Reports

Maya is a production-grade voice AI receptionist built specifically for med spas. She answers every inbound call within 3 rings, handles the full booking conversation, creates appointments against the spa's real schedule, and sends SMS confirmations — all while the owner watches it happen live on a dashboard.

### What Maya Does on Every Call

**1. Identifies the caller**
- Returning client? Maya greets them by name, knows their preferred provider, flags VIP status, and notes sensitivities ("Prefers natural lip filler results. Sensitive to lidocaine.")
- New caller? Treated warmly as a first-time visitor.

**2. Handles service inquiries with real pricing**
- 13 service categories: Botox (full treatment, lip flip), lip filler, cheek filler, HydraFacial (2 tiers), chemical peel, IPL photofacial, laser hair removal, CoolSculpting, IV hydration, and free consultations.
- Always quotes ranges with units: "Botox runs about $14-18 per unit; most lip flips use 4-6 units, so roughly $60-110."
- Flags services requiring consultation for new clients.

**3. Checks real-time availability**
- Queries actual provider schedules (4 providers: NP, MD, esthetician, laser specialist).
- 15-minute slot granularity across Mon-Sat operating hours.
- Respects provider-service qualifications (e.g., only injectors can do Botox).
- Offers 2 specific options: "I can do Thursday at 2pm with Jessica or Friday at 10am with Dr. Chen — which works better?"

**4. Books the appointment**
- Transaction-safe creation (prevents double-booking under concurrent calls).
- Captures first name, phone; last name and email optional (no friction).
- Estimates appointment value from service pricing for ROI tracking.

**5. Sends SMS confirmation within 10 seconds**
```
Hi Sarah! You're confirmed at Aura Med Spa for Lip Filler 
with Jessica Martinez, NP on Thursday, Jan 9 at 2:00 PM. 
Address: 142 Greene Street, New York, NY 10012. 
Reply STOP to opt out.
```

**6. Handles edge cases with dignity**
- Medical questions → deflects to free nurse consultation.
- Existing appointment changes → warm transfer to staff.
- Complaints or frustration → immediate warm transfer.
- Non-English caller → warm transfer.
- Pricing pushback → quotes ranges, steers toward free consultation.

### What the Owner Sees: Real-Time Dashboard

**ROI Dashboard (auto-refreshes every 30 seconds):**
- Calls answered (30-day rolling)
- Bookings made
- Revenue captured (sum of estimated appointment values)
- Conversion rate (bookings / calls)
- Average call duration

**Live Call View (the demo closer):**
The owner watches Maya's conversation stream in real-time — both sides of the transcript appear on screen as the call happens. In a sales demo, the prospect calls the number, then watches their own words appear on the dashboard within seconds.

**Call History:**
- Every call logged with outcome: booked, transferred, info only, voicemail, failed.
- Full transcript playback (text).
- Audio recording playback (MP3, stored in cloud).
- Tool call log (what Maya queried, what she found, how long it took).

**Bookings View:**
- Client name, phone, service, provider, date/time, estimated value.
- Desktop table + mobile cards.
- 15-second auto-refresh.

---

## Quantified Value: The Math for a Typical Med Spa

### Conservative Scenario (Small Spa, 50 Calls/Month)

| Metric | Without Maya | With Maya |
|--------|-------------|-----------|
| Inbound calls answered | 60-75% (30-38 of 50) | 100% (50 of 50) |
| Calls that convert to bookings | 12-15 | 20-25 |
| Average booking value | $450 | $450 |
| Monthly revenue from phone bookings | $5,400-$6,750 | $9,000-$11,250 |
| **Monthly revenue recovered** | — | **$3,000-$5,500** |
| Maya monthly cost | — | $1,500 |
| **Net monthly gain** | — | **$1,500-$4,000** |
| **ROI** | — | **2x-3.7x** |

### Growth Scenario (Busy Spa, 150 Calls/Month)

| Metric | Without Maya | With Maya |
|--------|-------------|-----------|
| Inbound calls answered | 60-75% (90-113 of 150) | 100% (150 of 150) |
| Calls that convert to bookings | 36-45 | 60-75 |
| Average booking value | $500 | $500 |
| Monthly revenue from phone bookings | $18,000-$22,500 | $30,000-$37,500 |
| **Monthly revenue recovered** | — | **$10,000-$17,000** |
| Maya monthly cost | — | $2,500 |
| **Net monthly gain** | — | **$7,500-$14,500** |
| **ROI** | — | **4x-6.8x** |

### Break-Even Analysis

At $1,500/month, Maya pays for herself with **3-4 recovered bookings** (at average $450/booking). A med spa missing 25% of 50 monthly calls loses 12+ potential bookings — Maya needs to capture fewer than a third of those to break even.

---

## What Makes This Different

### vs. Generic AI Answering Services
- Maya knows med spa services, pricing structures (per-unit, per-syringe, flat-rate), and when to deflect medical questions to a nurse consultation.
- Real-time availability checking against actual provider schedules — not "someone will call you back."
- Appointment created in the system before the call ends. SMS confirmation arrives while the caller is still saying goodbye.

### vs. Hiring Another Receptionist
- $1,500/month vs. $3,500-$5,000/month (salary + benefits + training + turnover).
- Available 24/7 including evenings, weekends, and holidays — peak inquiry times when no one is at the desk.
- Never calls in sick, never puts callers on hold, never has a bad day.
- Handles concurrent calls (a receptionist handles one at a time; Maya handles all of them).

### vs. Voicemail + Callback
- Voicemail callback conversion: 12-18%. Maya's live conversion: 40-50%.
- The caller already chose you by dialing. They haven't chosen you by leaving a voicemail — they're still shopping.

---

## Technical Architecture

```
Caller dials Twilio number
   │
   ▼
Twilio (PSTN) → Vapi (orchestration)
   ├─ Deepgram nova-3 (speech-to-text)
   ├─ Claude Sonnet 4 (reasoning + conversation)
   └─ Cartesia sonic-2 (text-to-speech, professional female voice)
   │
   │  Mid-call HTTPS tool calls
   ▼
Fastify Backend (Fly.io)
   ├─ lookup_client     → recognize returning callers
   ├─ list_services     → query services + pricing
   ├─ get_availability  → real-time slot checking
   ├─ create_appointment → transactional booking
   └─ transfer_to_human → warm handoff to staff
   │
   ├──→ Postgres (Supabase): clients, services, providers, appointments, calls
   ├──→ Twilio SMS: instant booking confirmation
   ├──→ Cloudflare R2: call recordings
   └──→ SSE: live dashboard updates

Next.js Dashboard (Vercel)
   └──→ ROI metrics, live call view, call history, bookings, recordings
```

### Key Design Decisions
- **Adapter pattern for PMS integration**: swap the demo database for Boulevard, Mindbody, or Vagaro without changing the AI agent or tools.
- **Transaction-safe bookings**: database transactions prevent double-booking when two callers request the same slot simultaneously.
- **Timezone-aware scheduling**: all availability logic operates in the spa's local timezone; stores as UTC.
- **Graceful degradation**: if SMS fails, the booking still succeeds. If recording upload fails, the call data still logs. No single failure breaks the flow.

---

## Deployment Timeline

| Phase | Timeline | Deliverable |
|-------|----------|-------------|
| Account setup (Twilio, Vapi, Supabase) | Day 1 | Phone number, voice agent, database |
| Spa configuration (services, providers, hours) | Day 1-2 | Customized to the specific med spa |
| Testing + voice tuning | Day 2-3 | End-to-end call testing, tone calibration |
| Go live | Day 3 | Real calls answered by Maya |
| Dashboard training | Day 3-4 | Owner shown ROI dashboard, call review, bookings |

**Time to first answered call: 3 days.**

---

## Who This Is For

- **Med spa owners** losing revenue to missed calls during busy treatment hours.
- **Multi-location med spa groups** needing consistent phone coverage across locations without scaling front-desk headcount linearly.
- **Med spa marketing agencies** offering AI receptionist as a value-add to their advertising clients — the agency drives calls, Maya converts them.

---

## Summary

| | Before Maya | After Maya |
|---|---|---|
| Calls answered | 60-75% | 100% |
| After-hours coverage | None (voicemail) | Full — 24/7/365 |
| Time to book | Callback next business day | Booked during the call |
| SMS confirmation | Manual or never | Automatic, within 10 seconds |
| Revenue visibility | Unknown | Real-time dashboard |
| Monthly cost | $3,500-$5,000 (receptionist) | $1,500-$2,500 |
| Concurrent call handling | 1 at a time | Unlimited |
| Break-even | — | 3-4 bookings/month |
