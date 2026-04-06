# Ancrage — Product Requirements Document

Version 1.0 · Author: Anjan · April 2026 · Status: Draft

---

## 1. Overview

**Ancrage** is a lightweight daily focus system for people who are driven, curious, and juggling multiple self-improvement goals — but who consistently drift away from tasks before finishing them. It gives structure to the day without feeling like another productivity burden.

> Named after the French word for "anchoring" — the practice of returning to what matters before curiosity pulls you elsewhere.

---

## 2. The Problem

- **Task drift:** User starts a task, notices something interesting, follows it, and never returns to the original task.
- **Lost curiosity:** Interesting ideas surface during focused work but get forgotten because there is nowhere to put them.
- **No finish line:** Without a clear daily structure, the day ends with a lot of activity but nothing completed.
- **Motivation decay:** No visible progress means no sense of momentum, making it easy to quit streaks.

---

## 3. Who It's For

- **Primary user:** A self-directed learner managing parallel goals — language learning, skill development, work, and life admin — with limited structured time each day.
- **Secondary users:** Students learning a language, developers building skills outside work hours, anyone juggling multiple self-improvement goals with a curiosity-driven mind.

---

## 4. Goals

- User completes their defined daily blocks before drifting to curiosity.
- User captures drift thoughts instantly without losing focus on the current task.
- User builds a visible daily streak that makes consistency feel worth protecting.
- App feels calm and frictionless — opens fast, works offline, never overwhelms.

---

## 5. Features — V1 Scope

### 5.1 Welcome Screen (Onboarding)
Shown once on first visit. Explains what Ancrage is, the problem it solves, and how to use it in 3 simple steps. Friendly, warm tone. "Got it" button dismisses permanently and never shows again.


### 5.2 Daily Checklist
Morning time blocks displayed as tappable checklist items. 
Users can add, edit, rename, and delete blocks including 
the time and label. Default blocks pre-filled on first 
launch as an example. Progress bar at top shows completion. 
Automatically resets at midnight every day. Block 
definitions persist in localStorage permanently until 
the user changes them.

### 5.3 Parking Lot
Add drift thoughts instantly by typing and selecting a category (French / Dev / Other). Items persist across sessions until manually marked done and removed. No limit on items. Timestamps shown on each item.

### 5.4 The 5 Rules
Always-visible reference card. The system rules in plain language. Read-only — no interaction needed. A reminder of the contract the user made with themselves.

The 5 rules are:
1. Homework before curiosity — always. Submit first, explore after.
2. When you drift, park it — don't follow it. 5 seconds to write it down, then return.
3. One task per block. French time is not dev time. Dev time is not French time.
4. The transition breath is not optional. It is what separates finishing from drifting.
5. Ship something small every day in dev — even one line of real code counts. Curiosity without output is just entertainment.

### 5.5 Streak Tracker
Weekly dot view showing days completed. Displays current streak count, total days done, and weekly completion percentage. Data stored in localStorage. User manually marks each day done.

### 5.6 localStorage Data Layer
All user data — checklist state, parking lot items, streak history, onboarding flag — saved to localStorage. No backend, no login, no account required. Works fully offline.

---

## 6. Scope

### In V1
- Daily checklist with progress bar
- Parking lot with categories and timestamps
- The 5 rules reference card
- Streak tracker with weekly view
- First-visit onboarding screen
- localStorage persistence
- Mobile-first responsive design
- Single HTML file deployment

### Out of V1
- User accounts
- Cloud sync
- Push notifications
- Animations and transitions
- Themes or dark mode toggle
- Social or sharing features
- Analytics or tracking

### V2 and Beyond
- Custom editable time blocks
- French flashcard integration
- Focus word of the day
- React rebuild
- React Native mobile app
- Cloud sync with account

---

## 7. Success Metrics

| Metric | Target |
|---|---|
| First streak | 7 consecutive days |
| Time to park a drift thought | Under 3 seconds |
| V1 codebase size | Single HTML file |
| Build time | 5 × 30-minute dev blocks |

---

## 8. Stack and Deployment

- **Stack:** Single HTML file — vanilla JavaScript and CSS. No frameworks, no build tools, no dependencies.
- **Deploy:** GitHub Pages. Same workflow as the flashcard app and timesheet app.
- **Estimated build time:** 5 focused dev blocks of 30 minutes each across the morning routine.

---

## 9. Open Questions

- [x] Checklist blocks: **Editable.** Users define their 
own blocks — name, time, category. Default blocks 
pre-filled on first launch so the app works immediately 
out of the box.
- [x] Accent color: **Teal** (#1D9E75). Calm, focused, purposeful.
- [x] Parking lot timestamps: **Yes.** Shows time elapsed 
since parking.
---


## 10. Next Steps

1. ✅ PRD written and committed to `/docs/PRD.md`
2. ⬜ Answer open questions in section 9
3. ⬜ Wireframes — every screen and state mapped out (`/docs/wireframes.md`)
4. ⬜ Technical spec — file structure, data model, component list (`/docs/technical-spec.md`)
5. ⬜ Build V1 (`index.html`)
6. ⬜ Deploy to GitHub Pages



Version 2.0 · Author: Anjan ·

Features — V1 Scope
    - [ ] Custom parking lot categories — 
      user can create, name, and delete 
      their own categories beyond the defaults