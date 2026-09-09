# Trainer site

Five-page static site. No build step, no dependencies.

```
trainer-site/
  index.html      home, photo hero and pinned scroll
  about.html
  pricing.html
  schedule.html   booking embed and request form
  contact.html
  styles.css      shared, tokens at the top
  main.js         shared, nav + reveals + forms
  assets/         images
```

## Run it locally

```bash
cd trainer-site
python3 -m http.server 8000
```

Open http://localhost:8000

## Replacing the images

`assets/` currently holds labeled placeholders. Drop your real photos in with
the same filenames and the site picks them up with no code changes.

| File | Size | What it is |
|---|---|---|
| `hero.jpg` | 2400 x 1400 | Home page hero. Wide, and leave room at the bottom because text sits over it. |
| `story.jpg` | 1400 x 1700 | Tall. Stays pinned while text scrolls past. |
| `coach.jpg` | 1200 x 1500 | Portrait, About page. |
| `gallery-1.jpg` | 1000 x 1250 | Facility or equipment. |
| `gallery-2.jpg` | 1000 x 1250 | A client mid-set. |
| `gallery-3.jpg` | 1000 x 1250 | Detail shot. |

Two things worth doing before you upload them:

Compress them. Run them through squoosh.app and target under 300KB each. A
2MB hero photo will undo everything good about a site with no framework.

Update the `alt` text on every image to describe what is actually in your
photo. It is what screen readers announce and what Google reads.

## How the scroll effects work

Three separate things, all of which degrade cleanly.

**Hero drift.** The hero photo shifts slightly as you scroll. Pure CSS using
`animation-timeline: scroll()`, wrapped in an `@supports` block. Browsers
without it show a still photo and nothing breaks.

**Pinned story section.** On the home page the tall photo sticks in place
while three text blocks scroll past it. This is `position: sticky` plus a
large gap between blocks. On screens under 52rem it stacks normally, because
sticky on a phone just wastes the screen.

**Fade-ins.** Anything with `class="reveal"` fades up when it enters view,
driven by IntersectionObserver in `main.js`. Add `style="--delay: 90ms"` to
stagger a group. Content is visible by default and only hidden once JavaScript
confirms it is running, so a JS failure never leaves a blank page. Anyone with
reduced motion turned on sees everything immediately.

To add the effect to a new element, put `reveal` in its class list. That is all.

## Wiring up the booking calendar

The schedule page has an empty `.embed` div waiting for a calendar.

1. Set up a Calendly or Acuity account and create your event type
2. Copy the inline embed snippet they give you
3. Paste it inside the `.embed` div on `schedule.html`, replacing the
   placeholder paragraph
4. Delete the `border` and `place-items` lines from the `.embed` rule in
   `styles.css` so it stops looking like a placeholder

Acuity handles payments and packages better if you plan to sell session
blocks. Calendly is simpler and free for a single event type.

## Wiring up the forms

The schedule and contact pages both post to Formspree.

1. Create a form at formspree.io
2. Paste the endpoint into the `action` attribute on `<form id="contact-form">`
3. Do this on both `schedule.html` and `contact.html`

The hidden `_gotcha` field is a spam trap. Leave it alone.

## Things to swap before launch

Search all five files for `SWAP`, plus:

- Coach name in every `<title>`, the `.brand` link, and the footer
- Email and phone on `schedule.html`, `contact.html`, and in `main.js`
- Address and hours on `contact.html`
- Prices and what each plan includes on `pricing.html`
- The testimonial on `index.html`, or delete that section until a real one exists
- Every `alt` attribute once the real photos are in

## Maintaining five pages by hand

The header and footer are duplicated in all five files, marked with
`SHARED HEADER` and `SHARED FOOTER` comments. Change one, change all five.

The active nav link is marked with `aria-current="page"` on that page's own
link. If you add a page, remember to add it to both nav blocks in all files.

This is the one real cost of skipping a build step. It is manageable at five
pages and it stops being manageable somewhere around eight.

## When to move to Astro

Adding a blog, or hitting eight or more pages, or getting tired of editing the
nav five times. Astro takes this HTML and CSS as-is, so nothing gets thrown
away. What you gain is layouts, which puts the header and footer in one file.
Roughly an afternoon of work.

Things that do **not** require moving: booking (embed), payments (Stripe
Payment Links), more images, more sections. Those all fit here.

The only genuine rebuild is a client portal with logins and progress tracking.
That needs a real backend and a database, and it is worth waiting until paying
clients are asking for it.

## Design tokens

Everything visual comes from the `:root` block at the top of `styles.css`.
Change `--blue` and the site rebrands. Change the `--step-*` values and the
whole type scale shifts. Do not hardcode colors or sizes below that block,
because that is what makes a stylesheet impossible to change later.