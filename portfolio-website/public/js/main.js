/* Portfolio frontend — all content is driven by the backend API */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

const esc = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function loadPortfolio() {
  const res = await fetch("/api/portfolio");
  if (!res.ok) throw new Error("Failed to load portfolio");
  const { profile, projects, skills } = await res.json();

  document.getElementById("heroName").textContent = profile.name;
  document.getElementById("heroTitle").textContent = profile.title;
  document.getElementById("heroBio").textContent = profile.bio;
  document.getElementById("footerText").textContent =
    `© ${new Date().getFullYear()} ${profile.name} · ${profile.email} · ${profile.location}`;

  const socialLabels = { linkedin: "LinkedIn", github: "GitHub", leetcode: "LeetCode", codeforces: "Codeforces" };
  document.getElementById("heroSocials").innerHTML = Object.entries(profile.socials || {})
    .filter(([, url]) => url)
    .map(([k, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${socialLabels[k] || esc(k)}</a>`)
    .join("");

  document.getElementById("skillsGrid").innerHTML = skills
    .map(
      (s) => `<div class="skill-card">
        <h3>${esc(s.category)}</h3>
        <div class="tags">${s.items.map((i) => `<span class="tag">${esc(i)}</span>`).join("")}</div>
      </div>`
    )
    .join("");

  document.getElementById("projectsGrid").innerHTML = projects
    .map(
      (p) => `<article class="project-card">
        <span class="period">${esc(p.period || "")}${p.role ? " · " + esc(p.role) : ""}</span>
        <h3>${esc(p.title)}</h3>
        <div class="tags">${(p.techStack || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <ul>${(p.description || []).map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  document.getElementById("educationList").innerHTML = (profile.education || [])
    .map(
      (e) => `<div class="edu-card">
        <h3>${esc(e.degree)}</h3>
        <p>${esc(e.institution)} · ${esc(e.period)} · ${esc(e.score || "")}</p>
      </div>`
    )
    .join("");
}

loadPortfolio().catch((err) => {
  document.getElementById("heroName").textContent = "Could not load content";
  console.error(err);
});

/* Contact form -> POST /api/contact (server-side validation + DB + email) */
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  status.textContent = "Sending…";
  submitBtn.disabled = true;

  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.errors?.map((e2) => e2.msg).join(" ") || data.message || "Something went wrong.";
      throw new Error(msg);
    }
    status.className = "form-status ok";
    status.textContent = data.message;
    form.reset();
  } catch (err) {
    status.className = "form-status err";
    status.textContent = err.message;
  } finally {
    submitBtn.disabled = false;
  }
});
