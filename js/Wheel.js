/* ============================================================
   TINY TREASURES BY MJ — 3D Spinning Wheel  v3
   Cinematic tilted carousel with hover-decelerate, depth
   lighting, per-card scale animation — all in one rAF loop.
   ============================================================ */

import { PRODUCTS, waLink } from './config.js';

export function initWheel() {
    // Two rAFs: first lets DOM paint, second lets CSS apply sizes
    requestAnimationFrame(() => requestAnimationFrame(_buildWheel));
}

/* ─────────────────────────────────────────────────────────── */
function _buildWheel() {
    const ring      = document.getElementById('wheel-ring');
    const stage     = document.getElementById('wheel-stage');
    const lightbox  = document.getElementById('wheel-lightbox');
    const lbBD      = document.getElementById('wheel-lb-backdrop');
    const lbClose   = document.getElementById('wheel-lb-close');
    const lbImg     = document.getElementById('wheel-lb-img');
    const lbCat     = document.getElementById('wheel-lb-cat');
    const lbName    = document.getElementById('wheel-lb-name');
    const lbDesc    = document.getElementById('wheel-lb-desc');
    const lbEnquire = document.getElementById('wheel-lb-enquire');
    if (!ring || !stage) return;

    /* ── Guard against double-init on resize ─────────────── */
    if (stage._wheelInit) {
        stage._wheelDestroy && stage._wheelDestroy();
    }

    const items = PRODUCTS;
    const N     = items.length;

    /* ── Responsive dimensions ───────────────────────────── */
    const vw      = window.innerWidth;
    const isPhone = vw < 480;
    const isTab   = vw < 768;

    const CARD   = isPhone ? 80  : isTab ? 105 : 130;   // card px
    const GAP    = isPhone ? 20  : isTab ? 26  : 36;    // gap between card edges

    // Correct geometry: radius so arc-length between cards = GAP
    const RADIUS = Math.round((CARD + GAP) / (2 * Math.sin(Math.PI / N)));
    const STAGE  = (RADIUS + CARD) * 2;

    stage.style.width   = STAGE + 'px';
    stage.style.height  = STAGE + 'px';
    // Perspective on the STAGE (parent of ring) is what creates 3D
    stage.style.perspective       = Math.round(RADIUS * 3.2) + 'px';
    stage.style.perspectiveOrigin = '50% 50%';

    // Scale medallion to card
    const med = stage.querySelector('.wheel-center-text');
    if (med) {
        const ms = Math.round(CARD * 0.88);
        med.style.width  = ms + 'px';
        med.style.height = ms + 'px';
    }

    /* ── Tilt wrapper (ring tilts on X, not the stage) ───── */
    // We need a tilt wrapper INSIDE the stage so perspective is
    // applied by the stage and the tilt+spin are on the ring.
    // The ring already has transform-style:preserve-3d in CSS.
    // We apply tiltX on the ring itself as part of its transform.
    const TILT = isPhone ? 12 : 18;   // degrees — cinematic but all cards visible

    /* ── Hover scale constants ───────────────────────────── */
    const HOVER_SCALE    = isPhone ? 1.28 : 1.42;
    const HOVER_Z_PUSH   = isPhone ? 30   : 50;     // extra translateZ on hover (px)
    const SCALE_SPEED    = 0.085;                    // lerp factor per frame

    /* ── Build card elements ─────────────────────────────── */
    ring.innerHTML = '';     // clear on rebuild

    const cardEls   = [];    // [{el, img, label, baseAngle, scaleCur, scaleTarget}]

    items.forEach((item, i) => {
        const baseAngle = (360 / N) * i;

        const el = document.createElement('div');
        el.className = 'wheel-item';
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `View ${item.name}`);
        el.style.cssText = `
            width:${CARD}px;
            height:${CARD}px;
            margin-left:${-CARD / 2}px;
            margin-top:${-CARD / 2}px;
            will-change: transform;
            transform-origin: center center;
        `;

        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}"
                 loading="lazy" draggable="false"
                 style="width:100%;height:100%;object-fit:cover;
                        display:block;border-radius:12px;
                        pointer-events:none;will-change:filter;">
            <div class="wheel-item-label">${item.name}</div>
        `;

        const img   = el.querySelector('img');
        const label = el.querySelector('.wheel-item-label');

        cardEls.push({ el, img, label, baseAngle, scaleCur: 1, scaleTarget: 1 });
        ring.appendChild(el);
    });

    /* ── Rotation & animation state ─────────────────────── */
    let angle       = 0;          // current wheel Y rotation (deg)
    let spinVel     = 0;          // current spin velocity (deg/frame)
    let hoveredIdx  = -1;         // which card is hovered (-1 = none)
    let dragging    = false;
    let lastX       = 0;
    let rafId       = null;
    let destroyed   = false;

    // AUTO speed in deg/frame
    const AUTO_VEL   = isPhone ? 0.14 : 0.18;
    // Deceleration: how fast vel bleeds when hovering or after drag
    const FRIC_HOVER = 0.88;      // aggressive — stops in ~10 frames
    const FRIC_DRAG  = 0.93;      // natural coast after drag release
    const DRAG_SENS  = Math.max(0.22, 0.50 - N * 0.012);

    // Target velocity: 0 when hovered, AUTO_VEL normally
    let velTarget = AUTO_VEL;

    /* ── rAF loop ─────────────────────────────────────────── */
    function tick() {
        if (destroyed) return;

        /* 1. Drive spinVel toward target */
        if (!dragging) {
            const fric = hoveredIdx >= 0 ? FRIC_HOVER : FRIC_DRAG;
            if (hoveredIdx >= 0) {
                // Decelerate hard to 0
                spinVel *= fric;
                if (Math.abs(spinVel) < 0.005) spinVel = 0;
            } else if (spinVel < AUTO_VEL - 0.005) {
                // Gently accelerate back to auto speed after hover/drag
                spinVel += (AUTO_VEL - spinVel) * 0.03;
            } else {
                spinVel = AUTO_VEL;
            }
            angle += spinVel;
        }

        /* 2. Apply ring transform: tiltX + spinY */
        ring.style.transform = `rotateX(${TILT}deg) rotateY(${angle}deg)`;

        /* 3. Per-card: depth lighting + hover scale */
        cardEls.forEach((card, i) => {
            // Effective angle of this card relative to viewer (0° = front)
            const effective = ((card.baseAngle + angle) % 360 + 360) % 360;
            // normalised 0..1 where 0 = dead front, 0.5 = dead back
            const norm = Math.abs(effective <= 180 ? effective : effective - 360) / 180;
            // front cards: bright; back cards: dim
            const bright = 0.45 + (1 - norm) * 0.62;  // 0.45 (back) → 1.07 (front)

            /* Hover scale lerp */
            card.scaleTarget = (i === hoveredIdx) ? HOVER_SCALE : 1;
            card.scaleCur += (card.scaleTarget - card.scaleCur) * SCALE_SPEED;
            const s  = card.scaleCur;
            const tz = (s - 1) * HOVER_Z_PUSH;   // push Z proportionally to scale

            /* Combined card transform:
               base position on ring (set here so we own the full transform) */
            card.el.style.transform =
                `rotateY(${card.baseAngle}deg) translateZ(${RADIUS}px) ` +
                `scale3d(${s},${s},1) translateZ(${tz}px)`;

            /* Brightness filter */
            const finalBright = i === hoveredIdx ? 1.08 : bright;
            card.img.style.filter = `brightness(${finalBright.toFixed(3)})`;

            /* Label opacity: visible when front-ish or hovered */
            const labelVis = i === hoveredIdx ? 1 : Math.max(0, (1 - norm) - 0.35) * 2;
            card.label.style.opacity = Math.min(1, labelVis).toFixed(3);

            /* Border glow on hover */
            if (i === hoveredIdx) {
                card.el.style.boxShadow =
                    '0 24px 64px rgba(200,90,54,0.55), ' +
                    '0 0 0 2px rgba(200,90,54,0.8), ' +
                    '0 8px 32px rgba(0,0,0,0.6)';
                card.el.style.borderColor = 'rgba(200,90,54,0.9)';
            } else {
                // Subtle depth shadow — stronger for front cards
                const shadowAlpha = (0.3 + (1 - norm) * 0.3).toFixed(2);
                card.el.style.boxShadow = `0 8px 32px rgba(0,0,0,${shadowAlpha})`;
                card.el.style.borderColor = `rgba(255,255,255,${(0.06 + (1-norm)*0.14).toFixed(2)})`;
            }
        });

        rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    /* ── Hover handlers ──────────────────────────────────── */
    cardEls.forEach((card, i) => {
        card.el.addEventListener('mouseenter', () => {
            hoveredIdx = i;
            // Inherit current velocity — loop will decelerate it
        });
        card.el.addEventListener('mouseleave', () => {
            if (hoveredIdx === i) {
                hoveredIdx = -1;
                // spinVel is already near 0; the loop will ramp it back up
            }
        });
    });

    /* ── Pointer drag ────────────────────────────────────── */
    stage.addEventListener('pointerdown', (e) => {
        // Don't hijack clicks on cards (handled separately)
        dragging    = true;
        lastX       = e.clientX;
        hoveredIdx  = -1;
        stage.setPointerCapture(e.pointerId);
        stage.style.cursor = 'grabbing';
        e.preventDefault();
    });

    stage.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        spinVel   = dx * DRAG_SENS;
        angle    += spinVel;
        lastX     = e.clientX;
    });

    const endDrag = () => {
        dragging = false;
        stage.style.cursor = 'grab';
        // spinVel carries momentum; loop coasts it down then ramps to AUTO
    };
    stage.addEventListener('pointerup',     endDrag);
    stage.addEventListener('pointercancel', endDrag);

    /* ── Click-to-lightbox (ignore drag releases) ────────── */
    cardEls.forEach((card, i) => {
        let t0 = 0, x0 = 0;
        card.el.addEventListener('pointerdown', (e) => {
            t0 = Date.now(); x0 = e.clientX;
            e.stopPropagation();   // don't trigger stage drag
        });
        card.el.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            if (Date.now() - t0 < 280 && Math.abs(e.clientX - x0) < 10) {
                openLightbox(items[i]);
            }
        });
        card.el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(items[i]);
            }
        });
    });

    /* ── Keyboard spin ───────────────────────────────────── */
    stage.setAttribute('tabindex', '0');
    stage.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { spinVel =  10; hoveredIdx = -1; }
        if (e.key === 'ArrowLeft')  { spinVel = -10; hoveredIdx = -1; }
    });

    /* ── Resize → full rebuild ───────────────────────────── */
    let resizeTimer;
    const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            destroyed = true;
            cancelAnimationFrame(rafId);
            ring.innerHTML = '';
            stage._wheelInit = false;
            _buildWheel();
        }, 280);
    };
    window.addEventListener('resize', onResize);

    /* ── Destroy helper ──────────────────────────────────── */
    stage._wheelInit    = true;
    stage._wheelDestroy = () => {
        destroyed = true;
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
    };

    /* ── Lightbox ────────────────────────────────────────── */
    function openLightbox(item) {
        if (!lightbox) return;
        lbImg.src          = item.image;
        lbImg.alt          = item.name;
        lbCat.textContent  = item.category    || '';
        lbName.textContent = item.name;
        lbDesc.textContent = item.description || '';
        if (lbEnquire) {
            lbEnquire.onclick = () => window.open(waLink('order'), '_blank', 'noopener');
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => lbClose?.focus(), 60);
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    lbClose?.addEventListener('click', closeLightbox);
    lbBD?.addEventListener('click',    closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
    });
}