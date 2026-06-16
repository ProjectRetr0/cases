(function () {
  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function renderJob(job) {
    var resultsHtml = "";
    if (job.results && job.results.length) {
      resultsHtml =
        '<div class="job-results"><strong>Результаты</strong><ul>' +
        job.results.map(function (r) {
          return "<li>" + esc(r) + "</li>";
        }).join("") +
        "</ul></div>";
    }

    return (
      '<article class="job">' +
      '<div class="job-header">' +
      "<h3 class=\"job-title\">" + esc(job.role) + "</h3>" +
      '<span class="job-period">' + esc(job.period) + "</span>" +
      "</div>" +
      '<p class="job-company">' +
      esc(job.company) +
      " · " +
      esc(job.location) +
      (job.industry ? " · " + esc(job.industry) : "") +
      "</p>" +
      "<ul>" +
      job.bullets.map(function (b) {
        return "<li>" + esc(b) + "</li>";
      }).join("") +
      "</ul>" +
      resultsHtml +
      "</article>"
    );
  }

  window.renderResume = function (profileId) {
    var profile = window.RESUME_PROFILES[profileId];
    var contact = window.CONTACT;
    if (!profile || !contact) return;

    document.title = contact.name + " — " + profile.title;

    var root = document.getElementById("resume-root");
    if (!root) return;

    var topbar = document.getElementById("topbar");
    if (topbar) {
      topbar.remove();
    }

    root.innerHTML =
      '<section class="hero">' +
      '<div class="hero-top">' +
      '<img class="hero-avatar" src="' + esc(contact.avatar) + '" alt="' + esc(contact.name) + '">' +
      '<div class="hero-info">' +
      '<span class="hero-badge">' + esc(profile.experienceYears) + "</span>" +
      "<h1>" + esc(contact.name) + "</h1>" +
      '<p class="hero-role">' + esc(profile.title) + "</p>" +
      (profile.subtitle ? '<p class="hero-meta" style="margin-top:-8px;">' + esc(profile.subtitle) + "</p>" : "") +
      '<p class="hero-meta">' +
      esc(String(contact.age) + " лет") +
      " · " +
      esc(contact.city) +
      " · " +
      esc(contact.format) +
      "</p>" +
      '<p class="hero-salary">' + esc(profile.salary) + "</p>" +
      "</div></div>" +
      '<div class="contacts">' +
      '<a class="contact-chip" href="tel:' + esc(contact.phone.replace(/\s/g, "")) + '">' +
      esc(contact.phone) +
      "</a>" +
      '<a class="contact-chip" href="' + esc(contact.telegramUrl) + '" target="_blank" rel="noopener">' +
      "Telegram " + esc(contact.telegram) +
      "</a>" +
      '<a class="contact-chip" href="mailto:' + esc(contact.email) + '">' +
      esc(contact.email) +
      "</a>" +
      '<a class="contact-chip" href="' + esc(contact.whatsappUrl) + '" target="_blank" rel="noopener">' +
      "WhatsApp" +
      "</a>" +
      "</div></section>" +

      '<div class="metrics">' +
      profile.metrics.map(function (m) {
        return (
          '<div class="metric"><span class="metric-value">' + esc(m.value) + "</span>" +
          '<span class="metric-label">' + esc(m.label) + "</span></div>"
        );
      }).join("") +
      "</div>" +

      '<section class="section"><h2>Обо мне</h2><div class="about">' +
      profile.about.map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("") +
      "</div></section>" +

      '<section class="section"><h2>Опыт работы</h2><div class="timeline">' +
      profile.experience.map(renderJob).join("") +
      "</div></section>" +

      '<section class="section"><h2>Навыки</h2><div class="tags">' +
      profile.skills.map(function (s) {
        return '<span class="tag">' + esc(s) + "</span>";
      }).join("") +
      "</div></section>" +

      '<section class="section"><h2>' + esc(profile.ai.title) + '</h2><div class="ai-block">' +
      (profile.ai.intro ? "<p>" + esc(profile.ai.intro) + "</p>" : "") +
      "<ul>" +
      profile.ai.bullets.map(function (b) {
        return "<li>" + esc(b) + "</li>";
      }).join("") +
      "</ul></div></section>" +

      '<section class="section"><h2>Образование</h2><div class="education-block">' +
      profile.education.map(function (e) {
        return "<p><strong>" + esc(e.place) + "</strong><br>" + esc(e.detail) + "</p>";
      }).join("") +
      "</div></section>" +

      '<section class="section"><h2>Языки</h2><div class="lang-grid">' +
      profile.languages.map(function (l) {
        return (
          '<div class="lang-item"><strong>' + esc(l.name) + "</strong>" + esc(l.level) + "</div>"
        );
      }).join("") +
      "</div></section>" +

      (profile.recommendations && profile.recommendations.length
        ? '<section class="section"><h2>Рекомендации</h2><div class="timeline">' +
          profile.recommendations.map(function (r) {
            return (
              '<article class="job"><h3 class="job-title">' + esc(r.person) + "</h3>" +
              '<p class="job-company">' + esc(r.role) + " · " + esc(r.company) + "</p></article>"
            );
          }).join("") +
          "</div></section>"
        : "") +

      '<section class="cases-cta">' +
      '<a href="' + esc(contact.casesUrl) + '" class="btn btn-primary" target="_blank" rel="noopener">Смотреть кейсы</a>' +
      "</section>" +

      '<footer class="site-footer">Резюме · ' + esc(contact.name) + "</footer>";
  };
})();
