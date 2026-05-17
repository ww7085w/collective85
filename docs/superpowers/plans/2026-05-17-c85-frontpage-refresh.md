# Collective 85 Front-page Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the Collective 85 homepage with new professional photography, add a rotating featured strip with lightbox below the hero, and update the floor plan to reflect new tenants and World in a Dish's expanded role.

**Architecture:** Static-site (vanilla HTML/CSS/JS, GitHub Pages). All changes land in `index.html`, one new file `js/hero-strip.js`, and asset renames in `images/`. No build step, no test framework — verification is browser-based.

**Tech Stack:** HTML5, vanilla CSS (no preprocessor), vanilla JS (no framework), GitHub Pages deploy on push to `main`.

**Spec source:** `docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `images/13027 NE 85th Street - Web Quality - 001..028.jpg` | Rename via `git mv` | 21 new pro photos get semantic short names |
| `images/old/*` | Verify exists (no change) | 18 original phone photos archived |
| `index.html` | Modify | CSS image refs + new strip markup + new CSS rules + 4 floor plan SVG edits + change `.hero-image` from `div` to `img` |
| `js/hero-strip.js` | Create | Rotation + click-to-swap + lightbox logic |

Total: 22 file moves + 1 file creation + 1 file modified.

---

## Task 1: Pre-flight verification

**Files:**
- Read: `images/`, `images/old/`

- [ ] **Step 1: Confirm working directory and branch**

```bash
cd "/c/Users/xueg1/Excella Dropbox/Xue Gong/...Biz/.All Websites/collective85"
git status
git rev-parse --abbrev-ref HEAD
```

Expected: branch is `main`, working tree shows only the 21 untracked photos in `images/` + 18 deleted (moved to `images/old/`) + `images/old/` untracked.

- [ ] **Step 2: Confirm all 21 new photos are present at the expected names**

```bash
ls "images/" | grep "Web Quality" | wc -l
```

Expected: `21`

- [ ] **Step 3: Confirm all 18 originals are preserved in images/old/**

```bash
ls "images/old/" | wc -l
```

Expected: `18`

- [ ] **Step 4: Confirm .gitignore exists with `.superpowers/`**

```bash
cat .gitignore
```

Expected: contains `.superpowers/`. (Should already exist from spec commit.)

No commit at this task — verification only.

---

## Task 2: Rename 21 photo files to semantic names

**Files:**
- Rename: 21 files in `images/` via `git mv`

- [ ] **Step 1: Stage all current deletions and the `images/old/` archive**

```bash
git add -u images/                              # stages the 18 deletions
git add images/old/                              # stages the archive folder
```

Verify with `git status`:
- 18 deletions staged (old image paths)
- All `images/old/*` files staged as new

- [ ] **Step 2: Rename the 21 new files via `git mv`**

Run each command. If `git mv` complains the source isn't tracked, use `git add` first then `git mv`. The new pros are untracked, so use plain `mv` (POSIX) then `git add`:

```bash
cd "images"
mv "13027 NE 85th Street - Web Quality - 001 - 01 Exterior Front.jpg" exterior-front-1.jpg
mv "13027 NE 85th Street - Web Quality - 002 - 02 Exterior Front.jpg" exterior-front-2.jpg
mv "13027 NE 85th Street - Web Quality - 003 - 03 Exterior Front.jpg" exterior-front-3.jpg
mv "13027 NE 85th Street - Web Quality - 004 - 04 Exterior Front.jpg" exterior-front-4.jpg
mv "13027 NE 85th Street - Web Quality - 005 - 05 Exterior Front.jpg" exterior-front-5.jpg
mv "13027 NE 85th Street - Web Quality - 006 - 06 Exterior Front.jpg" exterior-front-6.jpg
mv "13027 NE 85th Street - Web Quality - 007 - 07 Exterior Front.jpg" exterior-front-7.jpg
mv "13027 NE 85th Street - Web Quality - 008 - 08 Foyer.jpg" foyer.jpg
mv "13027 NE 85th Street - Web Quality - 009 - 09 Kitchen.jpg" kitchen-1.jpg
mv "13027 NE 85th Street - Web Quality - 010 - 10 Kitchen.jpg" kitchen-2.jpg
mv "13027 NE 85th Street - Web Quality - 018 - 18 Powder Room.jpg" powder-room-1.jpg
mv "13027 NE 85th Street - Web Quality - 019 - 19 Powder Room.jpg" powder-room-2.jpg
mv "13027 NE 85th Street - Web Quality - 020 - 20 Primary Bedroom.jpg" suite-1.jpg
mv "13027 NE 85th Street - Web Quality - 021 - 21 Primary Bedroom.jpg" suite-2.jpg
mv "13027 NE 85th Street - Web Quality - 022 - 22 Primary Bedroom.jpg" suite-3.jpg
mv "13027 NE 85th Street - Web Quality - 023 - 23 Laundry Room.jpg" laundry-room.jpg
mv "13027 NE 85th Street - Web Quality - 024 - 24 Exterior Rear.jpg" exterior-rear-1.jpg
mv "13027 NE 85th Street - Web Quality - 025 - 25 Exterior Rear.jpg" exterior-rear-2.jpg
mv "13027 NE 85th Street - Web Quality - 026 - 26 Exterior Rear.jpg" exterior-rear-3.jpg
mv "13027 NE 85th Street - Web Quality - 027 - 27 Exterior Rear.jpg" exterior-rear-4.jpg
mv "13027 NE 85th Street - Web Quality - 028 - 28 Exterior Rear.jpg" exterior-rear-5.jpg
cd ..
```

- [ ] **Step 3: Verify the renames**

```bash
ls images/*.jpg | sort
```

Expected: 21 files matching this list exactly:
```
images/exterior-front-1.jpg
images/exterior-front-2.jpg
images/exterior-front-3.jpg
images/exterior-front-4.jpg
images/exterior-front-5.jpg
images/exterior-front-6.jpg
images/exterior-front-7.jpg
images/exterior-rear-1.jpg
images/exterior-rear-2.jpg
images/exterior-rear-3.jpg
images/exterior-rear-4.jpg
images/exterior-rear-5.jpg
images/foyer.jpg
images/kitchen-1.jpg
images/kitchen-2.jpg
images/laundry-room.jpg
images/powder-room-1.jpg
images/powder-room-2.jpg
images/suite-1.jpg
images/suite-2.jpg
images/suite-3.jpg
```

- [ ] **Step 4: Stage and commit**

```bash
git add images/
git status   # confirm: 21 new files added, 18 deleted, images/old/* added
git commit -m "feat: rename new pro photos to semantic names + archive old phone photos

21 new professional photos shot 2026-05-13 land in images/ at semantic
names (exterior-front-1.jpg, foyer.jpg, kitchen-1.jpg, etc.). Old 18
phone photos move to images/old/ as an archival backup; no live HTML or
CSS references them after subsequent commits.

Spec: docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md §3"
```

- [ ] **Step 5: Verify commit clean**

```bash
git log -1 --stat
```

Expected: ~39 files changed (21 new, 18 archived). No further uncommitted changes.

---

## Task 3: Update CSS background image references

**Files:**
- Modify: `index.html:372` (`.hero-image` CSS) and `index.html:538` (`.about-image` CSS)

- [ ] **Step 1: Locate the two CSS background rules**

```bash
grep -n "images/hero" index.html
```

Expected output (verify line numbers haven't drifted):
```
372:    background: url('images/hero-hallway.jpg') center/cover no-repeat;
538:    background: url('images/hero-entry.jpg') center/cover no-repeat;
```

- [ ] **Step 2: Note that line 372 will be replaced entirely in Task 4 (changing `.hero-image` from `div`+CSS-bg to `<img>`)**

Skip line 372 for now — Task 4 handles it. Only update line 538 in this task.

- [ ] **Step 3: Edit line 538 — change `.about-image` background**

Change:
```css
    background: url('images/hero-entry.jpg') center/cover no-repeat;
```
To:
```css
    background: url('images/kitchen-1.jpg') center/cover no-repeat;
```

- [ ] **Step 4: Verify the change**

```bash
grep -n "kitchen-1.jpg" index.html
```

Expected: 1 match at line 538.

```bash
grep -n "hero-entry.jpg" index.html
```

Expected: 0 matches. (No other references to the old name should remain.)

- [ ] **Step 5: Do not commit yet — bundle with Task 4 + Task 5 image ref updates into a single "update image references" commit**

---

## Task 4: Change `.hero-image` from `div` to `<img>` + update CSS

**Files:**
- Modify: `index.html:368-375` (CSS for `.hero-image`)
- Modify: `index.html:1093` (HTML for `.hero-image`)

- [ ] **Step 1: Read current `.hero-image` CSS rule**

```bash
sed -n '368,375p' index.html
```

Expected (or similar — line numbers may drift):
```css
  .hero-image {
    width: 100%;
    aspect-ratio: 4/5;
    border-radius: 24px;
    background: url('images/hero-hallway.jpg') center/cover no-repeat;
    /* … other properties */
  }
