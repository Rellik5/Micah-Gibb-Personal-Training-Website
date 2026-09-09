# Micah Gibb, coaching site

Five-page static site. No build step, no dependencies.

```
trainer-site/
  index.html      home, photo hero and pinned scroll
  about.html
  pricing.html
  schedule.html   three booking types, calendar embed, request form
  contact.html
  styles.css      shared, tokens at the top
  main.js         shared, nav + reveals + forms
  assets/         photos
```

## Run it locally

```bash
cd trainer-site
python3 -m http.server 8000
```

Open http://localhost:8000

## Anything in square brackets is unfinished

Placeholders are written as `[like this]` so they are impossible to miss and
easy to grep. Nothing factual about Micah was invented. Run this to see what
is still outstanding:

```bash
grep -rn '\[' *.html
```

The list right now:

- Email, phone, gym name, street address, city and training hours
- Certification, continuing education, first aid status, insurance
- Year he started coaching
- Every price, session length and check-in frequency
- The About page story, which is the one section nobody else can write
- Two FAQ answers on cancellation and commitment
- The nutrition scope answer, which depends on his qualifications

Descriptive copy is written and reads as finished. Treat it as a draft in his
voice, not as fact. Anything that makes a claim about him is bracketed.

## Palette

From the iColorPalette set, mapped in `:root` at the top of `styles.css`.

| Token | Hex | Used for |
|---|---|---|
| `--ink` | `#063937` | Body text, dark sections, hero scrim |
| `--teal` | `#185e55` | Secondary |
| `--blue` | `#068cdf` | Accent rules, step numbers, list markers |
| `--blue-deep` | `#03578b` | Links and buttons |
| `--sky` | `#8ec0e0` | Text on dark backgrounds |
| `--sand` | `#d9cec4` | Warm section bands |

`#068cdf` only reaches 3.6:1 against white, which fails the accessibility
minimum for body text. So it is used for decoration and large bold numbers,
where 3:1 is the bar, and `--blue-deep` at 7.7:1 carries anything that is
actually text. If you swap the accent, keep that split.

The warm band redefines `--line` and `--muted` inside its own scope, so
borders and secondary text on sand pick up warmer tones without extra rules.

## Photos

| File | Source | Slot |
|---|---|---|
| `hero.jpg` | deadlift pull | Home hero |
| `story.jpg` | deadlift lockout | Pinned scroll section |
| `coach.jpg` | portrait in cap | About |
| `gallery-1.jpg` | squat rack | Gallery |
| `gallery-2.jpg` | pitching | Gallery |
| `gallery-3.jpg` | fly fishing | Gallery |

All cropped to their slot's aspect ratio around a focal point, then compressed
to under 300KB each. The pitching shot in the purple jersey went unused.

To swap one, drop a replacement in with the same filename. If the crop looks
wrong, adjust `object-position` on that image in `styles.css` rather than
re-cropping the file.

Update the `alt` text whenever a photo changes. It is what screen readers
announce and what Google reads.

## How the scroll effects work

Three separate things, all of which degrade cleanly.

**Hero drift.** The hero photo shifts slightly as you scroll. Pure CSS using
`animation-timeline: scroll()`, wrapped in `@supports`. Browsers without it
show a still photo.

**Pinned story section.** The tall photo sticks in place while three text
blocks scroll past. `position: sticky` plus a large gap between blocks. Under
52rem it stacks normally, because sticky on a phone wastes the screen.

**Fade-ins.** Anything with `class="reveal"` fades up on entry, driven by
IntersectionObserver in `main.js`. Add `style="--delay: 90ms"` to stagger a
group. Content is visible by default and only hidden once JavaScript confirms
it is running, so a script failure never leaves a blank page. Reduced motion
turns it all off.

## Wiring up the calendar

The schedule page describes three bookable things: intro call, training
session, and check-in. The `.embed` div is waiting for a calendar.

1. Create three event types in Calendly or Acuity matching those three
2. Copy the embed code for your **profile page**, not a single event type,
   so all three show up in one calendar
3. Paste it inside the `.embed` div on `schedule.html`, replacing the
   placeholder paragraph
4. Delete the `border` and `place-items` lines from the `.embed` rule in
   `styles.css` so it stops looking like a placeholder

Acuity handles payments and packages better if he plans to sell session
blocks. Calendly is simpler and free for a single event type, though three
event types needs a paid tier.

## Wiring up the forms

The schedule and contact pages both post to Formspree.

1. Create a form at formspree.io
2. Paste the endpoint into `action` on `<form id="contact-form">`
3. Do this on both `schedule.html` and `contact.html`

The hidden `_gotcha` field is a spam trap. Leave it alone.

## Maintaining five pages by hand

The header and footer are duplicated in all five files. Change one, change all
five. The active nav link is marked with `aria-current="page"` on that page's
own link, which drives the underline and tells screen readers where you are.

This is the one real cost of skipping a build step. It is manageable at five
pages and stops being manageable around eight.

## When to move to Astro

Adding a blog, or hitting eight or more pages, or getting tired of editing the
nav five times. Astro takes this HTML and CSS as-is, so nothing gets thrown
away. What you gain is layouts, which puts the header and footer in one file.
Roughly an afternoon.

Things that do **not** require moving: the calendar (embed), payments (Stripe
Payment Links), more photos, more sections.

The only genuine rebuild is a client portal with logins and progress tracking.
That needs a backend and a database, and it is worth waiting until paying
clients ask for it.