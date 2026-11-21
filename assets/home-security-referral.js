// Measure quote interest without sending any contact information.
document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="/home-security-quote/"]');
  if (link && typeof window.gtag === 'function') {
    window.gtag('event', 'home_security_callback_click', {
      placement: link.closest('details') ? 'guide' : 'direct'
    });
  }
});