```

- [ ] **Step 2: Replace the `.hero-image` CSS rule**

Find the existing `.hero-image { ... }` block (around line 368). Replace the `background:` line and add `object-fit: cover; cursor: pointer;`. The full rule should read:

```css
  .hero-image {
    width: 100%;
    aspect-ratio: 4/5;
    border-radius: 24px;
    object-fit: cover;
    cursor: pointer;
    display: block;
  }
```

If there are other properties currently in the rule (box-shadow, etc.), preserve them. Only remove the `background:` declaration and add `object-fit`, `cursor`, `display`.

- [ ] **Step 3: Read current `.hero-image` HTML at line 1093**

```bash
sed -n '1092,1099p' index.html
```

Expected:
```html
    <div class="hero-image-wrapper">
      <div class="hero-image"></div>
      <div class="hero-image-accent"></div>
      <div class="hero-image-accent-2">
        <div class="accent-stat">10</div>
        <div class="accent-label">Individual Suites Under One Roof</div>
      </div>
    </div>
```

- [ ] **Step 4: Change the `<div class="hero-image"></div>` to an `<img>` tag**

Replace line 1093 from:
```html
      <div class="hero-image"></div>
```
To:
```html
      <img id="hero-featured-img" class="hero-image" src="images/exterior-front-1.jpg" alt="Featured view of Collective 85" loading="eager">
