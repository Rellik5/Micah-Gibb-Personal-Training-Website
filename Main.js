// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.dataset.open === "true";
  nav.dataset.open = String(!open);
  toggle.setAttribute("aria-expanded", String(!open));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form. Submits to Formspree without leaving the page.
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      form.reset();
      status.textContent = "Sent. You will hear back within a day.";
    } else {
      status.textContent = "That did not send. Email us directly instead.";
    }
  } catch {
    status.textContent = "That did not send. Email us directly instead.";
  }
});