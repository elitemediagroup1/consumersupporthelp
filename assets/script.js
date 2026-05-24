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


function initLucyCSHWidget() {
  // Skip on home-security pages which have their own Lucy widget
  if (window.location.pathname.includes('home-security')) return;
  // Skip if widget already exists
  if (document.getElementById('lucy-csh-widget')) return;

  function injectLucyCSHStyles() {
    if (document.getElementById('lucy-csh-styles')) return;
    const style = document.createElement('style');
    style.id = 'lucy-csh-styles';
    style.textContent = `
      #lucy-csh-widget { position: fixed; bottom: 24px; right: 24px; z-index: 999999 !important; font-family: 'Inter', sans-serif; }
      #lucy-csh-bubble { width: 72px; height: 72px; border-radius: 50%; cursor: pointer; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.2); border: 3px solid #1a6b3c; transition: transform 0.2s; background: #1a6b3c; }
      #lucy-csh-bubble:hover { transform: scale(1.08); }
      #lucy-csh-label { position: absolute; right: 88px; bottom: 18px; background: #1a6b3c; color: #fff; padding: 8px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer; font-family: 'Inter', sans-serif; }
      #lucy-csh-label:hover { background: #155030; }
      @media (max-width: 480px) { #lucy-csh-label { right: 84px; bottom: 22px; font-size: 12px; padding: 7px 12px; } }
      #lucy-csh-bubble img { width: 100%; height: 100%; object-fit: cover; }
      #lucy-csh-panel { display: none; position: fixed; bottom: 100px; right: 24px; width: 340px; max-height: 520px; background: white; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.15); overflow: hidden; flex-direction: column; z-index: 999999 !important; }
      #lucy-csh-panel.open { display: flex; }
      .lucy-csh-header { background: #1a6b3c; padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
      .lucy-csh-header img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.3); }
      .lucy-csh-header-info p { margin: 0; color: white; }
      .lucy-csh-header-name { font-weight: 700; font-size: 0.9rem; }
      .lucy-csh-header-status { font-size: 0.72rem; opacity: 0.75; }
      .lucy-csh-close { margin-left: auto; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.8; padding: 0; line-height: 1; }
      #lucy-csh-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #f9fafb; }
      .lucy-csh-msg { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 0.875rem; line-height: 1.5; }
      .lucy-csh-msg.lucy { background: white; border: 1px solid #e5e7eb; align-self: flex-start; border-bottom-left-radius: 4px; }
      .lucy-csh-msg.user { background: #1a6b3c; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
      #lucy-csh-quickreplies { padding: 8px 12px; display: flex; flex-wrap: wrap; gap: 6px; background: white; border-top: 1px solid #f0f0f0; }
      .lucy-csh-qr { background: #f0faf4; color: #1a6b3c; border: 1px solid #c6f6d5; border-radius: 999px; padding: 5px 12px; font-size: 0.78rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.15s; }
      .lucy-csh-qr:hover { background: #1a6b3c; color: white; }
      .lucy-csh-input-row { display: flex; gap: 8px; padding: 10px 12px; border-top: 1px solid #e5e7eb; background: white; }
      #lucy-csh-input { flex: 1; padding: 8px 14px; border: 1.5px solid #e5e7eb; border-radius: 999px; font-size: 0.875rem; font-family: 'Inter', sans-serif; outline: none; }
      #lucy-csh-input:focus { border-color: #1a6b3c; }
      #lucy-csh-send { width: 36px; height: 36px; border-radius: 50%; background: #1a6b3c; border: none; color: white; font-size: 1rem; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
      .lucy-csh-typing { display: flex; gap: 4px; padding: 10px 14px; background: white; border: 1px solid #e5e7eb; border-radius: 12px; border-bottom-left-radius: 4px; align-self: flex-start; width: fit-content; }
      .lucy-csh-typing span { width: 6px; height: 6px; background: #9ca3af; border-radius: 50%; animation: lucyDot 1.2s infinite; }
      .lucy-csh-typing span:nth-child(2) { animation-delay: 0.2s; }
      .lucy-csh-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes lucyDot { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
      @media (max-width: 768px) { #lucy-csh-panel { right: 0; bottom: 0; width: 100%; max-height: 70vh; border-radius: 16px 16px 0 0; } }
    `;
    document.head.appendChild(style);
  }
  injectLucyCSHStyles();

  
  const widget = document.createElement('div');
  widget.id = 'lucy-csh-widget';
  widget.innerHTML = `

    <div id="lucy-csh-bubble" onclick="toggleLucyCSH()">
      <img src="/assets/lucy-avatar.png" alt="Lucy - CSH Advisor"/>
    </div>
    <div id="lucy-csh-label" onclick="toggleLucyCSH()">Ask Lucy</div>
    <div id="lucy-csh-panel">
      <div class="lucy-csh-header">
        <img src="/assets/lucy-avatar.png" alt="Lucy"/>
        <div class="lucy-csh-header-info">
          <p class="lucy-csh-header-name">Lucy</p>
          <p class="lucy-csh-header-status">CSH Advisor &#8226; Online</p>
        </div>
        <button class="lucy-csh-close" onclick="toggleLucyCSH()">&#10005;</button>
      </div>
      <div id="lucy-csh-messages"></div>
      <div id="lucy-csh-quickreplies">
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#128028; Pest Control')">&#128028; Pest Control</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#128274; Home Security')">&#128274; Home Security</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#128663; Auto Insurance')">&#128663; Auto Insurance</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#127973; Home Insurance')">&#127973; Home Insurance</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#9877; Health Insurance')">&#9877; Health Insurance</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('&#128176; Final Expense')">&#128176; Final Expense</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('SSDI Benefits')">SSDI Benefits</button>
        <button class="lucy-csh-qr" onclick="sendLucyCSH('Debt Help')">&#128179; Debt Help</button>
      </div>
      <div class="lucy-csh-input-row">
        <input type="text" id="lucy-csh-input" placeholder="Ask Lucy anything..." onkeypress="if(event.key==='Enter')sendLucyCSH()"/>
        <button id="lucy-csh-send" onclick="sendLucyCSH()">&#10148;</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  // Message history for context
  let lucyCSHMessages = [];
  let lucyCSHOpen = false;

  window.toggleLucyCSH = function() {
    lucyCSHOpen = !lucyCSHOpen;
    const panel = document.getElementById('lucy-csh-panel');
    panel.classList.toggle('open', lucyCSHOpen);
    if (lucyCSHOpen && lucyCSHMessages.length === 0) {
      loadLucyCSHGreeting();
    }
  };

  function loadLucyCSHGreeting() {
    const greeting = "Hi! I am Lucy, your Consumer Support Help advisor. I can help you find the right specialist for insurance, home services, benefits, and more. What can I help you with today?";
    appendLucyCSHMsg(greeting, 'lucy');
    lucyCSHMessages.push({ role: 'assistant', content: greeting });
  }

  function appendLucyCSHMsg(text, sender) {
    const msgs = document.getElementById('lucy-csh-messages');
    const div = document.createElement('div');
    div.className = 'lucy-csh-msg ' + sender;
    div.innerHTML = text.replace(/\[([^\]]+)\]\((tel:[^)]+)\)/g, '<a href="$2" style="color:' + (sender === 'user' ? 'white' : '#1a6b3c') + ';font-weight:700">$1</a>');
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showLucyCSHTyping() {
    const msgs = document.getElementById('lucy-csh-messages');
    const div = document.createElement('div');
    div.id = 'lucy-csh-typing';
    div.className = 'lucy-csh-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  window.sendLucyCSH = async function(text) {
    const input = document.getElementById('lucy-csh-input');
    const message = text || input.value.trim();
    if (!message) return;
    if (!text) input.value = '';

    // Hide quick replies after first message
    document.getElementById('lucy-csh-quickreplies').style.display = 'none';

    appendLucyCSHMsg(message, 'user');
    lucyCSHMessages.push({ role: 'user', content: message });

    const typing = showLucyCSHTyping();

    try {
      const res = await fetch('/.netlify/functions/lucy-csh-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: lucyCSHMessages })
      });
      const data = await res.json();
      typing.remove();
      const reply = data.content.map(function(b) { return b.text || ''; }).join('');
      appendLucyCSHMsg(reply, 'lucy');
      lucyCSHMessages.push({ role: 'assistant', content: reply });
    } catch(err) {
      typing.remove();
      appendLucyCSHMsg('Sorry, something went wrong. Call us directly at <a href="tel:+18882094812" style="color:#1a6b3c;font-weight:700">(888) 209-4812</a>.', 'lucy');
    }
  };
}

function bootLucyCSH() {
  initLucyCSHWidget();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootLucyCSH);
} else {
  bootLucyCSH();
}
