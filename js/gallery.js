/* ============================================================
   TINY TREASURES BY MJ — Gallery Carousel
   Infinite loop, drag, swipe, keyboard, 3D card flip
   ============================================================ */

export function initGallery(items) {
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const dotsContainer = document.getElementById('gallery-dots');

    if (!track) return;

    // Render cards (duplicated for infinite loop)
    const allItems = [...items, ...items]; // Duplicate for infinite scroll
    allItems.forEach((item, i) => {
        const el = createCard(item, i < items.length ? i : i - items.length);
        track.appendChild(el);
    });

    // Dots
    items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer?.appendChild(dot);
    });

    // State
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let trackOffset = 0;
    const cardWidth = 336; // 320px + 16px gap
    const visibleCount = getVisibleCount();

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w >= 1280) return 4;
        if (w >= 900) return 3;
        if (w >= 600) return 2;
        return 1;
    }

    function updateDots() {
        document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex % items.length);
        });
    }

    function goTo(index, animate = true) {
        currentIndex = index;
        trackOffset = -index * cardWidth;
        track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.4,0,0.2,1)' : 'none';
        track.style.transform = `translateX(${trackOffset}px)`;
        updateDots();
    }

    function next() {
        currentIndex++;
        if (currentIndex >= items.length) {
            // Jump to clone, then instantly reset
            goTo(currentIndex, true);
            setTimeout(() => {
                currentIndex = 0;
                goTo(0, false);
            }, 450);
        } else {
            goTo(currentIndex, true);
        }
    }

    function prev() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = items.length - 1;
            goTo(items.length - 1 + items.length, false);
            setTimeout(() => {
                goTo(items.length - 1, false);
            }, 10);
        } else {
            goTo(currentIndex, true);
        }
    }

    // Buttons
    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    // Auto-play
    let autoPlay = setInterval(next, 4000);
    const pauseAuto = () => { clearInterval(autoPlay); };
    const resumeAuto = () => { autoPlay = setInterval(next, 4000); };
    track.addEventListener('mouseenter', pauseAuto);
    track.addEventListener('mouseleave', resumeAuto);
    track.addEventListener('touchstart', pauseAuto, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // ── Drag (Mouse) ────────────────────────────────────────
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('mouseleave', dragEnd);

    // ── Swipe (Touch) ───────────────────────────────────────
    track.addEventListener('touchstart', (e) => dragStart(e.touches[0]), { passive: true });
    track.addEventListener('touchmove', (e) => dragMove(e.touches[0]), { passive: false });
    track.addEventListener('touchend', (e) => dragEnd(e.changedTouches[0]));

    function dragStart(e) {
        isDragging = true;
        startX = e.clientX;
        currentX = trackOffset;
        track.classList.add('dragging');
        pauseAuto();
    }

    function dragMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        track.style.transition = 'none';
        track.style.transform = `translateX(${currentX + dx}px)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');

        const dx = e.clientX - startX;
        if (dx < -60) next();
        else if (dx > 60) prev();
        else goTo(currentIndex, true);

        resumeAuto();
    }

    // ── Card Flip ───────────────────────────────────────────
    function createCard(item, originalIndex) {
        const wrap = document.createElement('div');
        wrap.className = 'gallery-item';
        wrap.innerHTML = `
      <div class="flip-card" tabindex="0" role="button" aria-label="Click to see details about ${item.name}" data-index="${originalIndex}">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${item.image}" alt="${item.name}" loading="lazy" draggable="false">
            <div class="flip-overlay">
              <div class="flip-overlay-text">${item.name}</div>
            </div>
            <div class="flip-hint">Click to flip</div>
          </div>
          <div class="flip-card-back">
            <div class="texture-overlay"></div>
            <div style="position:relative;z-index:1">
              <div class="flip-back-title">${item.name}</div>
              <div class="flip-back-row">
                <div>
                  <span class="flip-back-label">Inspiration</span>
                  ${item.inspiration}
                </div>
              </div>
              <div class="flip-back-row">
                <div>
                  <span class="flip-back-label">Materials</span>
                  ${item.materials}
                </div>
              </div>
              <div class="flip-back-row">
                <div>
                  <span class="flip-back-label">Time Taken</span>
                  ${item.time}
                </div>
              </div>
              <div class="flip-back-row">
                <div>
                  <span class="flip-back-label">Customisable</span>
                  ${item.customisable}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

        const card = wrap.querySelector('.flip-card');

        // Click to flip (only if not dragging)
        let clickStart = 0;
        card.addEventListener('mousedown', () => { clickStart = Date.now(); });
        card.addEventListener('mouseup', () => {
            if (Date.now() - clickStart < 200) {
                card.classList.toggle('flipped');
            }
        });

        // Keyboard flip
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        // Un-flip on mouse leave
        card.addEventListener('mouseleave', () => {
            setTimeout(() => card.classList.remove('flipped'), 500);
        });

        return wrap;
    }
}
