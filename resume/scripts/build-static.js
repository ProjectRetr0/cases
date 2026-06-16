const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const css = fs.readFileSync(path.join(root, "css/style.css"), "utf8");

global.window = {};
eval(fs.readFileSync(path.join(root, "js/resume-data.js"), "utf8"));

const CASES_URL = window.CONTACT.casesUrl;

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderJob(job) {
  const resultsHtml =
    job.results && job.results.length
      ? `<div class="job-results"><strong>Результаты</strong><ul>${job.results
          .map((r) => `<li>${esc(r)}</li>`)
          .join("")}</ul></div>`
      : "";

  return `<article class="job">
<div class="job-header">
<h3 class="job-title">${esc(job.role)}</h3>
<span class="job-period">${esc(job.period)}</span>
</div>
<p class="job-company">${esc(job.company)} · ${esc(job.location)}${job.industry ? " · " + esc(job.industry) : ""}</p>
<ul>${job.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
${resultsHtml}
</article>`;
}

function casesCta() {
  return `<section class="cases-cta">
<a href="${esc(CASES_URL)}" class="btn btn-primary" target="_blank" rel="noopener">Смотреть кейсы</a>
</section>`;
}

function renderResumeBody(profileId) {
  const profile = window.RESUME_PROFILES[profileId];
  const contact = window.CONTACT;

  const main = `<main class="container">
<section class="hero">
<div class="hero-top">
<img class="hero-avatar" src="${esc(contact.avatar)}" alt="${esc(contact.name)}">
<div class="hero-info">
<span class="hero-badge">${esc(profile.experienceYears)}</span>
<h1>${esc(contact.name)}</h1>
<p class="hero-role">${esc(profile.title)}</p>
${profile.subtitle ? `<p class="hero-meta" style="margin-top:-8px;">${esc(profile.subtitle)}</p>` : ""}
<p class="hero-meta">${esc(contact.age + " лет")} · ${esc(contact.city)} · ${esc(contact.format)}</p>
<p class="hero-salary">${esc(profile.salary)}</p>
</div></div>
<div class="contacts">
<a class="contact-chip" href="tel:${esc(contact.phone.replace(/\s/g, ""))}">${esc(contact.phone)}</a>
<a class="contact-chip" href="${esc(contact.telegramUrl)}" target="_blank" rel="noopener">Telegram ${esc(contact.telegram)}</a>
<a class="contact-chip" href="mailto:${esc(contact.email)}">${esc(contact.email)}</a>
<a class="contact-chip" href="${esc(contact.whatsappUrl)}" target="_blank" rel="noopener">WhatsApp</a>
</div></section>
<div class="metrics">${profile.metrics
    .map(
      (m) =>
        `<div class="metric"><span class="metric-value">${esc(m.value)}</span><span class="metric-label">${esc(m.label)}</span></div>`
    )
    .join("")}</div>
<section class="section"><h2>Обо мне</h2><div class="about">${profile.about.map((p) => `<p>${esc(p)}</p>`).join("")}</div></section>
<section class="section"><h2>Опыт работы</h2><div class="timeline">${profile.experience.map(renderJob).join("")}</div></section>
<section class="section"><h2>Навыки</h2><div class="tags">${profile.skills.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div></section>
<section class="section"><h2>${esc(profile.ai.title)}</h2><div class="ai-block">${profile.ai.intro ? `<p>${esc(profile.ai.intro)}</p>` : ""}<ul>${profile.ai.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div></section>
<section class="section"><h2>Образование</h2><div class="education-block">${profile.education
    .map((e) => `<p><strong>${esc(e.place)}</strong><br>${esc(e.detail)}</p>`)
    .join("")}</div></section>
<section class="section"><h2>Языки</h2><div class="lang-grid">${profile.languages
    .map((l) => `<div class="lang-item"><strong>${esc(l.name)}</strong>${esc(l.level)}</div>`)
    .join("")}</div></section>
${
  profile.recommendations && profile.recommendations.length
    ? `<section class="section"><h2>Рекомендации</h2><div class="timeline">${profile.recommendations
        .map(
          (r) =>
            `<article class="job"><h3 class="job-title">${esc(r.person)}</h3><p class="job-company">${esc(r.role)} · ${esc(r.company)}</p></article>`
        )
        .join("")}</div></section>`
    : ""
}
${casesCta()}
<footer class="site-footer">Резюме · ${esc(contact.name)}</footer>
</main>`;

  return main;
}

function page(title, description, body) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <style>
${css}
  </style>
</head>
<body>
${body}
</body>
</html>
`;
}

const indexBody = `<header class="topbar"><div class="topbar-inner"><span style="font-weight:700;color:#fff;">Резюме</span></div></header>
<main class="container">
<header class="hub-header">
<img class="hub-avatar" src="images/ava.png" alt="Аксёнов Роман Владимирович">
<h1>Аксёнов Роман Владимирович</h1>
<p>9+ лет в маркетинге · Самара · удалённо · performance · AI · ROMI</p>
</header>
<div class="hub-grid">
<article class="hub-card">
<h2>Директор по маркетингу / CMO</h2>
<p class="salary">200 000 ₽</p>
<p>Стратегия, команда, бюджеты до 15 млн ₽/мес, системный маркетинг и AI-автоматизация. Для роли руководителя маркетинга.</p>
<div class="hub-actions">
<a href="cmo.html" class="btn btn-primary">Открыть резюме</a>
</div></article>
<article class="hub-card">
<h2>Маркетолог</h2>
<p class="salary">150 000 ₽</p>
<p>Hands-on digital: таргет, воронки, CRM, аналитика и AI-инструменты. Для роли маркетолога в команде или на проекте.</p>
<div class="hub-actions">
<a href="marketer.html" class="btn btn-primary">Открыть резюме</a>
</div></article>
</div>
${casesCta()}
<footer class="site-footer">
<p>Telegram <a href="https://t.me/Aksenovv" target="_blank" rel="noopener">@Aksenovv</a>
· <a href="mailto:shupenkoroman@icloud.com">shupenkoroman@icloud.com</a></p>
</footer>
</main>`;

fs.writeFileSync(
  path.join(root, "index.html"),
  page(
    "Аксёнов Роман — Резюме",
    "Резюме Аксёнова Романа: директор по маркетингу / CMO и маркетолог. 9+ лет опыта, performance, AI, ROMI.",
    indexBody
  )
);

fs.writeFileSync(
  path.join(root, "cmo.html"),
  page(
    "Аксёнов Роман — CMO",
    "Резюме: директор по маркетингу / CMO. Бюджеты до 15 млн ₽, ROMI 150–200%, AI и системный маркетинг.",
    renderResumeBody("cmo")
  )
);

fs.writeFileSync(
  path.join(root, "marketer.html"),
  page(
    "Аксёнов Роман — Маркетолог",
    "Резюме: маркетолог. 9+ лет digital, performance, воронки, CRM, AI-инструменты.",
    renderResumeBody("marketer")
  )
);

console.log("Built: index.html, cmo.html, marketer.html (self-contained)");
