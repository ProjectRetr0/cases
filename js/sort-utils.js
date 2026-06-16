(function () {
  function parseMoneyValue(str) {
    if (!str || str === "—" || str === "NDA") return 0;

    const isRub = /₽|руб/i.test(str);
    const matches = String(str).match(/[\d\s]+[.,]?[\d]*/g);
    if (!matches) return 0;

    const values = matches
      .map((part) => parseFloat(part.replace(/\s/g, "").replace(",", ".")))
      .filter((num) => !Number.isNaN(num));

    if (!values.length) return 0;

    const max = Math.max(...values);
    return isRub ? max / 90 : max;
  }

  function sortByRevenueDesc(items, getValue) {
    return [...items].sort((a, b) => getValue(b) - getValue(a));
  }

  window.parseMoneyValue = parseMoneyValue;
  window.sortByRevenueDesc = sortByRevenueDesc;
})();