```

Note: `loading="eager"` because it's above-the-fold; we want it to load immediately, not lazy.

- [ ] **Step 5: Verify both edits**

```bash
grep -n "hero-featured-img" index.html
```

Expected: 1 match (the new `<img>` tag).

```bash
grep -n "hero-hallway.jpg" index.html
```

Expected: 0 matches (the old CSS bg reference is gone).

- [ ] **Step 6: Do not commit yet — bundle with Task 3 + Task 5**

---

## Task 5: Update the 9 lower-gallery image references

**Files:**
- Modify: `index.html:1378, 1381, 1384, 1387, 1390, 1393, 1396, 1399, 1402`

- [ ] **Step 1: Confirm current lower gallery refs**

```bash
grep -n 'gallery-item' index.html | head -12
grep -n 'images/.*\.jpg' index.html
```

Expected: 11 `images/*.jpg` references total — 1 at line 538 (already updated in Task 3), 1 at line 1093 (already updated in Task 4 as `src` on `<img>`), and 9 in the gallery section (1378–1402).

- [ ] **Step 2: Update each of the 9 lower-gallery `<img src>` references**

Per the placement plan (spec §3.3 — lower gallery row), replace each old `src` with the new file. Update one line at a time:

Line 1378:
```html
      <img src="images/front-forward.jpg" alt="Collective 85 building exterior with signage" loading="lazy">
```
→
```html
      <img src="images/exterior-front-2.jpg" alt="Collective 85 building exterior with signage" loading="lazy">
```

Line 1381:
```html
      <img src="images/unit-104-106.jpg" alt="Available private salon suite with window and AC" loading="lazy">
```
→
```html
      <img src="images/suite-2.jpg" alt="Private salon suite interior" loading="lazy">
```

Line 1384:
```html
      <img src="images/unit-102.jpg" alt="Private suite with window and individual climate control" loading="lazy">
```
→
```html
      <img src="images/suite-3.jpg" alt="Private salon suite with natural light" loading="lazy">
```

Line 1387:
```html
      <img src="images/restroom-2.jpg" alt="Modern restroom facilities" loading="lazy">
```
→
```html
      <img src="images/powder-room-1.jpg" alt="Modern shared restroom facilities" loading="lazy">
```

Line 1390:
```html
      <img src="images/restroom-1.jpg" alt="Clean restroom with full amenities" loading="lazy">
```
→
```html
      <img src="images/kitchen-2.jpg" alt="Community kitchen workspace" loading="lazy">
```

Line 1393:
```html
      <img src="images/laundry-room.jpg" alt="Shared laundry room with washer and dryer" loading="lazy">
```
→
```html
      <img src="images/laundry-room.jpg" alt="Shared laundry room with washer and dryer" loading="lazy">
```

(Line 1393 keeps the same `src` — `laundry-room.jpg` exists in both old and new sets. No-op edit, but verify.)

Line 1396:
```html
      <img src="images/front-parking.jpg" alt="Front parking and street view on NE 85th St" loading="lazy">
```
→
```html
      <img src="images/exterior-front-3.jpg" alt="Front view of Collective 85 from 85th Street" loading="lazy">
```

Line 1399:
```html
      <img src="images/front-driveway.jpg" alt="Front driveway and building entrance" loading="lazy">
```
→
```html
      <img src="images/exterior-rear-2.jpg" alt="Rear of the building" loading="lazy">
```

Line 1402:
```html
      <img src="images/back-parking-2.jpg" alt="Rear parking area with ample space for tenants and clients" loading="lazy">
```
→
```html
      <img src="images/exterior-rear-3.jpg" alt="Rear parking with ample space for tenants and clients" loading="lazy">
```

- [ ] **Step 3: Verify no old image references remain**

```bash
grep -n 'images/' index.html | grep -v 'images/old/'
```

Expected: ONLY new-set filenames appear (exterior-front-*, exterior-rear-*, foyer, kitchen-*, suite-*, powder-room-*, laundry-room). No `images/hero-hallway`, `images/hero-entry`, `images/front-forward`, `images/unit-*`, `images/restroom-*`, `images/front-parking`, `images/front-driveway`, `images/back-parking-*`.

- [ ] **Step 4: Commit Tasks 3 + 4 + 5 as one image-references update**

```bash
git add index.html
git commit -m "feat: update homepage image references to new pro photos

- .hero-image: changed from <div> with CSS bg to <img> with src=exterior-front-1.jpg
  (needed so the hero-strip.js can swap src dynamically)
- .about-image: bg changed from hero-entry.jpg to kitchen-1.jpg
- Lower 'Inside Collective 85' gallery: 9 new pro photos curated per spec §3.3
- All references to old image filenames removed from index.html

Spec: docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md §3.3"
```

- [ ] **Step 5: Local preview — verify no broken images**

Start a local server and load the page:

```bash
# In repo root:
python -m http.server 8000
# Or, if python isn't on PATH:
npx serve .
```

Open `http://localhost:8000/` in a browser. Confirm:
- Hero right-side photo loads (exterior-front-1.jpg visible)
- About section "Our Story" panel has a kitchen photo visible
- Lower "Inside Collective 85" gallery shows 9 new photos, no broken-image icons

Stop the server (Ctrl+C) when verified.

---

## Task 6: Add the hero-strip HTML markup

**Files:**
- Modify: `index.html` around line 1101 (end of `</section>` for `.hero`)

- [ ] **Step 1: Locate the closing tag of the hero `</section>`**

```bash
grep -n '</section>' index.html | head -3
```

Look for the first `</section>` after the `<section class="hero" id="hero">` opening (around line 1081). Should be around line 1101.

- [ ] **Step 2: Insert the strip markup INSIDE the hero section, just before its `</section>`**

The strip lives WITHIN the hero section (no new section, no heading — per spec §4.1). Locate the closing `</div>` of `.hero-inner` and the `</section>` of `.hero`, then insert between them:

Before:
```html
    <div class="hero-image-wrapper">
      <img id="hero-featured-img" class="hero-image" src="images/exterior-front-1.jpg" alt="Featured view of Collective 85" loading="eager">
      <div class="hero-image-accent"></div>
      <div class="hero-image-accent-2">
        <div class="accent-stat">10</div>
        <div class="accent-label">Individual Suites Under One Roof</div>
      </div>
    </div>
  </div>
</section>
```

After:
```html
    <div class="hero-image-wrapper">
      <img id="hero-featured-img" class="hero-image" src="images/exterior-front-1.jpg" alt="Featured view of Collective 85" loading="eager">
      <div class="hero-image-accent"></div>
      <div class="hero-image-accent-2">
        <div class="accent-stat">10</div>
        <div class="accent-label">Individual Suites Under One Roof</div>
      </div>
    </div>
  </div>

  <div class="hero-strip" aria-label="Featured photos">
    <button type="button" class="hero-strip-thumb active" data-index="0" aria-label="View exterior front">
      <img src="images/exterior-front-1.jpg" alt="Exterior front thumbnail" loading="lazy">
    </button>
    <button type="button" class="hero-strip-thumb" data-index="1" aria-label="View exterior rear">
      <img src="images/exterior-rear-1.jpg" alt="Exterior rear thumbnail" loading="lazy">
    </button>
    <button type="button" class="hero-strip-thumb" data-index="2" aria-label="View foyer">
      <img src="images/foyer.jpg" alt="Foyer thumbnail" loading="lazy">
    </button>
    <button type="button" class="hero-strip-thumb" data-index="3" aria-label="View kitchen">
      <img src="images/kitchen-1.jpg" alt="Kitchen thumbnail" loading="lazy">
    </button>
    <button type="button" class="hero-strip-thumb" data-index="4" aria-label="View salon suite">
      <img src="images/suite-1.jpg" alt="Salon suite thumbnail" loading="lazy">
    </button>
  </div>
</section>
```

- [ ] **Step 3: Verify the markup is syntactically clean**

```bash
grep -n 'hero-strip' index.html
```

Expected: 7 matches — 1 outer div, 5 buttons, plus aria-label.

```bash
grep -n 'data-index' index.html
```

Expected: 5 matches with `data-index="0"` through `data-index="4"`.

- [ ] **Step 4: Do not commit yet — bundle with Task 7 (CSS) + Task 8 (JS)**

---

## Task 7: Add hero-strip CSS rules

**Files:**
- Modify: `index.html` — append to the inline `<style>` block (located between `<style>` and `</style>` near the top of `<head>`)

- [ ] **Step 1: Locate the end of the `<style>` block**

```bash
grep -n '</style>' index.html
```

Find the closing `</style>` tag. Insert the new CSS rules immediately before it.

- [ ] **Step 2: Add the strip + lightbox CSS rules**

Insert before the existing `</style>`:

```css
  /* ===== HERO STRIP (rotating featured photo controls) ===== */
  .hero-strip {
    display: flex;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 40px;
    align-items: stretch;
  }
  .hero-strip-thumb {
    flex: 1 1 0;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    position: relative;
    opacity: 0.55;
    transition: opacity 0.25s ease, transform 0.25s ease;
    border-bottom: 3px solid transparent;
  }
  .hero-strip-thumb:hover { opacity: 1; transform: translateY(-2px); }
  .hero-strip-thumb.active {
    opacity: 1;
    border-bottom-color: #D4850E;
  }
  .hero-strip-thumb img {
    width: 100%;
    height: 70px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  /* ===== LIGHTBOX MODAL ===== */
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lb-fade-in 0.2s ease;
  }
  @keyframes lb-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .lightbox-img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 20px;
    object-fit: contain;
    display: block;
  }
  .lightbox-close,
  .lightbox-prev,
  .lightbox-next {
    position: absolute;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s ease;
    font-family: -apple-system, sans-serif;
    line-height: 1;
  }
  .lightbox-close:hover,
  .lightbox-prev:hover,
  .lightbox-next:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .lightbox-close {
    top: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
    font-size: 28px;
  }
  .lightbox-prev,
  .lightbox-next {
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    font-size: 36px;
  }
  .lightbox-prev { left: 24px; }
  .lightbox-next { right: 24px; }

  /* Mobile: scrollable strip */
  @media (max-width: 640px) {
    .hero-strip {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      padding: 0 20px 30px;
      gap: 8px;
    }
    .hero-strip-thumb {
      flex: 0 0 90px;
      scroll-snap-align: center;
    }
    .hero-strip-thumb img { height: 60px; }
    .lightbox-prev,
    .lightbox-next {
      width: 44px;
      height: 44px;
      font-size: 28px;
    }
  }
