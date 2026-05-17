# Collective 85 — Front-page Refresh Design

**Spec date**: 2026-05-17
**Author**: Xue + Claude (W1, brainstorming session)
**Status**: Approved — ready for implementation planning
**Repository**: `C:\Users\xueg1\Excella Dropbox\Xue Gong\...Biz\.All Websites\collective85`
**Deploy**: GitHub Pages → `collective85.com` (auto-deploys on push to `main`)

---

## 1. Context & Scope

Collective 85 received 21 new professional photographs of the building (exteriors, foyer, kitchen, salon-suite interiors, powder room, laundry) on 2026-05-13. The existing homepage uses 18 older photos taken on a phone, archived to `images/old/` once the pros arrived.

Two suite tenants signed leases since the last site update (Suites 102, 104, 109), reducing available units from 6 to 3. World in a Dish's role at Suite 110 expanded from "Community Kitchen" to also include event-venue use cases.

### In scope (this spec)
- Replace all old photo references on the homepage with the new pros
- Rename the 21 new image files from photographer-template names to semantic short names
- Add a new featured-photo strip below the hero, with rotating featured photo, click-to-swap, and lightbox
- Update the floor plan SVG to mark Suites 102 / 104 / 109 as rented with tenant names
- Update World in a Dish's descriptor on the floor plan SVG from "Community Kitchen" to "Community Kitchen & Event Venue"
- Replace the About section's background image with a kitchen photo

