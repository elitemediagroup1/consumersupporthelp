// A click opens the partner form. Only the provider knows when a lead is submitted.
document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href="/go/home-security"]');
  if (link && typeof window.gtag === 'function') {
    window.gtag('event', 'home_security_callback_click', {
      placement: link.closest('details') ? 'guide' : 'direct'
    });
  }
});