```

- [ ] **Step 3: Verify the rules are present**

```bash
grep -c 'hero-strip' index.html
```

Expected: ≥10 (markup + CSS rules combined).

```bash
grep -c 'lightbox-overlay' index.html
```

Expected: ≥1 (CSS rule). (More once JS is added.)

- [ ] **Step 4: Do not commit yet — bundle with Task 8 (JS)**

---

## Task 8: Create `js/hero-strip.js`

**Files:**
- Create: `js/hero-strip.js`
- Modify: `index.html` — add `<script src="js/hero-strip.js"></script>` near `</body>`

- [ ] **Step 1: Create the `js/` directory if not present**

```bash
mkdir -p js
ls js
```

Expected: empty or contains other JS files.

- [ ] **Step 2: Write `js/hero-strip.js`**

```javascript
(function () {
  // 5 featured photos cycle through .hero-image (the right-side hero photo).
  // Order matches the thumbnail strip in index.html and the spec §3.3 placement plan.
  var FEATURED = [
    'exterior-front-1.jpg',
    'exterior-rear-1.jpg',
    'foyer.jpg',
    'kitchen-1.jpg',
    'suite-1.jpg'
  ];
  var ROTATION_MS = 5000;          // auto-rotate every 5 seconds
  var PAUSE_AFTER_CLICK_MS = 30000; // 30-second pause after manual click

  var currentIndex = 0;
  var rotateTimer = null;
  var pauseUntil = 0;

  function init() {
    var featured = document.getElementById('hero-featured-img');
    var thumbs = document.querySelectorAll('.hero-strip-thumb');
    var heroSection = document.getElementById('hero');

    if (!featured || thumbs.length === 0 || !heroSection) {
      return;
    }

    function setActive(i) {
      currentIndex = i;
      featured.src = 'images/' + FEATURED[i];
      featured.alt = 'Featured view of Collective 85 (photo ' + (i + 1) + ' of ' + FEATURED.length + ')';
      for (var t = 0; t < thumbs.length; t++) {
        if (t === i) thumbs[t].classList.add('active');
        else thumbs[t].classList.remove('active');
      }
    }

    function advance() {
      if (Date.now() < pauseUntil) return;
      setActive((currentIndex + 1) % FEATURED.length);
    }

    function startRotation() {
      stopRotation();
      rotateTimer = setInterval(advance, ROTATION_MS);
    }

    function stopRotation() {
      if (rotateTimer) {
        clearInterval(rotateTimer);
        rotateTimer = null;
      }
    }

    for (var i = 0; i < thumbs.length; i++) {
      (function (idx) {
        thumbs[idx].addEventListener('click', function () {
          setActive(idx);
          pauseUntil = Date.now() + PAUSE_AFTER_CLICK_MS;
        });
      })(i);
    }

    heroSection.addEventListener('mouseenter', stopRotation);
    heroSection.addEventListener('mouseleave', startRotation);

    featured.addEventListener('click', function () {
      openLightbox(currentIndex);
    });

    setActive(0);
    startRotation();
  }

  function openLightbox(startIndex) {
    var current = startIndex;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous photo">&lsaquo;</button>' +
      '<img class="lightbox-img" src="images/' + FEATURED[current] + '" alt="">' +
      '<button type="button" class="lightbox-next" aria-label="Next photo">&rsaquo;</button>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var img = overlay.querySelector('.lightbox-img');

    function show(i) {
      current = (i + FEATURED.length) % FEATURED.length;
      img.src = 'images/' + FEATURED[current];
    }

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    }

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () {
      show(current - 1);
    });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () {
      show(current + 1);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);

    // Touch swipe (mobile)
    var touchStartX = null;
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    });
    overlay.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        show(current + (dx < 0 ? 1 : -1));
      }
      touchStartX = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

