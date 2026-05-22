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
