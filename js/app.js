(function () {
  "use strict";

  var WALLET = "TNY3pyHMVeJ3Ac5RXWuEigj11wPWnggs2t";
  var BOT = "https://t.me/CapitalFlowDeskBot";
  var ADMIN = "https://t.me/Mohammad_GNA";
  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

  /** Map selected USDT amount → bot deep-link payload (plan → TxID). */
  var PAY_START = {
    "19": "pay_19",
    "29": "pay_29",
    "99": "pay_99",
    "299": "pay_299"
  };

  function applyTheme() {
    if (!tg || !tg.themeParams) return;
    var tp = tg.themeParams;
    var root = document.documentElement;
    if (tp.bg_color) root.style.setProperty("--bg", tp.bg_color);
    if (tp.secondary_bg_color) root.style.setProperty("--bg-elev", tp.secondary_bg_color);
    if (tp.text_color) root.style.setProperty("--text", tp.text_color);
    if (tp.hint_color) root.style.setProperty("--muted", tp.hint_color);
    if (tp.button_color) root.style.setProperty("--accent", tp.button_color);
    if (tp.link_color) root.style.setProperty("--accent-2", tp.link_color);
    if (tp.section_separator_color) root.style.setProperty("--line", tp.section_separator_color);
  }

  function initTelegram() {
    if (!tg) return;
    try {
      tg.ready();
      tg.expand();
      if (typeof tg.setHeaderColor === "function") tg.setHeaderColor("secondary_bg_color");
      if (typeof tg.setBackgroundColor === "function") tg.setBackgroundColor("bg_color");
    } catch (e) { /* ignore outside Telegram */ }
    applyTheme();
    if (tg.onEvent) {
      tg.onEvent("themeChanged", applyTheme);
    }
  }

  function showScreen(name) {
    var screens = document.querySelectorAll(".screen");
    var tabs = document.querySelectorAll(".tab");
    screens.forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-screen") === name);
    });
    tabs.forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-nav") === name);
    });
    window.scrollTo(0, 0);
    if (tg && typeof tg.HapticFeedback !== "undefined" && tg.HapticFeedback.selectionChanged) {
      try { tg.HapticFeedback.selectionChanged(); } catch (e) {}
    }
  }

  function selectedAmount() {
    var sel = document.querySelector(".plan.selected");
    return sel ? sel.getAttribute("data-amount") : "19";
  }

  function botPayUrl(amount) {
    var payload = PAY_START[String(amount)] || "pay_19";
    return BOT + "?start=" + payload;
  }

  function syncPayCta() {
    var amount = selectedAmount();
    var dm = document.getElementById("btn-dm");
    if (dm) {
      dm.setAttribute("href", botPayUrl(amount));
      dm.textContent = "Open bot · send TxID (" + amount + " USDT) →";
    }
    var amt = document.getElementById("selected-amount");
    if (amt) amt.textContent = String(amount);
  }

  function selectPlan(amount) {
    document.querySelectorAll(".plan").forEach(function (el) {
      el.classList.toggle("selected", el.getAttribute("data-amount") === String(amount));
    });
    syncPayCta();
  }

  function copyWallet() {
    var text = WALLET;
    function done(ok) {
      var btn = document.getElementById("btn-copy");
      if (!btn) return;
      var prev = btn.textContent;
      btn.textContent = ok ? "Copied" : "Copy failed";
      setTimeout(function () { btn.textContent = prev; }, 1400);
      if (ok && tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
        try { tg.HapticFeedback.notificationOccurred("success"); } catch (e) {}
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      done(ok);
    } catch (e) {
      done(false);
    }
  }

  function bind() {
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.addEventListener("click", function () {
        showScreen(el.getAttribute("data-nav"));
      });
    });
    document.querySelectorAll(".plan").forEach(function (el) {
      el.addEventListener("click", function () {
        selectPlan(el.getAttribute("data-amount"));
      });
    });
    var copyBtn = document.getElementById("btn-copy");
    if (copyBtn) copyBtn.addEventListener("click", copyWallet);
    var wallet = document.getElementById("wallet");
    if (wallet) wallet.textContent = WALLET;
    // Primary CTA must stay bot intake — never overwrite with admin DM.
    syncPayCta();
  }

  initTelegram();
  bind();
  selectPlan(19);
})();