- [ ] **Step 3: Add the `<script>` tag to `index.html`**

Locate the closing `</body>` tag in `index.html`:

```bash
grep -n '</body>' index.html
```

Insert the script tag immediately before `</body>`:

```html
  <script src="js/hero-strip.js"></script>
</body>
```

If there are already other `<script>` tags near `</body>`, add `hero-strip.js` as the LAST script (so the DOM is fully present).

- [ ] **Step 4: Verify**

```bash
grep -n 'hero-strip.js' index.html
ls js/
```

Expected: `index.html` references `js/hero-strip.js` exactly once. `js/` contains `hero-strip.js`.

- [ ] **Step 5: Commit Tasks 6 + 7 + 8 together**

```bash
git add index.html js/hero-strip.js
git commit -m "feat: hero-adjacent rotating featured strip + lightbox

- New .hero-strip markup with 5 thumbnail buttons, lives inside the hero
  section (no section heading) per spec §4.1
- CSS rules for strip layout, active indicator (yellow underline), and
  lightbox modal with arrow nav
- New js/hero-strip.js: 5-second auto-rotate (pauses on hover or 30s
  after manual click), click-to-swap thumbnail, lightbox modal with
  arrow keys / ESC / backdrop click / mobile swipe support
- Active thumbnail gets bottom-border #D4850E (matches existing accent)
- Mobile (≤640px): strip becomes horizontally scrollable with snap-points

Spec: docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md §4"
```

