// Lucy CSH floating widget for consumersupporthelp.com
// Mirrors the petsinmycity lucy.js architecture.
// Calls /.netlify/functions/lucy-csh-chat for the chat backend.
(function () {
  if (window.__lucyCSHLoaded) return;
  window.__lucyCSHLoaded = true;

  function injectStyles() {
    if (document.getElementById('lucy-csh-styles')) return;
    var s = document.createElement('style');
    s.id = 'lucy-csh-styles';
    s.textContent = [
      "#lucy-csh-btn {",
      "  position:fixed;",
      "  bottom:24px;",
      "  right:24px;",
      "  z-index:9999;",
      "  display:flex;",
      "  flex-direction:column;",
      "  align-items:center;",
      "  gap:6px;",
      "  cursor:pointer;",
      "  background:none;",
      "  border:none;",
      "  padding:0;",
      "}",
      "#lucy-csh-avatar-ring {",
      "  width:72px;",
      "  height:72px;",
      "  border-radius:50%;",
      "  border:3px solid #1a6b3c;",
      "  overflow:hidden;",
      "  box-shadow:0 4px 20px rgba(0,0,0,0.25);",
      "  background:#1a6b3c url(/assets/lucy-avatar.png) center/cover no-repeat;",
      "  transition:transform 0.2s;",
      "  flex-shrink:0;",
      "}",
      "#lucy-csh-btn:hover #lucy-csh-avatar-ring {",
      "  transform:scale(1.08);",
      "}",
      "#lucy-csh-label {",
      "  background:#1a6b3c;",
      "  color:white;",
      "  font-family:Inter,sans-serif;",
      "  font-size:0.72rem;",
      "  font-weight:700;",
      "  padding:4px 10px;",
      "  border-radius:999px;",
      "  white-space:nowrap;",
      "  box-shadow:0 2px 8px rgba(0,0,0,0.2);",
      "}",
      "#lucy-csh-panel {",
      "  display:none;",
      "  position:fixed;",
      "  bottom:24px;",
      "  right:24px;",
      "  width:340px;",
      "  max-height:520px;",
      "  background:white;",
      "  border-radius:16px;",
      "  box-shadow:0 8px 40px rgba(0,0,0,0.15);",
      "  overflow:hidden;",
      "  flex-direction:column;",
      "  z-index:9999;",
      "}",
      "#lucy-csh-panel.open {",
      "  display:flex;",
      "}",
      ".lucy-csh-header {",
      "  background:#1a6b3c;",
      "  padding:14px 16px;",
      "  display:flex;",
      "  align-items:center;",
      "  gap:10px;",
      "}",
      ".lucy-csh-hdr-avatar {",
      "  width:36px;",
      "  height:36px;",
      "  border-radius:50%;",
      "  background:#1a6b3c url(/assets/lucy-avatar.png) center/cover no-repeat;",
      "  border:2px solid rgba(255,255,255,0.3);",
      "  flex-shrink:0;",
      "}",
      ".lucy-csh-hdr-name {",
      "  font-family:Inter,sans-serif;",
      "  font-weight:700;",
      "  font-size:0.9rem;",
      "  color:white;",
      "  margin:0;",
      "}",
      ".lucy-csh-hdr-status {",
      "  font-family:Inter,sans-serif;",
      "  font-size:0.72rem;",
      "  color:rgba(255,255,255,0.75);",
      "  margin:0;",
      "}",
      ".lucy-csh-close {",
      "  margin-left:auto;",
      "  background:none;",
      "  border:none;",
      "  color:white;",
      "  font-size:1.2rem;",
      "  cursor:pointer;",
      "  opacity:0.8;",
      "  padding:0;",
      "  line-height:1;",
      "}",
      "#lucy-csh-messages {",
      "  flex:1;",
      "  overflow-y:auto;",
      "  padding:16px;",
      "  display:flex;",
      "  flex-direction:column;",
      "  gap:10px;",
      "  background:#f9fafb;",
      "}",
      ".lucy-csh-msg {",
      "  max-width:85%;",
      "  padding:10px 14px;",
      "  border-radius:12px;",
      "  font-size:0.875rem;",
      "  line-height:1.5;",
      "  font-family:Inter,sans-serif;",
      "}",
      ".lucy-csh-msg.lucy {",
      "  background:white;",
      "  border:1px solid #e5e7eb;",
      "  align-self:flex-start;",
      "  border-bottom-left-radius:4px;",
      "}",
      ".lucy-csh-msg.user {",
      "  background:#1a6b3c;",
      "  color:white;",
      "  align-self:flex-end;",
      "  border-bottom-right-radius:4px;",
      "}",
      "#lucy-csh-quickreplies {",
      "  padding:8px 12px;",
      "  display:flex;",
      "  flex-wrap:wrap;",
      "  gap:6px;",
      "  background:white;",
      "  border-top:1px solid #f0f0f0;",
      "}",
      ".lucy-csh-qr {",
      "  background:#f0faf4;",
      "  color:#1a6b3c;",
      "  border:1px solid #c6f6d5;",
      "  border-radius:999px;",
      "  padding:5px 12px;",
      "  font-size:0.78rem;",
      "  font-weight:600;",
      "  cursor:pointer;",
      "  font-family:Inter,sans-serif;",
      "  transition:background 0.15s;",
      "}",
      ".lucy-csh-qr:hover {",
      "  background:#1a6b3c;",
      "  color:white;",
      "}",
      ".lucy-csh-input-row {",
      "  display:flex;",
      "  gap:8px;",
      "  padding:10px 12px;",
      "  border-top:1px solid #e5e7eb;",
      "  background:white;",
      "}",
      "#lucy-csh-input {",
      "  flex:1;",
      "  padding:8px 14px;",
      "  border:1.5px solid #e5e7eb;",
      "  border-radius:999px;",
      "  font-size:0.875rem;",
      "  font-family:Inter,sans-serif;",
      "  outline:none;",
      "}",
      "#lucy-csh-input:focus {",
      "  border-color:#1a6b3c;",
      "}",
      "#lucy-csh-send {",
      "  width:36px;",
      "  height:36px;",
      "  border-radius:50%;",
      "  background:#1a6b3c;",
      "  border:none;",
      "  color:white;",
      "  font-size:1rem;",
      "  cursor:pointer;",
      "  flex-shrink:0;",
      "  display:flex;",
      "  align-items:center;",
      "  justify-content:center;",
      "}",
      ".lucy-csh-typing {",
      "  display:flex;",
      "  gap:4px;",
      "  padding:10px 14px;",
      "  background:white;",
      "  border:1px solid #e5e7eb;",
      "  border-radius:12px;",
      "  border-bottom-left-radius:4px;",
      "  align-self:flex-start;",
      "  width:fit-content;",
      "}",
      ".lucy-csh-typing span {",
      "  width:6px;",
      "  height:6px;",
      "  background:#9ca3af;",
      "  border-radius:50%;",
      "  animation:lucyDot 1.2s infinite;",
      "}",
      ".lucy-csh-typing span:nth-child(2) { animation-delay:0.2s; }",
      ".lucy-csh-typing span:nth-child(3) { animation-delay:0.4s; }",
      "@keyframes lucyDot {",
      "  0%,60%,100% {transform:translateY(0)}",
      "  30% {transform:translateY(-6px)}",
      "}",
      "@media(max-width:768px){",
      "  #lucy-csh-panel{",
      "    right:0;bottom:0;",
      "    width:100%;",
      "    max-height:75vh;",
      "    border-radius:20px 20px 0 0;",
      "  }",
      "}"
    ].join('\n');
    document.head.appendChild(s);
  }

  function ensureMount() {
    if (document.getElementById('lucy-csh-btn')) return;
    // Skip on home-security pages which have a dedicated Lucy widget.
    if (window.location.pathname.indexOf('home-security') !== -1) return;

    var btn = document.createElement('button');
    btn.id = 'lucy-csh-btn';
    btn.setAttribute('aria-label', 'Chat with Lucy');
    btn.onclick = toggleLucyCSH;

    var ring = document.createElement('div');
    ring.id = 'lucy-csh-avatar-ring';

    var label = document.createElement('span');
    label.id = 'lucy-csh-label';
    label.textContent = 'Ask Lucy \uD83C\uDFA7';

    btn.appendChild(ring);
    btn.appendChild(label);
    document.body.appendChild(btn);

    var panel = document.createElement('div');
    panel.id = 'lucy-csh-panel';
    panel.innerHTML =
      '<div class="lucy-csh-header">' +
        '<div class="lucy-csh-hdr-avatar"></div>' +
        '<div>' +
          '<p class="lucy-csh-hdr-name">Lucy</p>' +
          '<p class="lucy-csh-hdr-status">CSH Advisor \u2022 Online</p>' +
        '</div>' +
        '<button class="lucy-csh-close" onclick="toggleLucyCSH()">\u2715</button>' +
      '</div>' +
      '<div id="lucy-csh-messages"></div>' +
      '<div id="lucy-csh-quickreplies">' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'\uD83D\uDC1B Pest Control\')">\uD83D\uDC1B Pest Control</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'\uD83C\uDFA7 Home Security\')">\uD83C\uDFA7 Home Security</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'\uD83D\uDE97 Auto Insurance\')">\uD83D\uDE97 Auto Insurance</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'\uD83C\uDFE0 Home Insurance\')">\uD83C\uDFE0 Home Insurance</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'Health Insurance\')">\u2695 Health Insurance</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'\uD83D\uDCB0 Final Expense\')">\uD83D\uDCB0 Final Expense</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'SSDI Benefits\')">SSDI Benefits</button>' +
        '<button class="lucy-csh-qr" onclick="sendLucyCSH(\'Debt Help\')">\uD83D\uDCB3 Debt Help</button>' +
      '</div>' +
      '<div class="lucy-csh-input-row">' +
        '<input type="text" id="lucy-csh-input" placeholder="Ask Lucy..." onkeypress="if(event.key===\'Enter\')sendLucyCSH()"/>' +
        '<button id="lucy-csh-send" onclick="sendLucyCSH()">\u27A4</button>' +
      '</div>';
    document.body.appendChild(panel);
  }

  var lucyCSHMessages = [];
  var lucyCSHOpen = false;

  function toggleLucyCSH() {
    lucyCSHOpen = !lucyCSHOpen;
    var panel = document.getElementById('lucy-csh-panel');
    if (!panel) return;
    if (lucyCSHOpen) {
      panel.classList.add('open');
      if (lucyCSHMessages.length === 0) {
        loadLucyCSHGreeting();
      }
    } else {
      panel.classList.remove('open');
    }
  }

  function loadLucyCSHGreeting() {
    var greeting = 'Hi! I am Lucy, your Consumer Support Help advisor. I can help you find the right specialist for insurance, home services, benefits, and more. What can I help you with today?';
    appendLucyCSHMsg(greeting, 'lucy');
    lucyCSHMessages.push({ role: 'assistant', content: greeting });
  }

  function appendLucyCSHMsg(text, sender) {
    var msgs = document.getElementById('lucy-csh-messages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'lucy-csh-msg ' + sender;
    div.innerHTML = text.replace(
      /\[([^\]]+)\]\((tel:[^)]+)\)/g,
      '<a href="$2" style="color:' + (sender === 'user' ? 'white' : '#1a6b3c') + ';font-weight:700">$1</a>'
    );
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showLucyCSHTyping() {
    var msgs = document.getElementById('lucy-csh-messages');
    if (!msgs) return null;
    var div = document.createElement('div');
    div.id = 'lucy-csh-typing';
    div.className = 'lucy-csh-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  window.sendLucyCSH = async function (text) {
    var input = document.getElementById('lucy-csh-input');
    var message = text || (input ? input.value.trim() : '');
    if (!message) return;
    if (!text && input) input.value = '';

    var qr = document.getElementById('lucy-csh-quickreplies');
    if (qr) qr.style.display = 'none';

    appendLucyCSHMsg(message, 'user');
    lucyCSHMessages.push({ role: 'user', content: message });

    var typing = showLucyCSHTyping();
    try {
      var res = await fetch('/.netlify/functions/lucy-csh-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: lucyCSHMessages })
      });
      var data = await res.json();
      if (typing) typing.remove();
      var reply = (data.content || []).map(function (b) { return b.text || ''; }).join('');
      appendLucyCSHMsg(reply, 'lucy');
      lucyCSHMessages.push({ role: 'assistant', content: reply });
    } catch (err) {
      if (typing) typing.remove();
      appendLucyCSHMsg(
        'Sorry, something went wrong. Call us at <a href="tel:+18882094812" style="color:#1a6b3c;font-weight:700">(888) 209-4812</a>.',
        'lucy'
      );
    }
  };

  window.toggleLucyCSH = toggleLucyCSH;

  function boot() {
    injectStyles();
    ensureMount();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
