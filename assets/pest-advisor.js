(function() {
  var FUNCTION_URL = '/.netlify/functions/claude';
  var pestData = {
    'bed bugs': {
      urgency: 'high',
      message: 'Bed bugs spread quickly between rooms and units. Professional treatment is strongly recommended.',
      action: 'Get same-week treatment quotes'
    },
    'termites': {
      urgency: 'high', 
      message: 'Termites cause structural damage silently. A professional inspection should happen within days.',
      action: 'Get termite inspection quotes'
    },
    'mice': {
      urgency: 'medium',
      message: 'Mice reproduce rapidly. Exclusion work and trapping should begin within the week.',
      action: 'Get rodent control quotes'
    },
    'rats': {
      urgency: 'high',
      message: 'Rats pose health risks and cause structural damage. Professional treatment is recommended promptly.',
      action: 'Get rodent control quotes'
    },
    'cockroaches': {
      urgency: 'medium',
      message: 'Cockroaches are difficult to eliminate without professional treatment targeting harborage areas.',
      action: 'Get exterminator quotes'
    },
    'ants': {
      urgency: 'low',
      message: 'Most ant infestations can wait a week or two but recurring problems need professional colony treatment.',
      action: 'Get ant control quotes'
    },
    'stink bugs': {
      urgency: 'low',
      message: 'Stink bugs are seasonal and annoying but not dangerous. Barrier treatment in early fall is most effective.',
      action: 'Get barrier treatment quotes'
    },
    'wasps': {
      urgency: 'high',
      message: 'Active wasp nests near living areas should be treated promptly by a professional.',
      action: 'Get wasp removal quotes'
    },
    'mosquitoes': {
      urgency: 'low',
      message: 'Mosquito control programs work best as a seasonal preventative treatment.',
      action: 'Get mosquito control quotes'
    }
  };
  function detectPest(text) {
    var lower = text.toLowerCase();
    var found = null;
    Object.keys(pestData).forEach(function(pest) {
      if (lower.indexOf(pest) !== -1) found = pest;
    });
    if (!found) {
      if (lower.indexOf('bug') !== -1 || lower.indexOf('insect') !== -1) found = 'general insect';
      if (lower.indexOf('rodent') !== -1) found = 'mice';
      if (lower.indexOf('roach') !== -1) found = 'cockroaches';
      if (lower.indexOf('mouse') !== -1) found = 'mice';
      if (lower.indexOf('rat') !== -1) found = 'rats';
    }
    return found;
  }
  function getUrgencyColor(urgency) {
    if (urgency === 'high') return '#E24B4A';
    if (urgency === 'medium') return '#BA7517';
    return '#1D9E75';
  }
  function getUrgencyLabel(urgency) {
    if (urgency === 'high') return 'Act promptly';
    if (urgency === 'medium') return 'Address this week';
    return 'Can plan ahead';
  }
  function scrollToForm() {
    var form = document.querySelector('form, .lead-form, #contact-form, [class*="form"]');
    if (form) {
      form.scrollIntoView({behavior:'smooth', block:'center'});
      var firstInput = form.querySelector('input[type="text"], input[type="tel"], input');
      if (firstInput) setTimeout(function() { firstInput.focus(); }, 600);
    }
  }
  function sendToAdvisor(message, cityContext, callback) {
    fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: message,
        city: cityContext,
        service: 'pest control'
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) { callback(null, data.response); })
    .catch(function(err) { callback(err, null); });
  }
  function buildWidget(container, cityContext) {
    container.innerHTML = '';
    container.style.cssText = 'background:#f8f8f6;border-radius:12px;border:1px solid #e0e0e0;padding:20px 24px;margin:2rem 0;font-family:inherit';
    var header = document.createElement('div');
    header.style.cssText = 'margin-bottom:16px';
    header.innerHTML = '<p style="font-size:15px;font-weight:500;color:#1a1a1a;margin:0 0 4px">Not sure what pest you have?</p><p style="font-size:13px;color:#666;margin:0">Describe what you\'re seeing and get instant guidance.</p>';
    container.appendChild(header);
    var inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap';
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g. small brown bugs in my mattress seam...';
    input.style.cssText = 'flex:1;min-width:200px;padding:10px 14px;border:1px solid #ddd;border-radius:8px;font-size:14px;font-family:inherit;outline:none';
    input.addEventListener('focus', function() { this.style.borderColor = '#1D9E75'; });
    input.addEventListener('blur', function() { this.style.borderColor = '#ddd'; });
    var btn = document.createElement('button');
    btn.textContent = 'Identify pest';
    btn.style.cssText = 'padding:10px 20px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;font-family:inherit';
    btn.addEventListener('mouseover', function() { this.style.background = '#0F6E56'; });
    btn.addEventListener('mouseout', function() { this.style.background = '#1D9E75'; });
    inputRow.appendChild(input);
    inputRow.appendChild(btn);
    container.appendChild(inputRow);
    var resultArea = document.createElement('div');
    resultArea.style.display = 'none';
    container.appendChild(resultArea);
    var disclaimer = document.createElement('p');
    disclaimer.style.cssText = 'font-size:11px;color:#999;margin:8px 0 0';
    disclaimer.textContent = 'Guidance only — not a guarantee. Always consult a licensed pest control professional.';
    container.appendChild(disclaimer);
    function handleSubmit() {
      var userText = input.value.trim();
      if (!userText || userText.length < 5) {
        input.style.borderColor = '#E24B4A';
        input.placeholder = 'Please describe what you are seeing...';
        return;
      }
      btn.textContent = 'Checking...';
      btn.disabled = true;
      btn.style.background = '#888';
      resultArea.style.display = 'none';
      var detectedPest = detectPest(userText);
      var pestInfo = detectedPest ? pestData[detectedPest] : null;
      var fullMessage = cityContext 
        ? 'I am a homeowner in ' + cityContext + '. ' + userText
        : userText;
      sendToAdvisor(fullMessage, cityContext, function(err, aiResponse) {
        btn.textContent = 'Identify pest';
        btn.disabled = false;
        btn.style.background = '#1D9E75';
        resultArea.style.display = 'block';
        resultArea.innerHTML = '';
        if (err || !aiResponse) {
          if (pestInfo) {
            showLocalResult(resultArea, detectedPest, pestInfo);
          } else {
            resultArea.innerHTML = '<p style="font-size:13px;color:#666;padding:12px;background:#fff;border-radius:8px;border:1px solid #e0e0e0">We weren\'t able to identify the pest from your description. Try describing the size, color, and where you found it. Or get a free professional inspection — an exterminator can identify it on-site.</p>';
          }
        } else {
          var responseDiv = document.createElement('div');
          responseDiv.style.cssText = 'padding:14px 16px;background:#fff;border-radius:8px;border:1px solid #e0e0e0;margin-bottom:12px';
          if (pestInfo) {
            var urgencyBadge = document.createElement('div');
            urgencyBadge.style.cssText = 'display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:500;margin-bottom:10px;color:#fff;background:' + getUrgencyColor(pestInfo.urgency);
            urgencyBadge.textContent = getUrgencyLabel(pestInfo.urgency);
            responseDiv.appendChild(urgencyBadge);
          }
          var aiText = document.createElement('p');
          aiText.style.cssText = 'font-size:14px;color:#333;line-height:1.6;margin:0 0 8px';
          aiText.textContent = aiResponse;
          responseDiv.appendChild(aiText);
          resultArea.appendChild(responseDiv);
          var ctaBtn = document.createElement('button');
          var ctaLabel = pestInfo ? pestInfo.action : 'Get free exterminator quotes';
          ctaBtn.textContent = ctaLabel + ' →';
          ctaBtn.style.cssText = 'width:100%;padding:12px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit';
          ctaBtn.addEventListener('mouseover', function() { this.style.background = '#0F6E56'; });
          ctaBtn.addEventListener('mouseout', function() { this.style.background = '#1D9E75'; });
          ctaBtn.addEventListener('click', scrollToForm);
          resultArea.appendChild(ctaBtn);
        }
      });
    }
    function showLocalResult(area, pest, info) {
      area.innerHTML = '';
      var div = document.createElement('div');
      div.style.cssText = 'padding:14px 16px;background:#fff;border-radius:8px;border:1px solid #e0e0e0;margin-bottom:12px';
      var badge = document.createElement('div');
      badge.style.cssText = 'display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:500;margin-bottom:10px;color:#fff;background:' + getUrgencyColor(info.urgency);
      badge.textContent = getUrgencyLabel(info.urgency);
      div.appendChild(badge);
      var pestName = document.createElement('p');
      pestName.style.cssText = 'font-size:14px;font-weight:500;color:#1a1a1a;margin:0 0 6px';
      pestName.textContent = 'This sounds like: ' + pest;
      div.appendChild(pestName);
      var msg = document.createElement('p');
      msg.style.cssText = 'font-size:13px;color:#555;line-height:1.6;margin:0';
      msg.textContent = info.message;
      div.appendChild(msg);
      area.appendChild(div);
      var ctaBtn = document.createElement('button');
      ctaBtn.textContent = info.action + ' →';
      ctaBtn.style.cssText = 'width:100%;padding:12px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit';
      ctaBtn.addEventListener('click', scrollToForm);
      area.appendChild(ctaBtn);
    }
    btn.addEventListener('click', handleSubmit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSubmit();
    });
  }
  function init() {
    var widgets = document.querySelectorAll('[data-pest-advisor]');
    widgets.forEach(function(el) {
      var city = el.getAttribute('data-city') || '';
      buildWidget(el, city);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
