(function () {
  var html = document.documentElement;

  function detect() {
    try {
      var params = new URLSearchParams(location.search);
      var query = params.get("lang");
      if (query === "ja" || query === "en") {
        try {
          localStorage.setItem("lang", query);
        } catch (e) {}
        return query;
      }
    } catch (e) {}

    try {
      var stored = localStorage.getItem("lang");
      if (stored === "ja" || stored === "en") return stored;
    } catch (e) {}

    var list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || "en"];

    for (var i = 0; i < list.length; i++) {
      var tag = String(list[i] || "").toLowerCase();
      if (tag.indexOf("ja") === 0) return "ja";
      if (tag.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  function apply(lang) {
    html.lang = lang;

    var title = document.querySelector("title");
    if (title && title.dataset[lang]) document.title = title.dataset[lang];

    var desc = document.querySelector('meta[name="description"]');
    if (desc && desc.dataset[lang]) desc.setAttribute("content", desc.dataset[lang]);

    var localizedMeta = document.querySelectorAll("meta[data-ja][data-en]");
    for (var i = 0; i < localizedMeta.length; i++) {
      if (localizedMeta[i].dataset[lang]) {
        localizedMeta[i].setAttribute("content", localizedMeta[i].dataset[lang]);
      }
    }
  }

  apply(detect());

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-lang]");
    if (!button) return;
    var next = button.getAttribute("data-set-lang");
    if (next !== "ja" && next !== "en") return;
    try {
      localStorage.setItem("lang", next);
    } catch (e) {}
    apply(next);
  });
})();
