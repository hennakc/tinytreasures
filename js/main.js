/* ============================================================
   TINY TREASURES BY MJ — Main JavaScript
   Init, scroll observer, parallax, nav, progress bar
   ============================================================ */

import { PRODUCTS, TESTIMONIALS, FAQS, waLink, SOCIAL, BUSINESS, PROCESS_STAGES, GALLERY } from './config.js';
import { initGallery } from './gallery.js';
import { initProcess } from './process.js';
import { initWheel } from './wheel.js';

// ── DOM Ready ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderTestimonials();
    renderFAQ();
    initProcess(PROCESS_STAGES);
    initGallery(GALLERY);
    initWheel();
    initNav();
    initScrollReveal();
    initProgressBar();
    initParallax();
    initMobileNav();
    initWhatsApp();
    initCounters();
    console.log('Tiny Treasures by MJ - website loaded!');
});

// ── Render Products (Masonry) ────────────────────────────
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    PRODUCTS.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = `product-card reveal delay-${(i % 4) + 1}`;
        card.innerHTML = `
      ${p.badge ? `<div class="product-badge"><span class="badge badge-${p.badgeType}">${p.badge}</span></div>` : ''}
      <div class="product-img-wrap">
        <img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy" width="600" height="450">
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-footer">
          <button class="btn btn-primary btn-sm" onclick="window.open('${waLink('order')}', '_blank')">
            Enquire Now
          </button>
          <button class="btn btn-secondary btn-sm" aria-label="Learn more about ${p.name}">
            View Details
          </button>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}

// ── Render Testimonials ───────────────────────────────────
function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;

    TESTIMONIALS.forEach((t) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card reveal';
        card.innerHTML = `
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-footer">
        <div class="testimonial-avatar">${t.initial}</div>
        <div class="testimonial-info">
          <strong>${t.name}</strong>
          <span>${t.detail}</span>
        </div>
        <div class="stars" style="margin-left:auto" aria-label="${t.rating} stars">★★★★★</div>
      </div>
    `;
        grid.appendChild(card);
    });
}

// ── Render FAQ ────────────────────────────────────────────
function renderFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    FAQS.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'faq-item reveal';
        el.id = `faq-${i}`;
        el.innerHTML = `
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        <span>${item.q}</span>
        <span class="faq-chevron" aria-hidden="true">▾</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}" role="region">
        <div class="faq-answer-inner">${item.a}</div>
      </div>
    `;
        const btn = el.querySelector('.faq-question');
        btn.addEventListener('click', () => toggleFAQ(el, btn));
        list.appendChild(el);
    });
}

function toggleFAQ(item, btn) {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    // Open clicked if it was closed
    if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
}

// ── Navigation ────────────────────────────────────────────
function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const hero = document.querySelector('.hero');
    let heroBottom = hero ? hero.getBoundingClientRect().bottom + window.scrollY : 0;

    const onScroll = () => {
        const y = window.scrollY;
        if (y > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        // On-hero state for white text
        if (y < heroBottom - 100) {
            nav.classList.add('on-hero');
        } else {
            nav.classList.remove('on-hero');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// ── Mobile Nav ────────────────────────────────────────────
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── Scroll Reveal ─────────────────────────────────────────
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ── Progress Bar ──────────────────────────────────────────
function initProgressBar() {
    const fill = document.querySelector('.progress-fill');
    if (!fill) return;

    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? window.scrollY / max : 0;
        fill.style.transform = `scaleX(${pct})`;
    }, { passive: true });
}

// ── Parallax ──────────────────────────────────────────────
function initParallax() {
    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroBlobs = document.querySelectorAll('.hero-blob');
    const heroOrn = document.querySelectorAll('.hero-ornament');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                heroBlobs.forEach((b, i) => {
                    const speed = 0.12 + i * 0.06;
                    b.style.transform = `translateY(${y * speed}px)`;
                });
                heroOrn.forEach((o, i) => {
                    const speed = 0.08 + i * 0.04;
                    o.style.transform = `translateY(${y * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ── WhatsApp ──────────────────────────────────────────────
function initWhatsApp() {
    // Wire up all data-wa buttons
    document.querySelectorAll('[data-wa]').forEach(btn => {
        const type = btn.dataset.wa;
        btn.addEventListener('click', () => {
            window.open(waLink(type), '_blank', 'noopener');
        });
    });
}

// ── Animated Counters ─────────────────────────────────────
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const start = performance.now();
            const animate = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                el.textContent = Math.round(target * ease) + suffix;
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => obs.observe(el));
}

// ── Toast ─────────────────────────────────────────────────
export function showToast(message, type = 'default') {
    const container = document.querySelector('.toast-container') || (() => {
        const c = document.createElement('div');
        c.className = 'toast-container';
        document.body.appendChild(c);
        return c;
    })();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-indicator">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'i'}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeUp 0.3s var(--ease-spring) reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
} 