### Explicitly out of scope
- Hero copy changes (current "Nourish. Transform. Shine." stays)
- About section copy (Our Story prose stays — only the bg image changes)
- Meta tags / `og:description` / JSON-LD updates for the WD descriptor (Xue's call: floor plan SVG only)
- Service descriptor lines under tenant business names (business name only, no taglines)
- Section heading for the new strip (no heading — strip is a visual extension of the hero)
- Changes to the existing lower "Inside Collective 85" gallery layout (only its photo references swap)
- Mobile-app or framework migration — site stays vanilla HTML / CSS / JS / GitHub Pages

---

## 2. Goals

A visitor landing on `collective85.com` should:
1. See the existing "Nourish. Transform. Shine." hero immediately (unchanged copy + structure)
2. Notice a rotating featured photo in the hero's right-side slot (5 photos cycling every ~5 seconds)
3. See a strip of 5 thumbnails immediately below the hero buttons, the currently-featured one underlined
4. Be able to click any thumbnail to swap the featured photo, or click the featured photo to open a full-size lightbox
5. Find an accurate floor plan with 3 fewer "Available" units and World in a Dish labeled as "Community Kitchen & Event Venue"
6. See visually consistent professional photography across the entire homepage (hero, about, lower gallery)

---

## 3. Photo Asset Refresh

### 3.1 Strategy

**Full replace.** Every photo reference in the homepage moves from old-set filenames to new-set filenames. The 18 old photos remain physically present in `images/old/` as an archival backup, but no live HTML or CSS references them. The 21 new pros become the only photos served by the live site.

### 3.2 File rename map

The new files arrive with photographer-template names like `13027 NE 85th Street - Web Quality - 001 - 01 Exterior Front.jpg`. These get renamed to semantic short names before any HTML edits:

| Source filename | Renamed to | Subject |
|---|---|---|
| `13027 NE 85th Street - Web Quality - 001 - 01 Exterior Front.jpg` | `exterior-front-1.jpg` | Front exterior, primary curb-appeal |
| `… - 002 - 02 Exterior Front.jpg` | `exterior-front-2.jpg` | Front exterior |
| `… - 003 - 03 Exterior Front.jpg` | `exterior-front-3.jpg` | Front exterior |
| `… - 004 - 04 Exterior Front.jpg` | `exterior-front-4.jpg` | Front exterior |
| `… - 005 - 05 Exterior Front.jpg` | `exterior-front-5.jpg` | Front exterior |
| `… - 006 - 06 Exterior Front.jpg` | `exterior-front-6.jpg` | Front exterior |
| `… - 007 - 07 Exterior Front.jpg` | `exterior-front-7.jpg` | Front exterior |
| `… - 008 - 08 Foyer.jpg` | `foyer.jpg` | Entry foyer |
| `… - 009 - 09 Kitchen.jpg` | `kitchen-1.jpg` | World in a Dish kitchen |
| `… - 010 - 10 Kitchen.jpg` | `kitchen-2.jpg` | World in a Dish kitchen |
| `… - 018 - 18 Powder Room.jpg` | `powder-room-1.jpg` | Shared restroom |
| `… - 019 - 19 Powder Room.jpg` | `powder-room-2.jpg` | Shared restroom |
| `… - 020 - 20 Primary Bedroom.jpg` | `suite-1.jpg` | Salon suite interior |
| `… - 021 - 21 Primary Bedroom.jpg` | `suite-2.jpg` | Salon suite interior |
| `… - 022 - 22 Primary Bedroom.jpg` | `suite-3.jpg` | Salon suite interior |
| `… - 023 - 23 Laundry Room.jpg` | `laundry-room.jpg` | Shared laundry |
| `… - 024 - 24 Exterior Rear.jpg` | `exterior-rear-1.jpg` | Rear exterior, parking |
| `… - 025 - 25 Exterior Rear.jpg` | `exterior-rear-2.jpg` | Rear exterior |
| `… - 026 - 26 Exterior Rear.jpg` | `exterior-rear-3.jpg` | Rear exterior |
| `… - 027 - 27 Exterior Rear.jpg` | `exterior-rear-4.jpg` | Rear exterior |
| `… - 028 - 28 Exterior Rear.jpg` | `exterior-rear-5.jpg` | Rear exterior |

(Note: the "Primary Bedroom" labels come from the photographer's residential-real-estate template. These are actually salon suite interiors. Numbering 011–017 was not delivered.)

**Files are renamed by `git mv` (preserves history) prior to any HTML edits.** Originals stay in `images/old/` (untracked → committed to git as part of this work).

### 3.3 Placement plan

Once renamed, the 21 photos map to placements as follows:

| Placement | Photo(s) | Reasoning |
|---|---|---|
| Hero right-side image slot (`.hero-image`) — rotates between 5 photos | `exterior-front-1.jpg`, `exterior-rear-1.jpg`, `foyer.jpg`, `kitchen-1.jpg`, `suite-1.jpg` | One of each category — gives variety in the rotation. (The `.hero` section itself keeps its existing cream gradient — no photo bg on the section.) |
| New hero-adjacent strip thumbnails (5 slots) | Same 5 as above | Thumbnails mirror the rotation set and are its controls |
| About section background (`.about-image` div) | `kitchen-1.jpg` | Per Xue 2026-05-17: kitchen photo replaces current `hero-entry.jpg` ref. (Same photo used in both hero rotation AND about bg — visitors may see it twice; acceptable for content coverage.) |
| Lower "Inside Collective 85" gallery (existing section, 9 slots in current grid) | `exterior-front-2.jpg`, `exterior-front-3.jpg`, `exterior-rear-2.jpg`, `exterior-rear-3.jpg`, `suite-2.jpg`, `suite-3.jpg`, `powder-room-1.jpg`, `kitchen-2.jpg`, `laundry-room.jpg` | Different photos from the featured strip — no duplication |
| Archived (not referenced) | `exterior-front-4..7.jpg`, `exterior-rear-4..5.jpg`, `powder-room-2.jpg` | 7 unused photos kept available for future swap-ins |

If Xue wants a specific photo swapped to a different slot post-launch, the change is a one-line HTML/CSS edit. Nothing about the layout depends on a specific photo in a specific slot.

---

## 4. Hero + Featured Strip + Lightbox

### 4.1 Section layout

The existing hero structure stays intact: two-column inner flexbox with text+CTAs on the left, image accent area on the right, "10 Individual Suites Under One Roof" stat block included. **No section heading is added** for the new strip — it lives as a visual extension of the hero, immediately below the buttons.

```
┌────────────────────────────────────────────────────────────────┐
│  NAV BAR                                                       │
├────────────────────────────────────────────────────────────────┤
│  HERO                                                          │
│  ┌────────────────────────┐  ┌──────────────────────────────┐  │
│  │ SALON SUITES &         │  │                              │  │
│  │ WELLNESS IN KIRKLAND   │  │   [FEATURED PHOTO ROTATES]   │  │
│  │                        │  │       (currently #1)         │  │
│  │ Nourish.               │  │                              │  │
│  │ Transform.             │  │  ← click to open lightbox    │  │
│  │ Shine.                 │  │                              │  │
│  │                        │  │                              │  │
│  │ Description...         │  └──────────────────────────────┘  │
│  │                        │  [10 SUITES STAT BLOCK — stays]    │
│  │ [Book Tour] [Services] │                                    │
│  └────────────────────────┘                                    │
│                                                                │
│  ┌─────┬─────┬─────┬─────┬─────┐  ← new thumbnail strip       │
│  │thumb│thumb│thumb│thumb│thumb│     (active one underlined)   │
│  │  1  │  2  │  3  │  4  │  5  │                               │
│  └─────┴─────┴─────┴─────┴─────┘                               │
└────────────────────────────────────────────────────────────────┘
   ↓
[ABOUT section — Our Story, Wellness is a Full-Circle Experience]
```

### 4.2 Auto-rotate behavior

- The featured photo rotates every **5 seconds**, advancing one position in the strip
- Rotation **pauses on hover** anywhere within the hero or strip section. Resumes on mouse-leave.
- Rotation **pauses for 30 seconds after a manual thumbnail click**, then resumes the cycle from the clicked position.
- Rotation is implemented with `setInterval` in a small standalone JS file (`js/hero-strip.js`). No external libraries.

### 4.3 Click-to-swap interaction

- Each thumbnail is a clickable `<button>` (accessibility — not a `<div>`).
- Click handler: swap the featured photo's `src`, update the `aria-label` on the hero image, move the active-underline indicator to the clicked thumb, reset the 30-second auto-rotate-pause timer.
- The active thumbnail gets a 2px solid `#D4850E` (Collective 85's existing orange accent) bottom border. Inactive thumbs are 50% opacity until hover, then 100%.

### 4.4 Lightbox modal

- Click the featured hero photo → modal overlay opens covering the viewport at ~92% opacity dark background.
- Inside: the photo at max width 90vw / max height 90vh, with a 20px black border-radius.
- Arrow buttons on the left/right edges (touch-friendly hit targets ≥44px). Arrow keys also navigate.
- Close button (X) in top-right corner. ESC also closes.
- Click on the dark backdrop (outside the photo) also closes.
- While lightbox is open, the body has `overflow: hidden` (no page scroll). Restored on close.
- Auto-rotate pauses while lightbox is open.

### 4.5 Mobile responsive

- On screens ≤768px width, the hero stacks (image-area on top, text below) per existing CSS pattern. The strip stays a horizontal row beneath the hero.
- The strip becomes horizontally scrollable on narrow screens (≤640px) — 5 thumbnails of ~80×60px each won't fit in a row, so they scroll. Scroll snap-points keep each thumbnail centered.
- Lightbox arrows convert to touch-swipe on mobile (using a basic `touchstart`/`touchend` delta check; no swipe library).

---

## 5. Floor Plan Updates

### 5.1 Suite availability changes

Three SVG units transition from `class="fp-room-available"` to `class="fp-room-rented"`. The "Available / INQUIRE FOR DETAILS / 115 SF" text block is replaced by tenant business name (business name only — no service descriptor line, per Xue 2026-05-17). The "SF" room-size label stays.

| Suite | Current state | New state | New label content |
|---|---|---|---|
| Suite 102 | `fp-room-available` + "Available / INQUIRE FOR DETAILS / 112.5 SF" | `fp-room-rented` + business name | **Bare Face** (+ "112.5 SF" stays) |
| Suite 104 | `fp-room-available` + "Available / INQUIRE FOR DETAILS / 115 SF" | `fp-room-rented` + business name | **Glo with Ally** (+ "115 SF" stays) |
| Suite 109 | `fp-room-available` + "Available / INQUIRE FOR DETAILS / 115 SF" | `fp-room-rented` + business name | **Skin by Maryann** (+ "115 SF" stays) |

After the update, only **Suite 105 and Suite 106** remain marked Available. The legend at the bottom of the SVG (Occupied / Available / Plumbing / Laundry / Restrooms) does not change.

### 5.2 World in a Dish descriptor change

Suite 110 currently displays:
- "SUITE 110" (label)
- "**World in a Dish**" (24px business name)
- "*Community Kitchen*" (15px italic descriptor)
- 670 SF + emoji decoration

The italic descriptor line changes from "*Community Kitchen*" to "*Community Kitchen & Event Venue*". All other text and styling on Suite 110 stays identical.

Per Xue 2026-05-17: this change applies **only to the floor plan SVG**. The hero copy (line 1086: "community kitchen with cooking classes by World in a Dish"), the about section copy (line 1110: "community kitchen offering cooking classes and nutrition workshops"), and the meta tags / JSON-LD (lines 6-7, 15, 24, 39, 64) are **not** updated. They remain accurate as written.

---

## 6. About Section Background

The "Our Story / Wellness is a Full-Circle Experience" section has a CSS-background image on `.about-image` (line 538): `background: url('images/hero-entry.jpg')...`. This changes to:

```css
background: url('images/kitchen-1.jpg') center/cover no-repeat;
```

All other CSS on `.about-image` (width, aspect-ratio, border-radius) stays.

---

## 7. Implementation Order

Five sequential commits, in this order:

1. **Asset rename + archive** — `git mv` the 21 new files from their long photographer-template names to semantic short names (per §3.2). Confirm the 18 originals are in `images/old/`. Commit as `feat: rename new pro photos to semantic names + archive old photos`.

2. **Update HTML/CSS references** — sweep `index.html` for old image references (`images/hero-hallway.jpg`, `images/front-forward.jpg`, etc.) and replace with new semantic names per the placement plan (§3.3). Update the lower gallery's 9 `<img src>` references, the hero CSS bg, and the about CSS bg. Commit as `feat: update homepage image references to new pro photos`.

3. **Build hero-adjacent strip** — add new HTML markup below the hero (still inside `<section class="hero">`), new CSS rules for the strip layout + thumbnails + active indicator + mobile scroll, and a new `js/hero-strip.js` for the rotation + swap + lightbox logic. Commit as `feat: add hero-adjacent rotating featured strip + lightbox`.

4. **Floor plan update** — edit the inline SVG block: 3 unit color/text changes (Suites 102, 104, 109) + 1 descriptor text change (Suite 110 WD). Commit as `feat: floor plan — Suites 102/104/109 rented + WD adds event venue descriptor`.

5. **Push to main** — single `git push origin main`. GitHub Pages picks it up within ~2 minutes.

Each commit is independently revertable: rollback strategy is `git revert <commit>` for whichever step breaks.

---

## 8. Acceptance Criteria

A reviewer testing the implementation on `collective85.com` should confirm:

- [ ] All 21 new pro photos load (no broken images, no console errors)
- [ ] No reference to old filenames anywhere in `index.html`
- [ ] About section background is now `kitchen-1.jpg`
- [ ] Hero `.hero-image` slot rotates through the 5 featured photos starting with `exterior-front-1.jpg`
- [ ] `.hero` section's cream gradient backdrop is unchanged
- [ ] New strip appears immediately below the hero buttons, no section heading above it
- [ ] Strip has 5 thumbnails, each ~80×60px desktop / horizontally-scrollable on mobile ≤640px
- [ ] Featured photo rotates every 5 seconds when idle
- [ ] Hovering anywhere in the hero or strip pauses rotation
- [ ] Clicking a thumbnail swaps the featured photo + moves the underline indicator + pauses rotation for 30 seconds
- [ ] Clicking the featured photo opens a lightbox modal
- [ ] Lightbox arrows + arrow keys + ESC + backdrop-click all work as documented
- [ ] Lightbox arrows convert to swipe gestures on touchscreen
- [ ] Floor plan: Suites 102 / 104 / 109 show in green (rented) with business names — Bare Face, Glo with Ally, Skin by Maryann respectively
- [ ] Floor plan: Suite 110 italic descriptor now reads "Community Kitchen & Event Venue"
- [ ] Floor plan: Suites 105 and 106 remain the only Available units
- [ ] Lower "Inside Collective 85" gallery uses 9 new pro photos (different from the 5 in the hero strip)
- [ ] `images/old/` exists and contains all 18 originals (committed)
- [ ] `.gitignore` includes `.superpowers/`
- [ ] No JS console errors on page load or interaction
- [ ] No visible layout breakage at viewports: 1440px, 1024px, 768px, 414px, 375px

---

## 9. Open Questions

None at spec time. All decisions confirmed by Xue during the 2026-05-17 brainstorming session.

If during implementation a new question surfaces (e.g., specific photo doesn't fit a slot well, JS interaction edge case), surface it back to Xue before deciding — don't silently substitute.

---

## 10. Handoff to Implementation

This spec is the source of truth for the next step. After Xue approves the written spec:
- Invoke the `writing-plans` skill with this spec as input
- The plan output should produce a step-by-step implementation checklist that an implementer can execute one task at a time
- Implementation can be by Xue manually, by a Claude Code session in this repo, or by a subagent dispatch

---

**End of spec.**
