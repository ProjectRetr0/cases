(function () {
  const modal = document.getElementById("case-modal");
  if (!modal) return;

  const backdrop = modal.querySelector(".modal-backdrop");
  const closeBtn = modal.querySelector(".modal-close");
  const titleEl = modal.querySelector(".modal-title");
  const tagsEl = modal.querySelector(".modal-tags");
  const bodyEl = modal.querySelector(".modal-body");
  const statsEl = modal.querySelector(".modal-stats");

  function renderList(title, items) {
    if (!items || !items.length) return "";
    const lis = items.map((item) => `<li>${item}</li>`).join("");
    return `<section class="modal-section"><h3>${title}</h3><ul>${lis}</ul></section>`;
  }

  function renderStats(stats) {
    if (!stats) return "";
    const labels = {
      budget: "Бюджет",
      cpl: "CPL",
      revenue: "Выручка",
      period: "Период"
    };
    return Object.entries(stats)
      .map(
        ([key, value]) =>
          `<div class="modal-stat"><span class="modal-stat-label">${labels[key] || key}</span><span class="modal-stat-value">${value}</span></div>`
      )
      .join("");
  }

  function openModal(data) {
    titleEl.textContent = data.title;
    tagsEl.innerHTML = data.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    bodyEl.innerHTML =
      renderList("Проблема", data.problem) +
      renderList("Что сделали", data.actions) +
      renderList("Что в итоге", data.summary);
    statsEl.innerHTML = renderStats(data.stats);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  document.querySelectorAll(".case-card[data-case]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.case;
      const data = window.CASES_DATA.find((item) => item.id === id);
      if (data) openModal(data);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });
})();
