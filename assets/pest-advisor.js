(function() {
  var FUNCTION_URL = '/.netlify/functions/claude';

  var pestData = {
    'bed bugs': { urgency: 'high', message: 'Bed bugs spread quickly between rooms and units. Professional treatment is strongly recommended.', action: 'Get same-week treatment quotes' },
    'termites': { urgency: 'high', message: 'Termites cause structural damage silently. A professional inspection should happen within days.', action: 'Get termite inspection quotes' },
    'mice': { urgency: 'medium', message: 'Mice reproduce rapidly. Exclusion work and trapping should begin within the week.', action: 'Get rodent control quotes' },
    'rats': { urgency: 'high', message: 'Rats pose health risks and cause structural damage. Professional treatment is recommended promptly.', action: 'Get rodent control quotes' },
    'cockroaches': { urgency: 'medium', message: 'Cockroaches are difficult to eliminate without professional treatment targeting harborage areas.', action: 'Get exterminator quotes' },
    'ants': { urgency: 'low', message: 'Most ant infestations can wait a week or two but recurring problems need professional colony treatment.', action: 'Get ant control quotes' },
    'stink bugs': { urgency: 'low', message: 'Stink bugs are seasonal and annoying but not dangerous. Barrier treatment in early fall is most effective.', action: 'Get barrier treatment quotes' },
    'wasps': { urgency: 'high', message: 'Active wasp nests near living areas should be treated promptly by a professional.', action: 'Get wasp removal quotes' },
    'mosquitoes': { urgency: 'low', message: 'Mosquito control programs work best as a seasonal preventative treatment.', action: 'Get mosquito control quotes' }
  };

  function detectPest(text) {
    var lower = text.toLowerCase();
    var found = null;
    Object.keys(pestData).forEach(function(pest) {
      if (lower.indexOf(pest) !== -1) found = pest;
    });
    if (!found) {
      if (lower.indexOf('roach') !== -1) found = 'cockroaches';
      if (lower.indexOf('mouse') !== -1 || lower.indexOf('rodent') !== -1) found = 'mice';
      if (lower.indexOf('rat') !== -1) found = 'rats';
      if (lower.indexOf('bug') !== -1) found = 'bed bugs';
    }
    return found;
  }

  function getUrgencyColor(u) {
    return u === 'high' ? '#E24B4A' : u === 'medium' ? '#BA7517' : '#1D9E75';
  }

  function getUrgencyLabel(u) {
    return u === 'high' ? 'Act promptly' : u === 'medium' ? 'Address this week' : 'Can plan ahead';
  }

  function scrollToForm() {
    var form = document.querySelector('form, .lead-form, #contact-form, [class*="form"]');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var firstInput = form.querySelector('input[type="text"], input[type="tel"], input');
      if (firstInput) setTimeout(function() { firstInput.focus(); }, 600);
    }
  }

  function fileToBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) { resolve(e.target.result.split(',')[1]); };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  function isAndroid() {
    return /Android/.test(navigator.userAgent);
  }
  function isMobile() {
    return isIOS() || isAndroid();
  }

  function checkCameraPermission(callback) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      callback('not_supported');
      return;
    }
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'camera' })
        .then(function(result) {
          callback(result.state);
        })
        .catch(function() {
          callback('unknown');
        });
    } else {
      callback('unknown');
    }
  }

  function requestCameraPermission(onGranted, onDenied) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      onDenied('not_supported');
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        stream.getTracks().forEach(function(track) { track.stop(); });
        onGranted();
      })
      .catch(function(err) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          onDenied('denied');
        } else if (err.name === 'NotFoundError') {
          onDenied('not_found');
        } else {
          onDenied('error');
        }
      });
  }

  function showPermissionMessage(container, type) {
    var msg = document.createElement('div');
    msg.style.cssText = 'background:#fff8e1;border:1px solid #ffcc02;border-radius:8px;padding:12px 14px;font-size:13px;color:#5a4000;margin-top:8px;line-height:1.5';
    if (type === 'denied') {
      var instructions = isIOS()
        ? 'To enable camera access on iPhone: go to Settings → Safari (or your browser) → Camera → Allow.'
        : isAndroid()
        ? 'To enable camera access on Android: go to Settings → Apps → your browser → Permissions → Camera → Allow.'
        : 'Camera access was blocked. Please allow camera access in your browser settings and try again.';
      msg.innerHTML = '<strong>Camera access blocked.</strong><br>' + instructions;
    } else if (type === 'not_supported') {
      msg.innerHTML = '<strong>Camera not available.</strong> Your device or browser does not support camera access. You can still upload a photo from your library below.';
    } else if (type === 'not_found') {
      msg.innerHTML = '<strong>No camera found.</strong> Upload a photo from your library instead.';
    }
    var existing = container.querySelector('.permission-msg');
    if (existing) existing.remove();
    msg.classList.add('permission-msg');
    container.appendChild(msg);
    setTimeout(function() {
      if (msg.parentNode) msg.remove();
    }, 8000);
  }

  function sendToAdvisor(message, cityContext, imageBase64, imageType, callback) {
    var payload = {
      message: message,
      city: cityContext,
      service: 'pest control'
    };
    if (imageBase64) {
      payload.imageBase64 = imageBase64;
      payload.imageType = imageType || 'image/jpeg';
    }
    fetch(FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(function(r) { return r.json(); })
    .then(function(data) { callback(null, data.response); })
    .catch(function(err) { callback(err, null); });
  }

  function buildWidget(container, cityContext) {
    container.innerHTML = '';
    container.style.cssText = 'background:#f8f8f6;border-radius:12px;border:1px solid #e0e0e0;padding:20px 24px;margin:2rem 0;font-family:inherit';
    container.innerHTML = '<p style="font-size:15px;font-weight:500;color:#1a1a1a;margin:0 0 4px">Not sure what pest you have?</p>' +
      '<p style="font-size:13px;color:#666;margin:0 0 16px">Upload a photo or describe what you\'re seeing for instant AI identification.</p>';

    var dropZone = document.createElement('div');
    var dzId = 'dz-' + Math.random().toString(36).substr(2, 6);
    dropZone.id = dzId;
    dropZone.style.cssText = 'border:2px dashed #ccc;border-radius:10px;padding:20px 16px;text-align:center;background:#fff;margin-bottom:12px;transition:all 0.2s;position:relative';

    var buttonRow = isMobile()
      ? '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:4px">' +
        '<label style="display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:#1D9E75;color:#fff;border-radius:8px;font-size:14px;cursor:pointer;font-weight:500">📷 Take Photo<input class="cam-input" type="file" accept="image/*" capture="environment" style="display:none"></label>' +
        '<label style="display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:#378ADD;color:#fff;border-radius:8px;font-size:14px;cursor:pointer;font-weight:500">🖼 Choose from Library<input class="lib-input" type="file" accept="image/*" style="display:none"></label>' +
        '</div>'
      : '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:8px">' +
        '<label style="display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:#1D9E75;color:#fff;border-radius:8px;font-size:14px;cursor:pointer;font-weight:500">📂 Upload Photo<input class="lib-input" type="file" accept="image/*" style="display:none"></label>' +
        '</div>' +
        '<p style="font-size:12px;color:#aaa;margin:10px 0 0">or drag and drop an image here</p>';

    dropZone.innerHTML = '<p style="font-size:13px;color:#888;margin:0 0 4px">Upload a photo of the pest or damage</p>' + buttonRow;

    var previewWrap = document.createElement('div');
    previewWrap.style.cssText = 'display:none;margin-top:10px;text-align:center';
    var previewImg = document.createElement('img');
    previewImg.style.cssText = 'max-width:100%;max-height:180px;border-radius:8px;border:1px solid #e0e0e0';
    var removeBtn = document.createElement('button');
    removeBtn.textContent = '✕ Remove photo';
    removeBtn.style.cssText = 'display:block;margin:6px auto 0;background:none;border:1px solid #ddd;border-radius:6px;padding:4px 12px;font-size:12px;color:#999;cursor:pointer;font-family:inherit';
    previewWrap.appendChild(previewImg);
    previewWrap.appendChild(removeBtn);
    dropZone.appendChild(previewWrap);
    container.appendChild(dropZone);

    var selectedBase64 = null;
    var selectedType = null;

    function handleFile(file) {
      if (!file || !file.type.startsWith('image/')) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo must be under 5MB. Please choose a smaller image.');
        return;
      }
      selectedType = file.type;
      fileToBase64(file).then(function(b64) {
        selectedBase64 = b64;
        previewImg.src = URL.createObjectURL(file);
        previewWrap.style.display = 'block';
        dropZone.style.borderColor = '#1D9E75';
        dropZone.style.background = '#f0faf6';
      });
    }

    function clearPhoto() {
      selectedBase64 = null;
      selectedType = null;
      previewWrap.style.display = 'none';
      previewImg.src = '';
      dropZone.style.borderColor = '#ccc';
      dropZone.style.background = '#fff';
    }

    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      clearPhoto();
    });

    var camInput = dropZone.querySelector('.cam-input');
    var libInput = dropZone.querySelector('.lib-input');

    if (camInput) {
      camInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });
      var camLabel = camInput.closest('label');
      if (camLabel) {
        camLabel.addEventListener('click', function(e) {
          if (isIOS() || isAndroid()) return;
          e.preventDefault();
          checkCameraPermission(function(state) {
            if (state === 'denied') {
              showPermissionMessage(container, 'denied');
            } else if (state === 'granted') {
              camInput.click();
            } else {
              requestCameraPermission(
                function() { camInput.click(); },
                function(reason) { showPermissionMessage(container, reason); }
              );
            }
          });
        });
      }
    }

    if (libInput) {
      libInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files[0]);
        }
      });
    }

    dropZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      dropZone.style.borderColor = '#1D9E75';
      dropZone.style.background = '#f0faf6';
    });
    dropZone.addEventListener('dragleave', function() {
      if (!selectedBase64) {
        dropZone.style.borderColor = '#ccc';
        dropZone.style.background = '#fff';
      }
    });
    dropZone.addEventListener('drop', function(e) {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    var orDiv = document.createElement('p');
    orDiv.style.cssText = 'text-align:center;font-size:12px;color:#aaa;margin:4px 0 8px';
    orDiv.textContent = 'and / or describe what you are seeing';
    container.appendChild(orDiv);

    var inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px';

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'e.g. small brown bugs in my mattress seam...';
    input.style.cssText = 'flex:1;min-width:200px;padding:10px 14px;border:1px solid #ddd;border-radius:8px;font-size:14px;font-family:inherit;outline:none;-webkit-appearance:none';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'sentences');
    input.addEventListener('focus', function() { this.style.borderColor = '#1D9E75'; });
    input.addEventListener('blur', function() { this.style.borderColor = '#ddd'; });

    var btn = document.createElement('button');
    btn.textContent = 'Identify pest';
    btn.style.cssText = 'padding:10px 20px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;font-family:inherit;-webkit-appearance:none;touch-action:manipulation';
    btn.addEventListener('mouseover', function() { this.style.background = '#0F6E56'; });
    btn.addEventListener('mouseout', function() { this.style.background = '#1D9E75'; });

    inputRow.appendChild(input);
    inputRow.appendChild(btn);
    container.appendChild(inputRow);

    var resultArea = document.createElement('div');
    resultArea.style.display = 'none';
    container.appendChild(resultArea);

    var disclaimer = document.createElement('p');
    disclaimer.style.cssText = 'font-size:11px;color:#aaa;margin:8px 0 0;line-height:1.4';
    disclaimer.textContent = 'AI identification is for guidance only and not a guarantee. Always consult a licensed pest control professional for accurate diagnosis and treatment.';
    container.appendChild(disclaimer);

    function showResult(aiResponse, pestInfo) {
      resultArea.style.display = 'block';
      resultArea.innerHTML = '';

      var responseDiv = document.createElement('div');
      responseDiv.style.cssText = 'padding:14px 16px;background:#fff;border-radius:8px;border:1px solid #e0e0e0;margin-bottom:12px';

      if (pestInfo) {
        var badge = document.createElement('div');
        badge.style.cssText = 'display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:500;margin-bottom:10px;color:#fff;background:' + getUrgencyColor(pestInfo.urgency);
        badge.textContent = getUrgencyLabel(pestInfo.urgency);
        responseDiv.appendChild(badge);
      }

      var aiText = document.createElement('p');
      aiText.style.cssText = 'font-size:14px;color:#333;line-height:1.6;margin:0';
      aiText.textContent = aiResponse;
      responseDiv.appendChild(aiText);
      resultArea.appendChild(responseDiv);

      var ctaBtn = document.createElement('button');
      var ctaLabel = pestInfo ? pestInfo.action : 'Get free exterminator quotes';
      ctaBtn.textContent = ctaLabel + ' →';
      ctaBtn.style.cssText = 'width:100%;padding:12px;background:#1D9E75;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;touch-action:manipulation';
      ctaBtn.addEventListener('mouseover', function() { this.style.background = '#0F6E56'; });
      ctaBtn.addEventListener('mouseout', function() { this.style.background = '#1D9E75'; });
      ctaBtn.addEventListener('click', scrollToForm);
      resultArea.appendChild(ctaBtn);
    }

    function handleSubmit() {
      var userText = input.value.trim();
      if (!userText && !selectedBase64) {
        input.style.borderColor = '#E24B4A';
        input.placeholder = 'Please describe what you see or upload a photo...';
        dropZone.style.borderColor = '#E24B4A';
        setTimeout(function() {
          dropZone.style.borderColor = selectedBase64 ? '#1D9E75' : '#ccc';
        }, 2000);
        return;
      }

      var submitText = userText || 'Please identify the pest or pest damage shown in this image.';
      if (selectedBase64 && !userText) {
        submitText = 'I am a homeowner and need help identifying the pest or pest damage in this photo. What pest is this and what should I do?';
      }

      btn.textContent = 'Analyzing...';
      btn.disabled = true;
      btn.style.background = '#888';
      resultArea.style.display = 'none';

      var detectedPest = detectPest(submitText);
      var pestInfo = detectedPest ? pestData[detectedPest] : null;

      var fullMessage = cityContext
        ? 'I am a homeowner in ' + cityContext + '. ' + submitText
        : submitText;

      sendToAdvisor(fullMessage, cityContext, selectedBase64, selectedType, function(err, aiResponse) {
        btn.textContent = 'Identify pest';
        btn.disabled = false;
        btn.style.background = '#1D9E75';

        if (err || !aiResponse) {
          if (pestInfo) {
            showResult(pestInfo.message, pestInfo);
          } else {
            resultArea.style.display = 'block';
            resultArea.innerHTML = '<p style="font-size:13px;color:#666;padding:12px;background:#fff;border-radius:8px;border:1px solid #e0e0e0">We weren\'t able to identify the pest. Try adding more detail to your description, or get a free professional inspection — a licensed exterminator can identify it on-site.</p>';
          }
        } else {
          showResult(aiResponse, pestInfo);
        }
      });
    }

    btn.addEventListener('click', handleSubmit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSubmit();
    });
  }

  function init() {
    document.querySelectorAll('[data-pest-advisor]').forEach(function(el) {
      buildWidget(el, el.getAttribute('data-city') || '');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
