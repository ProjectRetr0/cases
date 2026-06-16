(function () {
  const list = document.getElementById("recent-list");
  if (!list || !window.RECENT_SECTIONS) return;

  function renderCard(item) {
    const note = item.note
      ? `<p class="recent-note">${item.note}</p>`
      : "";
    const miroBtn = item.link
      ? `<a class="btn-miro" href="${item.link}" target="_blank" rel="noopener noreferrer">Схема и скрины в Miro →</a>`
      : "";

    return `
      <article class="recent-card">
        <div class="recent-card-header">
          <h3>${item.name}</h3>
          <span class="type-badge">${item.type || "—"}</span>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <label>Вложено в рекламу</label>
            <span>${item.spend || "—"}</span>
          </div>
          <div class="stat-item">
            <label>Получено из воронки</label>
            <span>${item.revenue || "—"}</span>
          </div>
          <div class="stat-item">
            <label>CAC</label>
            <span>${item.cac || "—"}</span>
          </div>
          <div class="stat-item">
            <label>LTV</label>
            <span>${item.ltv || "—"}</span>
          </div>
          <div class="stat-item">
            <label>ROMI</label>
            <span class="romi">${item.romi || "—"}</span>
          </div>
        </div>
        ${note}
        ${miroBtn}
      </article>
    `;
  }

  function renderSections(sections) {
    list.innerHTML = "";

    const sortedSections = sections.map((section) => ({
      ...section,
      cases: window.sortByRevenueDesc(section.cases, (item) =>
        window.parseMoneyValue(item.revenue)
      )
    }));

    sortedSections.forEach((section) => {
      const block = document.createElement("section");
      block.className = "sheet-section";
      block.innerHTML = `<h2 class="sheet-title">${section.title}</h2>`;

      if (!section.cases.length) {
        block.innerHTML += `<p class="sheet-empty">Кейсы этого раздела пока не загружены.</p>`;
      } else {
        const cards = document.createElement("div");
        cards.className = "cases-list";
        cards.innerHTML = section.cases.map(renderCard).join("");
        block.appendChild(cards);
      }

      list.appendChild(block);
    });
  }

  renderSections(window.RECENT_SECTIONS);
})();
