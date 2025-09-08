(() => {
  // 1) Collect ONLY top-level images inside .galeri-content (excludes anything in .content-xx)
  const galleryImages = Array.from(document.querySelectorAll('.galeri-content > img'));

  if (!galleryImages.length) return;

  // 2) DOM refs
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lb__img');
  const btnClose = lb.querySelector('.lb__close');
  const btnPrev = lb.querySelector('.lb__prev');
  const btnNext = lb.querySelector('.lb__next');

  let index = 0;
  let startX = null;

  // 3) Helpers
  const clampIndex = i => (i + galleryImages.length) % galleryImages.length;

  function show(i) {
    index = clampIndex(i);
    const src = galleryImages[index].getAttribute('src');
    const alt = galleryImages[index].getAttribute('alt') || '';
    lbImg.src = src;
    lbImg.alt = alt;

    // Preload neighbors for snappy next/prev
    const nextIdx = clampIndex(index + 1);
    const prevIdx = clampIndex(index - 1);
    [nextIdx, prevIdx].forEach(n => {
      const img = new Image();
      img.src = galleryImages[n].getAttribute('src');
    });

    lb.classList.remove('hidden');
    document.body.classList.add('lb-open');
    lb.focus();
  }

  function close() {
    lb.classList.add('hidden');
    document.body.classList.remove('lb-open');
    // return focus to the thumbnail for accessibility
    if (galleryImages[index]) galleryImages[index].focus?.();
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  // 4) Bind thumbnail clicks
  galleryImages.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', () => show(i));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
    });
  });

  // 5) Lightbox controls
  btnClose.addEventListener('click', close);
  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Click outside image closes
  lb.addEventListener('click', (e) => {
    if (e.target === lb) close();
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });

  // Touch swipe (simple)
  lb.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    startX = null;
  }, { passive: true });
})();

// open undangan//
const overlay = document.getElementById('overlay');
const hideBtn  = document.getElementById('hide');

const music = new Audio('assets/Lomba Sihir - Ribuan Memori (Official Lyric Video) (320).mp3');
music.preload = 'auto';
music.loop = true;

hideBtn.addEventListener('click', async () => {
  // overlay.setAttribute('aria-hidden', 'true');   // hides via CSS
  overlay.style.display = 'none'
  document.body.style.overflowY = '';

  try { await music.play(); } catch (e) { console.error(e); }
});

