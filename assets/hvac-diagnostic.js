/* =====================================================================
   HVAC Diagnostic (Version 1) — Consumer Support Help
   Lightweight, educational-only guided questions. No AI, no diagnosis,
   no guarantees. Ends with the configurable click-to-call CTA.
   Phone number comes from window.HVAC_PHONE_NUMBER (set in hvac.html).
   ===================================================================== */
(function () {
  "use strict";

  var mount = document.getElementById("diagBody");
  if (!mount) return;

  var QUESTIONS = [
    {
      id: "system",
      q: "Which part of your system is the concern?",
      options: [
        { label: "Cooling / air conditioning", value: "cooling" },
        { label: "Heating / furnace or heat pump", value: "heating" },
        { label: "Air quality, dust, or humidity", value: "air" },
        { label: "Not sure — something just seems off", value: "unsure" }
      ]
    },
    {
      id: "symptom",
      q: "What are you noticing most?",
      options: [
        { label: "It runs but comfort is poor (too warm/cold)", value: "comfort" },
        { label: "Unusual noises or smells", value: "noise" },
        { label: "It turns on and off a lot, or won't start", value: "cycling" },
        { label: "Higher energy use or weak airflow", value: "airflow" }
      ]
    },
    {
      id: "basics",
      q: "Have you already checked the simple basics (thermostat setting, air filter, and breaker)?",
      options: [
        { label: "Yes, I've checked those", value: "checked" },
        { label: "Not yet", value: "not-checked" }
      ]
    },
    {
      id: "duration",
      q: "How long has this been going on?",
      options: [
        { label: "Just started today", value: "today" },
        { label: "A few days to a couple of weeks", value: "weeks" },
        { label: "Off and on for a while", value: "onoff" }
      ]
    }
  ];

  var answers = {};
  var step = 0;

  function callButtonHtml() {
    return '<a class="btn btn-primary" data-call href="#">Call an HVAC Professional</a>';
  }

  function rewireCallButtons() {
    var cfg = window.HVAC_PHONE_NUMBER || {};
    var hasNumber = cfg.tel && cfg.tel.indexOf("REPLACE_WITH") === -1;
    mount.querySelectorAll("[data-call]").forEach(function (a) {
      if (hasNumber) {
        a.setAttribute("href", "tel:" + cfg.tel.replace(/[^+0-9]/g, ""));
        if (cfg.display) a.setAttribute("aria-label", "Call an HVAC professional at " + cfg.display);
      } else {
        a.setAttribute("href", "#related");
        a.setAttribute("data-call-unconfigured", "true");
      }
    });
  }

  function progress() {
    return Math.round((step / QUESTIONS.length) * 100);
  }

  function renderQuestion() {
    var item = QUESTIONS[step];
    var html = "";
    html += '<div class="diag-progress"><span style="width:' + progress() + '%"></span></div>';
    html += '<p class="diag-q">' + item.q + "</p>";
    html += '<div class="diag-options">';
    item.options.forEach(function (opt) {
      html += '<button type="button" class="diag-opt" data-value="' + opt.value + '">' + opt.label + "</button>";
    });
    html += "</div>";
    html += '<div class="diag-foot"><span class="diag-step">Question ' + (step + 1) + " of " + QUESTIONS.length + "</span>";
    if (step > 0) html += '<button type="button" class="diag-back" id="diagBack">&larr; Back</button>';
    html += "</div>";
    mount.innerHTML = html;

    mount.querySelectorAll(".diag-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        answers[item.id] = btn.getAttribute("data-value");
        step++;
        if (step >= QUESTIONS.length) { renderResult(); }
        else { renderQuestion(); focusFirst(); }
      });
    });
    var back = document.getElementById("diagBack");
    if (back) back.addEventListener("click", function () { step--; renderQuestion(); focusFirst(); });
  }

  function focusFirst() {
    var first = mount.querySelector(".diag-opt");
    if (first) first.focus();
  }

  function guidanceText() {
    var tips = [];
    if (answers.basics === "not-checked") {
      tips.push("Start with the basics: confirm the thermostat is set correctly, check or replace the air filter, and make sure the breaker hasn't tripped. These simple steps resolve many minor issues.");
    } else {
      tips.push("Since you've already checked the thermostat, filter, and breaker, the next step is usually a closer look by someone who can inspect the equipment safely.");
    }
    if (answers.symptom === "noise") {
      tips.push("New noises or smells are worth having a professional evaluate, as they can point to a component that needs attention.");
    }
    if (answers.symptom === "cycling") {
      tips.push("Frequent on/off cycling or a system that won't start can have several causes and is commonly assessed by a technician.");
    }
    if (answers.duration === "today" && (answers.system === "heating" || answers.system === "cooling")) {
      tips.push("If you're without heating or cooling in extreme weather, it's reasonable to seek help promptly — especially if anyone in the home is vulnerable.");
    }
    tips.push("This tool is educational and does not diagnose your system. A licensed HVAC professional can assess your specific situation and explain your options.");
    return tips;
  }

  function renderResult() {
    var tips = guidanceText();
    var html = "";
    html += '<div class="diag-result">';
    html += '<div class="diag-progress"><span style="width:100%"></span></div>';
    html += "<h3>Here's some general guidance</h3>";
    html += '<div class="takeaway"><ul style="margin:0;padding-left:20px;display:grid;gap:8px;">';
    tips.forEach(function (t) { html += "<li>" + t + "</li>"; });
    html += "</ul></div>";
    html += "<p>When you're ready, talking with a licensed HVAC professional is a good next step. There's no obligation to learn more.</p>";
    html += "<p>" + callButtonHtml() + "</p>";
    html += '<div class="diag-foot"><button type="button" class="diag-back" id="diagRestart">&larr; Start over</button></div>';
    html += '<p class="diag-note">This diagnostic provides general educational information only. It does not diagnose equipment, predict outcomes, or guarantee results.</p>';
    html += "</div>";
    mount.innerHTML = html;
    rewireCallButtons();
    var restart = document.getElementById("diagRestart");
    if (restart) restart.addEventListener("click", function () { answers = {}; step = 0; renderQuestion(); focusFirst(); });
  }

  renderQuestion();
})();
