/* Shared across all pages. Everything below checks that its element exists
   first, so one file can serve pages that do not have a form or a gallery. */

document.documentElement.classList.add("js");


/* Mobile menu -------------------------------------------------------------- */

const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!open));
    toggle.setAttribute("aria-expanded", String(!open));
  });
}


/* Scroll reveals -----------------------------------------------------------
   Adds .is-visible once an element scrolls into view. The CSS handles the
   actual animation. Anything with class="reveal" gets picked up.
   -------------------------------------------------------------------------- */

const revealTargets = document.querySelectorAll(".reveal");

if (revealTargets.length) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Reveal once, not on every pass.
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
}


/* Contact and booking forms ------------------------------------------------
   Submits in the background so the visitor stays on the page. With JavaScript
   off, the form still posts normally to the action URL.
   -------------------------------------------------------------------------- */

const form = document.getElementById("contact-form");

if (form) {
  const status = document.getElementById("form-status");
  const submitButton = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    status.removeAttribute("data-state");
    status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error(response.status);

      form.reset();
      status.setAttribute("data-state", "ok");
      status.textContent = "Sent. You will hear back within a day.";
    } catch {
      status.setAttribute("data-state", "error");
      status.textContent =
        "That did not send. Email hello@jordanreeves.com directly and it will get through.";
    } finally {
      submitButton.disabled = false;
    }
  });
}


/* Footer year --------------------------------------------------------------- */

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});