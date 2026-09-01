# Fronz practice — internal operating one-pager

Internal only. Not site copy. Drafted 31 Aug 2026 after the brand pass and the first two courtships (Compass, Ramona).

The job of this page: stop donating the sprint, stop using over-prep as the salesperson, and let the Starter plus a hard intro be the only thing that runs when you are in the work.

Public site stays as-is until one paid sprint has kept the unpaid cap. Then decide whether the advertised entry is still the $1,500 Jam or this sprint container.

---

## 1. The container (what you sell)

Two paid motions. Same spine. Flavors change; the container does not.

**GTM Clarity** and **Groundswell** are lenses inside the spine, not two funnels you have to feed.

### Sprint — the way in

| | |
|---|---|
| Price | $3,500 |
| Time | 2 weeks |
| Your hours | 15 per week, 30 cap |
| Their hours | Named at kickoff. A number, not “you’ll be involved.” |
| Leave-behinds | Named at kickoff, based on this client. Not a fixed PDF kit. |
| Exit | Initial data exists. Ugly counts. That is the handoff, not a reason to keep working unpaid. |

Spine inside the two weeks:

1. Positioning and product pitch
2. Strategy
3. First tests
4. Collect initial data (defined with the client at kickoff)
5. Leave-behinds they can act on Monday after week 2

Research, app vetting, and first strategy live **here**. Not on the free call.

### Scoped follow-on — the way through

Custom price. Same weekly accountability. Same hands-on rule.

Spine:

1. Interpret the sprint data
2. Execute against it
3. Set up learning loops (product and messaging)
4. Iterate, ship, expand

No magic pills. If they will not stay in the work, you do not start. You are not their team.

---

## 2. Circuit breakers (before anyone is paid)

These are the practice rules. Merge will argue with every one of them. Keep them anyway.

**Free intro = 20 minutes.** Their completed Starter. You do not fill it in. If they skipped it, that is homework, not your hour.

**Unpaid cap = 45 minutes** to read what they sent, per live opportunity. Clock stops. Want more? That is week 1 of a paid sprint.

**No spec work.** No custom research, app audit, or proposal deck before kickoff. The call produces a yes/no on the container and a short read of what you heard (one paragraph, written in the call or immediately after). The workup is a sprint deliverable.

**One courtship at a time** until two sprints have run at this cap. Two parallel unpaid workups is how the pipeline dies.

**Hands-on is a gate.** Kickoff names their hours and decision rights. They own the call on position and tests. You do not make the call for them so the room feels finished.

---

## 3. Waitlist (capacity is the feature)

When a sprint is active, or when two weeks of 15 hrs are already committed, you are not “quietly available.” You are on a waitlist.

What the waitlist is:

- Next sprint start date (a real date, even if it moves once)
- Required: GTM Clarity Starter done
- Required: 20-minute intro booked into the **held weekly slot** (see §4)
- Message: “Next sprint starts [date]. Do the Starter. Book the intro.”

What the waitlist is not:

- A fake scarcity play while you still Merge into a third unpaid workup
- A content drip you have to write while delivering

If the intro calendar is empty because you cancelled it to stay in Compass, the waitlist is theater. Protect the slot.

---

## 4. What sells while you are in a sprint

There is no one else selling. So only assets that do not need live over-functioning get to be the funnel.

1. **Starter, always on.** Front door. Do not replace it with custom PDFs.
2. **One 20-minute intro hold per week, including during a sprint.** Miss it and the funnel is you again.
3. **Exit intros.** Every sprint exit review asks for two introductions. That is recirculation.

Do not, this quarter: a content engine, a second lead magnet, or a Groundswell campaign for Fronz. Those are more artifacts.

### Blocker — email capture is on the wrong stack

The homepage Starter form (`/api/lead`) and the “send your map” form (`/api/starter`) both write to **Customer.io** using `CUSTOMERIO_SITE_ID` / `CUSTOMERIO_TRACK_API_KEY`. Delivery comment in the lead form: sending domain is not verified; people still get the Starter by redirect to `/starter`. Capture can fail and they still pass through. That means:

- The list that should be the waitlist / Starter list may be empty, mixed with another workspace, or undeliverable.
- A waitlist you cannot email is a spreadsheet you will not open.

**Must migrate before the waitlist is real.** Either:

- A **dedicated Fronz Customer.io workspace** (not the current account), with a verified sending domain on fronzz.com or a Fronz subdomain, **or**
- A **separate system** (list + transactional send) whose only job is Starter delivery, waitlist, and intro reminders.

Until that ships: Starter still lives as a public page. Intros still book on Calendly. Waitlist is a dated note plus people who booked, not an email campaign. Do not build the campaign on the current CIO account.

---

## 5. Merge budget (nervous system as a number)

Track next to hours, same as burn.

| This week | Cap |
|---|---|
| Unpaid pre-work, all live opportunities | 1.5 hrs total |
| Unpaid pre-work, per opportunity | 45 min |

If you go over: name it in the recap. “That was sprint labor. Invoice or stop.”

After two paid sprints: if unpaid is still ~5 hours per courtship, the intro is still mis-scoped. That is not “still refining.”

---

## 6. This week vs later

**This week (Ramona, Compass)**

- Sell the container. Use research already done. Do not add another five hours.
- If they need more, that is week 1, paid.
- Time-box the call. Guide, not fixer. Proposal = this container, not a master plan.

**Not this week**

- Homepage price change
- Killing the named Jam / Audit on the site
- Email-campaign waitlist (blocked on §4 migration)

**After one paid sprint that kept the unpaid cap**

- Decide: public entry stays $1,500 Jam (zero prep) or becomes intro → $3,500 sprint
- Then, and only then, site + brand-language update
