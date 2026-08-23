// Copy a publication's BibTeX entry to the clipboard.
//
(function () {
  var RESET_MS = 1200;

  function flash(btn, message) {
    if (!btn.hasAttribute('data-label')) {
      btn.setAttribute('data-label', btn.textContent);
    }
    btn.textContent = message;
    clearTimeout(btn._resetTimer);
    btn._resetTimer = setTimeout(function () {
      btn.textContent = btn.getAttribute('data-label');
    }, RESET_MS);
  }

  // navigator.clipboard needs a secure context — fine on GitHub Pages (HTTPS)
  // and on localhost, but fall back for anything older or served over http.
  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try {
      return document.execCommand('copy');
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(area);
    }
  }

  function copy(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { flash(btn, 'copied'); },
        function () { flash(btn, legacyCopy(text) ? 'copied' : 'copy failed'); }
      );
      return;
    }
    flash(btn, legacyCopy(text) ? 'copied' : 'copy failed');
  }

  document.addEventListener('click', function (e) {
    if (!e.target || typeof e.target.closest !== 'function') return;
    var btn = e.target.closest('.js-copy-bib');
    if (!btn) return;
    var text = btn.getAttribute('data-bibtex');
    // Acknowledge failed click
    if (!text) {
      flash(btn, 'copy failed');
      return;
    }
    copy(text, btn);
  });
})();

particlesJS.load('particles-js', "/assets/particlesjs-config.json", function() {
    console.log('callback - particles.js config loaded');
  });
