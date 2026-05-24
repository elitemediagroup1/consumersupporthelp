// Favicon and theme color injection — applies to every page that loads script.js
(function injectFaviconAndTheme(){
  try{
    var head=document.head||document.getElementsByTagName('head')[0];
    if(!head) return;
    if(!document.querySelector('link[rel="icon"]')){
      var l=document.createElement('link');l.rel='icon';l.type='image/svg+xml';l.href='/assets/logo.png';head.appendChild(l);
    }
    if(!document.querySelector('link[rel="apple-touch-icon"]')){
      var a=document.createElement('link');a.rel='apple-touch-icon';a.href='/assets/logo.png';head.appendChild(a);
    }
    if(!document.querySelector('meta[name="theme-color"]')){
      var t=document.createElement('meta');t.name='theme-color';t.content='#1a6b3c';head.appendChild(t);
    }
  }catch(e){}
})();

/* =====================================================
   Consumer Support Help — global script
   ===================================================== */

window.LEAD_ENDPOINT = ""; // Paste your Apps Script Web App URL here when ready

function includeHTML(targetId, url){
  var el = document.getElementById(targetId);
  if(!el) return;
  fetch(url)
    .then(function(r){ return r.text(); })
    .then(function(html){
      el.innerHTML = html;
      if(targetId === "site-header") wireHeader();
    })
    .catch(function(err){ console.error("Include failed:", url, err); });
}

function wireHeader(){
  var toggle = document.querySelector(".nav-toggle");
  var nav    = document.querySelector(".nav");
  if(toggle && nav){
    toggle.addEventListener("click", function(){ nav.classList.toggle("open"); });
  }
  document.querySelectorAll(".nav > li > .nav-link").forEach(function(link){
    link.addEventListener("click", function(e){
      if(window.innerWidth <= 720){
        var li = link.parentElement;
        if(li.querySelector(".dropdown")){
          e.preventDefault();
          li.classList.toggle("open");
        }
      }
    });
  });
}

function wireLeadForms(){
  document.querySelectorAll("form.lead-form").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var status = form.querySelector(".status");
      var btn    = form.querySelector("button[type=submit]");
      var get = function(name){
        var el = form.querySelector("[name=" + name + "]");
        if(!el) return "";
        return el.type === "checkbox" ? el.checked : el.value.trim();
      };
      var data = {
        category: form.dataset.category || "Contact",
        source:   window.location.pathname,
        name:     get("name"),
        email:    get("email"),
        phone:    get("phone"),
        notes:    get("notes"),
        consent:  get("consent")
      };
      if(!data.name || !data.email || !data.phone){
        if(status){ status.textContent = "Please fill in name, email, and phone."; status.className = "status err"; }
        return;
      }
      if(!data.consent){
        if(status){ status.textContent = "Please check the consent box to continue."; status.className = "status err"; }
        return;
      }
      if(!window.LEAD_ENDPOINT){
        if(status){ status.textContent = "Thanks! We received your info and will be in touch shortly."; status.className = "status ok"; }
        form.reset();
        return;
      }
      if(btn){ btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = "Sending..."; }
      if(status){ status.textContent = ""; status.className = "status"; }
      fetch(window.LEAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data)
      })
      .then(function(){
        if(status){ status.textContent = "Thanks! A specialist will reach out shortly."; status.className = "status ok"; }
        form.reset();
      })
      .catch(function(){
        if(status){ status.textContent = "Something went wrong. Please call or email us."; status.className = "status err"; }
      })
      .finally(function(){
        if(btn){ btn.disabled = false; btn.textContent = btn.dataset.label || "Submit"; }
      });
    });
  });
}

function wireSignup(){
  document.querySelectorAll("form.signup-form").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var status = form.querySelector(".status");
      var emailEl = form.querySelector("input[type=email]");
      var email  = emailEl ? emailEl.value.trim() : "";
      if(!email){ if(status){ status.textContent = "Please enter an email."; } return; }
      if(!window.LEAD_ENDPOINT){
        if(status){ status.textContent = "Thanks! You're on the list."; }
        form.reset();
        return;
      }
      fetch(window.LEAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ category: "Newsletter", source: location.pathname, email: email, consent: true })
      })
      .then(function(){ if(status){ status.textContent = "Thanks for signing up!"; } form.reset(); })
      .catch(function(){ if(status){ status.textContent = "Sign-up failed. Try again later."; } });
    });
  });
}

document.addEventListener("DOMContentLoaded", function(){
  includeHTML("site-header", "/header.html");
  includeHTML("site-footer", "/footer.html");
  wireLeadForms();
  wireSignup();
  var yr = document.getElementById("yr");
  if(yr) yr.textContent = new Date().getFullYear();
});

/* =========================================================
   Pest Control phone CTA - dynamic injection
   Automatically adds the (888) 209-4812 click-to-call CTA
   to any URL under /pest-control. No HTML edits required.
   ========================================================= */
function injectPestControlPhone(){
  var isPestPage = window.location.pathname.indexOf('/pest-control') !== -1;
  if(!isPestPage) return;

  var phoneHTML = '<div class="pest-phone-cta" style="text-align:center;margin:24px 0;padding:0 16px">'
    + '<a href="tel:+18882094812" style="display:inline-flex;align-items:center;gap:10px;background:#1a6b3c;color:white;font-family:\'Inter\',sans-serif;font-weight:700;font-size:1.3rem;padding:16px 32px;border-radius:999px;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,0.15)">'
    + '&#128222; (888) 209-4812'
    + '</a>'
    + '<p style="font-size:0.8rem;color:#666;margin-top:8px;font-family:\'Inter\',sans-serif">'
    + 'Free quotes &#8212; licensed local exterminators'
    + '</p>'
    + '</div>';

  // Insert immediately after the first H1
  var h1 = document.querySelector('h1');
  if(h1 && !document.querySelector('.pest-phone-cta')){
    h1.insertAdjacentHTML('afterend', phoneHTML);
  }

  // Insert before the site footer (or any footer element)
  var footer = document.querySelector('#site-footer, footer, .site-footer, .footer');
  if(footer){
    footer.insertAdjacentHTML('beforebegin', phoneHTML);
  }
}

document.addEventListener('DOMContentLoaded', injectPestControlPhone);
document.addEventListener('DOMContentLoaded', injectPestControlPhone);

// ============================================================
// Lucy CSH widget loader — mirrors the petsinmycity pattern.
// The widget itself lives in /assets/lucy-csh.js as an IIFE.
// ============================================================
function loadLucyCSH() {
  if (document.getElementById('lucy-csh-script')) return;
  var s = document.createElement('script');
  s.id = 'lucy-csh-script';
  s.src = '/assets/lucy-csh.js';
  s.defer = true;
  document.head.appendChild(s);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadLucyCSH);
} else {
  loadLucyCSH();
}