---

## Task 9: Verify the hero strip in browser

**Files:** none modified — verification only

- [ ] **Step 1: Start a local server**

```bash
python -m http.server 8000
```

(If Python isn't on PATH: `npx serve .` from repo root.)

- [ ] **Step 2: Open `http://localhost:8000/` and verify each behavior:**

| Behavior | Expected |
|---|---|
| Page loads, no console errors | Open DevTools Console — no red errors |
| Hero right-side photo visible | `exterior-front-1.jpg` shows initially |
| Thumbnail strip visible below hero buttons | 5 thumbnails in a row, first has yellow underline |
| Wait 5 seconds without moving mouse | Featured photo swaps to #2 (`exterior-rear-1`), underline moves to thumb #2 |
| Wait another 5 seconds | Continues to #3 (`foyer`), and so on |
| Move mouse over hero | Rotation pauses (active thumb stays put) |
| Move mouse outside hero | Rotation resumes after a tick |
| Click thumbnail #4 (kitchen) | Featured photo swaps to kitchen-1, underline moves to thumb #4, rotation pauses for 30s |
| Click featured photo | Lightbox opens with current photo |
| Press right arrow in lightbox | Next photo shows |
| Press left arrow in lightbox | Previous photo shows (wraps) |
| Press ESC | Lightbox closes |
| Reopen + click backdrop (outside photo) | Lightbox closes |
| Reopen + click close button (×) | Lightbox closes |
| Resize browser to ~400px wide | Strip becomes horizontally scrollable |

- [ ] **Step 3: If any behavior fails, debug**

Common issues:
- "Hero photo doesn't swap" → DevTools Console likely shows `null is not an object` — confirm `id="hero-featured-img"` exists on the `<img>` tag in `index.html`
- "Click does nothing" → check `data-index` attributes are present on each `<button>`
- "Lightbox doesn't appear" → check CSS rule for `.lightbox-overlay` has `z-index: 9999`
- "Mobile scroll doesn't work" → check `@media (max-width: 640px)` rule is inside the `<style>` block

Fix any issues, recommit (`git commit --amend` is OK since this is still local-only).

- [ ] **Step 4: Stop the server**

Ctrl+C in the terminal running the http server.

---

## Task 10: Update Suite 102 in floor plan SVG

**Files:**
- Modify: `index.html:1253-1259` (Suite 102 SVG block)

- [ ] **Step 1: Read the current Suite 102 SVG block**

```bash
grep -n -A 6 'Unit 102' index.html
```

Expected:
```html
1253:  <!-- Unit 102 -->
1254:  <rect x="465" y="700" width="185" height="116" rx="5" class="fp-room-available"/>
1255:  <circle cx="638" cy="712" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
1256:  <text x="557" y="733" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 102</text>
1257:  <text x="557" y="755" text-anchor="middle" class="fp-available-text">Available</text>
1258:  <text x="557" y="769" text-anchor="middle" class="fp-available-sub">INQUIRE FOR DETAILS</text>
1259:  <text x="557" y="805" text-anchor="middle" class="fp-room-size">112.5 SF</text>
```

- [ ] **Step 2: Replace the block — `fp-room-available` → `fp-room-rented`, replace 2 text lines with 1 business name line**

Change line 1254 from:
```html
  <rect x="465" y="700" width="185" height="116" rx="5" class="fp-room-available"/>
```
to:
```html
  <rect x="465" y="700" width="185" height="116" rx="5" class="fp-room-rented"/>
```

Then replace lines 1257-1258 with a single business-name line:

Delete:
```html
  <text x="557" y="755" text-anchor="middle" class="fp-available-text">Available</text>
  <text x="557" y="769" text-anchor="middle" class="fp-available-sub">INQUIRE FOR DETAILS</text>
```

Insert in place:
```html
  <text x="557" y="762" text-anchor="middle" class="fp-biz-name-sm">Bare Face</text>
```

Final Suite 102 block should read:
```html
  <!-- Unit 102 -->
  <rect x="465" y="700" width="185" height="116" rx="5" class="fp-room-rented"/>
  <circle cx="638" cy="712" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
  <text x="557" y="733" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 102</text>
  <text x="557" y="762" text-anchor="middle" class="fp-biz-name-sm">Bare Face</text>
  <text x="557" y="805" text-anchor="middle" class="fp-room-size">112.5 SF</text>
```

- [ ] **Step 3: Verify**

```bash
grep -n 'Bare Face' index.html
```

Expected: 1 match.

```bash
grep -n -A 6 'Unit 102' index.html
```

Expected: rect has `fp-room-rented`, "Available" text is gone, business name "Bare Face" is present.

- [ ] **Step 4: Do not commit yet — bundle Tasks 10 + 11 + 12 + 13 as one floor-plan commit**

---

## Task 11: Update Suite 104 in floor plan SVG

**Files:**
- Modify: `index.html:1208-1214` (Suite 104 SVG block)

- [ ] **Step 1: Read current Suite 104 block**

```bash
grep -n -A 6 'Unit 104' index.html
```

Expected:
```html
1208:  <!-- Unit 104 -->
1209:  <rect x="220" y="575" width="185" height="120" rx="5" class="fp-room-available"/>
1210:  <circle cx="393" cy="587" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
1211:  <text x="312" y="610" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 104</text>
1212:  <text x="312" y="632" text-anchor="middle" class="fp-available-text">Available</text>
1213:  <text x="312" y="646" text-anchor="middle" class="fp-available-sub">INQUIRE FOR DETAILS</text>
1214:  <text x="312" y="685" text-anchor="middle" class="fp-room-size">115 SF</text>
```

- [ ] **Step 2: Edit — change class on rect, replace 2 text lines with 1**

Change line 1209 `class="fp-room-available"` → `class="fp-room-rented"`.

Delete lines 1212-1213 (the "Available" and "INQUIRE FOR DETAILS" texts).

Insert one new text line in their place:
```html
  <text x="312" y="639" text-anchor="middle" class="fp-biz-name-sm">Glo with Ally</text>
```

Final Suite 104 block:
```html
  <!-- Unit 104 -->
  <rect x="220" y="575" width="185" height="120" rx="5" class="fp-room-rented"/>
  <circle cx="393" cy="587" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
  <text x="312" y="610" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 104</text>
  <text x="312" y="639" text-anchor="middle" class="fp-biz-name-sm">Glo with Ally</text>
  <text x="312" y="685" text-anchor="middle" class="fp-room-size">115 SF</text>
```

- [ ] **Step 3: Verify**

```bash
grep -n 'Glo with Ally' index.html
```

Expected: 1 match.

```bash
grep -n -A 6 'Unit 104' index.html
```

Expected: `fp-room-rented`, no "Available" line, "Glo with Ally" present.

- [ ] **Step 4: Do not commit yet — bundle with Tasks 10 + 12 + 13**

---

## Task 12: Update Suite 109 in floor plan SVG

**Files:**
- Modify: `index.html:1228-1234` (Suite 109 SVG block)

- [ ] **Step 1: Read current Suite 109 block**

```bash
grep -n -A 6 'Unit 109' index.html
```

Expected:
```html
1228:  <!-- Unit 109 -->
1229:  <rect x="465" y="421" width="185" height="125" rx="5" class="fp-room-available"/>
1230:  <circle cx="638" cy="433" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
1231:  <text x="557" y="458" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 109</text>
1232:  <text x="557" y="480" text-anchor="middle" class="fp-available-text">Available</text>
1233:  <text x="557" y="494" text-anchor="middle" class="fp-available-sub">INQUIRE FOR DETAILS</text>
1234:  <text x="557" y="536" text-anchor="middle" class="fp-room-size">115 SF</text>
```

- [ ] **Step 2: Edit — change class on rect, replace 2 text lines with 1**

Change line 1229 `class="fp-room-available"` → `class="fp-room-rented"`.

Delete lines 1232-1233.

Insert one new text line in their place:
```html
  <text x="557" y="487" text-anchor="middle" class="fp-biz-name-sm">Skin by Maryann</text>
```

Final Suite 109 block:
```html
  <!-- Unit 109 -->
  <rect x="465" y="421" width="185" height="125" rx="5" class="fp-room-rented"/>
  <circle cx="638" cy="433" r="3.5" class="fp-plumbing-dot" opacity="0.6"/>
  <text x="557" y="458" text-anchor="middle" class="fp-unit-label" style="font-size: 15px;">SUITE 109</text>
  <text x="557" y="487" text-anchor="middle" class="fp-biz-name-sm">Skin by Maryann</text>
  <text x="557" y="536" text-anchor="middle" class="fp-room-size">115 SF</text>
```

- [ ] **Step 3: Verify**

```bash
grep -n 'Skin by Maryann' index.html
```

Expected: 1 match.

```bash
grep -n -A 6 'Unit 109' index.html
```

Expected: `fp-room-rented`, no "Available" line, "Skin by Maryann" present.

- [ ] **Step 4: Do not commit yet — bundle with Tasks 10 + 11 + 13**

---

## Task 13: Update Suite 110 WD descriptor

**Files:**
- Modify: `index.html:1265` (the Community Kitchen text line)

- [ ] **Step 1: Locate the current descriptor**

```bash
grep -n 'Community Kitchen' index.html
```

You'll see multiple matches across hero copy, meta tags, services, etc. The one we're updating is on/near line 1265, inside the floor plan SVG, with `font-style: italic` styling.

Expected:
```html
1265:  <text x="817" y="355" text-anchor="middle" style="font-size: 15px; fill: #09405e; font-style: italic;">Community Kitchen</text>
```

- [ ] **Step 2: Replace the line**

From:
```html
  <text x="817" y="355" text-anchor="middle" style="font-size: 15px; fill: #09405e; font-style: italic;">Community Kitchen</text>
```
To:
```html
  <text x="817" y="355" text-anchor="middle" style="font-size: 15px; fill: #09405e; font-style: italic;">Community Kitchen &amp; Event Venue</text>
```

(Use `&amp;` in HTML/SVG, not raw `&`.)

- [ ] **Step 3: Verify**

```bash
grep -n 'Community Kitchen &amp; Event Venue' index.html
```

Expected: 1 match (line 1265).

```bash
grep -n 'Community Kitchen' index.html | wc -l
```

Expected: Same count as before MINUS 1 + 1 (the line still matches "Community Kitchen" as a substring). The other Community Kitchen references in hero/about/meta/services stay per spec §5.2.

- [ ] **Step 4: Commit Tasks 10 + 11 + 12 + 13 together**

```bash
git add index.html
git commit -m "feat: floor plan — Suites 102/104/109 rented + WD adds event venue descriptor

- Suite 102: Available → Bare Face
- Suite 104: Available → Glo with Ally
- Suite 109: Available → Skin by Maryann
  (all transition class fp-room-available → fp-room-rented)
- Suite 110 World in a Dish descriptor:
  'Community Kitchen' → 'Community Kitchen & Event Venue'
  (floor plan SVG only — hero/about/meta intentionally unchanged per spec §5.2)
- Only Suites 105 and 106 remain marked Available

Spec: docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md §5"
```

---

## Task 14: Final verification on local server

**Files:** none modified — verification only

- [ ] **Step 1: Start local server, open in browser**

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`.

- [ ] **Step 2: Visual smoke test — go through every acceptance criterion in the spec §8**

Walk through each item in the acceptance criteria list of `docs/superpowers/specs/2026-05-17-c85-frontpage-refresh-design.md`. For each:
- If PASS, check the box mentally
- If FAIL, fix the underlying issue, recommit (small fix), then re-verify

Specific spots to check:
- Hero right-side photo rotates every 5 seconds
- Thumbnail strip below buttons, active thumb has yellow underline
- Click any thumbnail → photo swaps + 30s rotation pause
- Click featured hero photo → lightbox opens
- Lightbox arrows/ESC/backdrop close all work
- About section "Our Story" panel shows kitchen photo
- Lower "Inside Collective 85" gallery shows 9 new pros
- Floor plan: Suites 102 / 104 / 109 are green (rented) with business names — Bare Face, Glo with Ally, Skin by Maryann
- Suite 110 reads "Community Kitchen & Event Venue"
- Only Suites 105 and 106 are marked Available
- No console errors, no broken images
- Resize to 1440 / 1024 / 768 / 414 / 375 px widths — no layout breaks

- [ ] **Step 3: Stop the server**

Ctrl+C.

- [ ] **Step 4: Confirm git log shows 4 commits since the spec commit**

```bash
git log --oneline -8
```

Expected (most recent first):
- `feat: floor plan — Suites 102/104/109 rented + WD adds event venue descriptor`
- `feat: hero-adjacent rotating featured strip + lightbox`
- `feat: update homepage image references to new pro photos`
- `feat: rename new pro photos to semantic names + archive old phone photos`
- `docs(R1): self-review fix — clarify hero photo placement (no .hero bg image)`
- `docs(R1): add front-page refresh spec + .gitignore for .superpowers/`
- (older commits below)

Five new feature/docs commits in this batch (4 implementation + 2 spec). No surprises.

---

## Task 15: Push to main → GitHub Pages auto-deploys

**Files:** none — git push only

> **⚠️ This step is the production deploy.** Per Collective 85 convention (matches the WD pattern), Xue triggers the push. Do not push autonomously. Surface the readiness to Xue with the commit list and wait for explicit go-ahead.

- [ ] **Step 1: Surface readiness to Xue**

Output the commit summary:

```bash
git log --oneline origin/main..HEAD
```

Tell Xue: "Local commits ready to push. `git push origin main` will trigger GitHub Pages deploy to collective85.com — typically live in ~2-3 minutes. Approve to proceed?"

- [ ] **Step 2: After Xue's explicit go-ahead, push**

```bash
git push origin main
```

- [ ] **Step 3: Poll for deploy + final live-site smoke test**

GitHub Pages deploys main branch within ~2-3 minutes. Open `https://collective85.com/` in a browser.

Verify:
- Hero shows the new pro photo on the right side
- Thumbnail strip is visible and rotating
- Floor plan shows the 3 new tenants + WD's expanded descriptor
- About section background is a kitchen photo
- No 404s in DevTools Network tab

- [ ] **Step 4: Capture any post-deploy gaps**

If anything appears wrong on the live site that didn't appear in local preview, file a small follow-up task with the exact symptom and fix.

---

## Open Questions

None at plan time. If during execution a question surfaces (specific photo doesn't fit a slot well, JS edge case, mobile layout regression), pause and surface to Xue rather than silently substituting.

---

**End of plan.**
