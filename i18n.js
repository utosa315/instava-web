(function () {
  var html = document.documentElement;
  var isLanding = document.body.classList.contains("landing");
  var landingLocales = window.INSTAVA_LANDING_LOCALES || {};
  var supported = isLanding
    ? ["ja", "en", "de", "es", "fr", "hi", "id", "it", "ko", "pt", "th", "tr", "vi", "zh", "ar"]
    : ["ja", "en"];

  function normalize(value) {
    var tag = String(value || "").toLowerCase().replace("_", "-");
    if (tag.indexOf("zh") === 0) return "zh";
    for (var i = 0; i < supported.length; i++) {
      if (tag === supported[i] || tag.indexOf(supported[i] + "-") === 0) return supported[i];
    }
    return null;
  }

  function detect() {
    if (isLanding) {
      var pathMatch = location.pathname.match(/^\/(ja|en|de|es|fr|hi|id|it|ko|pt|th|tr|vi|zh|ar)(?:\/|$)/);
      if (pathMatch) {
        try { localStorage.setItem("lang", pathMatch[1]); } catch (e) {}
        return pathMatch[1];
      }
    }

    try {
      var query = normalize(new URLSearchParams(location.search).get("lang"));
      if (query) {
        localStorage.setItem("lang", query);
        return query;
      }
    } catch (e) {}

    try {
      var stored = normalize(localStorage.getItem("lang"));
      if (stored) return stored;
    } catch (e) {}

    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (var i = 0; i < list.length; i++) {
      var locale = normalize(list[i]);
      if (locale) return locale;
    }
    return "en";
  }

  function localizedLanding(lang) {
    var copy = landingLocales[lang];
    var mount = document.getElementById("localized-landing");
    if (!copy || !mount) return;
    if (mount.firstElementChild && mount.firstElementChild.lang === lang) return;

    var image = function (screen, alt, lazy) {
      return '<img src="/assets/app-' + screen + '-' + lang + '.webp" alt="' + alt + '" width="1080" height="2424"' + (lazy ? ' loading="lazy"' : '') + '>';
    };
    mount.innerHTML =
      '<div class="i18n" lang="' + lang + '">' +
        '<section class="hero">' +
          '<div class="hero-copy"><p class="eyebrow">Instava / Android</p><h1>' + copy.tag + '</h1><p class="hero-lead">' + copy.intro + '</p><div class="hero-action"><a class="play-badge" href="https://play.google.com/store/apps/details?id=com.tardigrader_app.instava" target="_blank" rel="noopener"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" width="200" height="77"></a></div></div>' +
          '<figure class="hero-render"><div class="hero-device-stage" aria-label="Instava">' +
            '<div class="hero-device hero-device-home">' + image("home", copy.steps[1], false) + '</div>' +
            '<div class="hero-device hero-device-saved">' + image("saved", copy.device[0], false) + '</div>' +
            '<div class="hero-device hero-device-select">' + image("select", copy.steps[2], false) + '</div>' +
          '</div><figcaption class="hero-flow"><ol><li><span>1</span><strong>' + copy.steps[0] + '</strong></li><li><span>2</span><strong>' + copy.steps[1] + '</strong></li><li><span>3</span><strong>' + copy.steps[2] + '</strong></li></ol></figcaption><img class="spot-mascot mascot-link" src="/assets/mascot-link.webp" alt="" width="360" height="360" aria-hidden="true"></figure>' +
          '<div class="hero-proof"><p class="proof-intro">Instava</p><p><strong>' + copy.ads[0] + '</strong><span>' + copy.ads[1] + '</span></p><p><strong>' + copy.login[0] + '</strong><span>' + copy.login[1] + '</span></p><p><strong>' + copy.quality[0] + '</strong><span>' + copy.quality[1] + '</span></p></div>' +
        '</section>' +
        '<section class="formats section-shell"><div class="section-heading"><p class="section-kicker">Why Instava</p><h2>' + copy.quality[0] + '</h2></div><div class="format-grid">' +
          '<article><span class="format-tag">NO SURPRISE ADS</span><h3>' + copy.ads[0] + '</h3><p>' + copy.ads[1] + '</p></article>' +
          '<article><span class="format-tag">NO LOGIN</span><h3>' + copy.login[0] + '</h3><p>' + copy.login[1] + '</p></article>' +
          '<article><span class="format-tag">QUALITY</span><h3>' + copy.quality[0] + '</h3><p>' + copy.quality[1] + '</p></article>' +
        '</div><aside class="format-note"><p class="format-question"><span aria-hidden="true">!</span>' + copy.note[0] + '</p><div class="format-answer"><p>' + copy.note[1] + '</p></div></aside></section>' +
        '<section class="how section-shell" id="how-' + lang + '"><div class="section-heading"><p class="section-kicker">How it works</p><h2>' + copy.how + '</h2></div><div class="steps-grid">' +
          '<article><div class="phone-frame">' + image("home", copy.steps[0], true) + '</div><span>1</span><h3>' + copy.steps[0] + '</h3></article>' +
          '<article><div class="phone-frame">' + image("select", copy.steps[1], true) + '</div><span>2</span><h3>' + copy.steps[1] + '</h3></article>' +
          '<article><div class="phone-frame">' + image("saved", copy.steps[2], true) + '</div><span>3</span><h3>' + copy.steps[2] + '</h3></article>' +
        '</div></section>' +
        '<section class="trust section-shell"><div><p class="section-kicker">Privacy</p><h2>' + copy.login[0] + '</h2><p>' + copy.login[1] + '</p><a href="/privacy/?lang=en">Privacy Policy →</a></div><svg aria-hidden="true"><use href="#shield"></use></svg></section>' +
        '<section class="release section-shell"><img class="release-icon" src="/favicon.svg" alt="Instava" width="76" height="76"><div><p class="section-kicker">Google Play</p><h2>' + copy.free[0] + '</h2><p>' + copy.free[1] + '</p><a class="play-badge" href="https://play.google.com/store/apps/details?id=com.tardigrader_app.instava" target="_blank" rel="noopener"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" width="200" height="77" loading="lazy"></a></div><img class="spot-mascot mascot-wave" src="/assets/mascot-wave.webp" alt="" width="360" height="360" loading="lazy" aria-hidden="true"></section>' +
        '<aside class="usage-note section-shell"><p><strong>' + copy.note[0] + '</strong> ' + copy.note[1] + '</p></aside>' +
      '</div>';
  }

  function apply(lang) {
    if (supported.indexOf(lang) === -1) lang = "en";
    if (isLanding && lang !== "ja" && lang !== "en") localizedLanding(lang);
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    var panels = document.querySelectorAll(".i18n[lang]");
    for (var panelIndex = 0; panelIndex < panels.length; panelIndex++) {
      panels[panelIndex].style.display = panels[panelIndex].lang === lang ? "block" : "none";
    }
    var headerLinks = document.querySelectorAll(".header-link[data-header-lang]");
    for (var linkIndex = 0; linkIndex < headerLinks.length; linkIndex++) {
      var baseLang = headerLinks[linkIndex].getAttribute("data-header-lang");
      var showLink = baseLang === lang || (lang !== "ja" && lang !== "en" && baseLang === "en");
      headerLinks[linkIndex].style.display = showLink ? "block" : "none";
      if (showLink && lang !== "ja" && lang !== "en") {
        headerLinks[linkIndex].lang = lang;
        headerLinks[linkIndex].href = "#how-" + lang;
        headerLinks[linkIndex].textContent = landingLocales[lang].how;
      } else {
        headerLinks[linkIndex].lang = baseLang;
      }
      if (baseLang === "en" && (lang === "ja" || lang === "en")) {
        headerLinks[linkIndex].href = "#how-en";
        headerLinks[linkIndex].textContent = "How it works";
      }
    }

    if (landingLocales[lang]) {
      document.title = landingLocales[lang].title;
      var description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute("content", landingLocales[lang].intro);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      var ogDescription = document.querySelector('meta[property="og:description"]');
      var ogLocale = document.querySelector('meta[property="og:locale"]');
      var twitterTitle = document.querySelector('meta[name="twitter:title"]');
      var twitterDescription = document.querySelector('meta[name="twitter:description"]');
      var socialLocales = { ar: "ar_AR", de: "de_DE", es: "es_419", fr: "fr_FR", hi: "hi_IN", id: "id_ID", it: "it_IT", ko: "ko_KR", pt: "pt_BR", th: "th_TH", tr: "tr_TR", vi: "vi_VN", zh: "zh_TW" };
      if (ogTitle) ogTitle.setAttribute("content", landingLocales[lang].title);
      if (ogDescription) ogDescription.setAttribute("content", landingLocales[lang].intro);
      if (ogLocale) ogLocale.setAttribute("content", socialLocales[lang]);
      if (twitterTitle) twitterTitle.setAttribute("content", landingLocales[lang].title);
      if (twitterDescription) twitterDescription.setAttribute("content", landingLocales[lang].intro);
    } else {
      var title = document.querySelector("title");
      if (title && title.dataset[lang]) document.title = title.dataset[lang];
      var desc = document.querySelector('meta[name="description"]');
      if (desc && desc.dataset[lang]) desc.setAttribute("content", desc.dataset[lang]);
      var localizedMeta = document.querySelectorAll("meta[data-ja][data-en]");
      for (var i = 0; i < localizedMeta.length; i++) {
        if (localizedMeta[i].dataset[lang]) localizedMeta[i].setAttribute("content", localizedMeta[i].dataset[lang]);
      }
    }

    var select = document.getElementById("language-select");
    if (select) select.value = lang;
  }

  apply(detect());

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-set-lang]");
    if (!button) return;
    var next = normalize(button.getAttribute("data-set-lang"));
    if (!next) return;
    try { localStorage.setItem("lang", next); } catch (e) {}
    apply(next);
  });

  document.addEventListener("change", function (event) {
    if (event.target.id !== "language-select") return;
    var next = normalize(event.target.value);
    if (!next) return;
    try { localStorage.setItem("lang", next); } catch (e) {}
    if (isLanding) {
      location.assign("/" + next + "/");
      return;
    }
    apply(next);
  });
})();
