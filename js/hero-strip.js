(function () {
  // 5 featured photos cycle through .hero-image (the right-side hero photo).
  // Order matches the thumbnail strip in index.html and the spec §3.3 placement plan.
  var FEATURED = [
    'exterior-front-1.jpg',
    'exterior-rear-1.jpg',
    'foyer.jpg',
    'kitchen-1.jpg',
    'suite-1.jpg'
  ];
  var ROTATION_MS = 5000;          // auto-rotate every 5 seconds
  var PAUSE_AFTER_CLICK_MS = 30000; // 30-second pause after manual click

  var currentIndex = 0;
  var rotateTimer = null;
  var pauseUntil = 0;

  function init() {
    var featured = document.getElementById('hero-featured-img');
    var thumbs = document.querySelectorAll('.hero-strip-thumb');
    var heroSection = document.getElementById('hero');

    if (!featured || thumbs.length === 0 || !heroSection) {
      return;
    }

    function setActive(i) {
      currentIndex = i;
      featured.src = 'images/' + FEATURED[i];
      featured.alt = 'Featured view of Collective 85 (photo ' + (i + 1) + ' of ' + FEATURED.length + ')';
      for (var t = 0; t < thumbs.length; t++) {
        if (t === i) thumbs[t].classList.add('active');
        else thumbs[t].classList.remove('active');
      }
    }

    function advance() {
      if (Date.now() < pauseUntil) return;
      setActive((currentIndex + 1) % FEATURED.length);
    }

    function startRotation() {
      stopRotation();
      rotateTimer = setInterval(advance, ROTATION_MS);
    }

    function stopRotation() {
      if (rotateTimer) {
        clearInterval(rotateTimer);
        rotateTimer = null;
      }
    }

    for (var i = 0; i < thumbs.length; i++) {
      (function (idx) {
        thumbs[idx].addEventListener('click', function () {
          setActive(idx);
          pauseUntil = Date.now() + PAUSE_AFTER_CLICK_MS;
        });
      })(i);
    }

    heroSection.addEventListener('mouseenter', stopRotation);
    heroSection.addEventListener('mouseleave', startRotation);

    featured.addEventListener('click', function () {
      openLightbox(currentIndex);
    });

    setActive(0);
    startRotation();
  }

  function openLightbox(startIndex) {
    var current = startIndex;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');
    overlay.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button type="button" class="lightbox-prev" aria-label="Previous photo">&lsaquo;</button>' +
      '<img class="lightbox-img" src="images/' + FEATURED[current] + '" alt="">' +
      '<button type="button" class="lightbox-next" aria-label="Next photo">&rsaquo;</button>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    var img = overlay.querySelector('.lightbox-img');
    show(current);

    function show(i) {
      current = (i + FEATURED.length) % FEATURED.length;
      img.src = 'images/' + FEATURED[current];
      var thumb = document.querySelector('.hero-strip-thumb[data-index="' + current + '"] img');
      img.alt = thumb ? thumb.alt.replace(' thumbnail', '') : 'Featured photo';
    }

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    }

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () {
      show(current - 1);
    });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () {
      show(current + 1);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);

    // Touch swipe (mobile)
    var touchStartX = null;
    overlay.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    });
    overlay.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        show(current + (dx < 0 ? 1 : -1));
      }
      touchStartX = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
