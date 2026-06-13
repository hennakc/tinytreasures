/* ============================================================
   TINY TREASURES BY MJ — Booking & Contact Forms
   Workshop reservation via WhatsApp
   ============================================================ */

import { WHATSAPP_NUMBER, WORKSHOPS } from './config.js';
import { showToast } from './main.js';

export function initBooking(workshops) {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('modal-close');
    const form = document.getElementById('booking-form');
    const workshopSelect = document.getElementById('booking-workshop');

    if (!modal) return;

    // Populate workshop select
    if (workshopSelect) {
        workshops.forEach(w => {
            const opt = document.createElement('option');
            opt.value = w.id;
            opt.textContent = `${w.title} — ${w.date} (${w.price})`;
            workshopSelect.appendChild(opt);
        });
    }

    // Open modal via custom event
    window.addEventListener('openBooking', (e) => {
        const workshopId = e.detail;
        openModal(workshopId);
    });

    // Open booking from CTA
    document.querySelectorAll('[data-open-booking]').forEach(btn => {
        btn.addEventListener('click', () => openModal());
    });

    function openModal(workshopId) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (workshopId && workshopSelect) {
            workshopSelect.value = String(workshopId);
        }
        // Focus first input
        setTimeout(() => {
            const first = modal.querySelector('input, select');
            first?.focus();
        }, 300);
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Close handlers
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ── Booking Form Submit ──────────────────────────────────
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateBookingForm(form)) return;

        const data = new FormData(form);
        const name = data.get('name')?.trim();
        const phone = data.get('phone')?.trim();
        const email = data.get('email')?.trim();
        const workshopId = data.get('workshop');
        const participants = data.get('participants');
        const notes = data.get('notes')?.trim();

        const workshop = workshops.find(w => w.id === Number(workshopId));
        const workshopName = workshop ? `${workshop.title} (${workshop.date})` : workshopId;

        const message = encodeURIComponent(
            `🌸 *Workshop Booking Request*\n\n` +
            `*Name:* ${name}\n` +
            `*Phone:* ${phone}\n` +
            `*Email:* ${email}\n` +
            `*Workshop:* ${workshopName}\n` +
            `*Participants:* ${participants}\n` +
            (notes ? `*Notes:* ${notes}\n` : '') +
            `\nKindly confirm my booking at Tiny Treasures by MJ. Thank you! 💕`
        );

        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(waUrl, '_blank', 'noopener');
        closeModal();
        form.reset();

        showToast('Redirecting to WhatsApp to confirm your booking! 🎉', 'success');
    });

    // ── Contact Form ─────────────────────────────────────────
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateContactForm(contactForm)) return;

        const data = new FormData(contactForm);
        const name = data.get('name')?.trim();
        const email = data.get('email')?.trim();
        const subject = data.get('subject')?.trim();
        const message = data.get('message')?.trim();

        const waMessage = encodeURIComponent(
            `💌 *Message from Tiny Treasures Website*\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Subject:* ${subject}\n\n` +
            `*Message:*\n${message}`
        );

        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
        window.open(waUrl, '_blank', 'noopener');
        contactForm.reset();

        showToast('Message sent via WhatsApp! We\'ll reply soon. 💕', 'success');
    });
}

// ── Validation Helpers ────────────────────────────────────
function validateBookingForm(form) {
    let valid = true;
    clearErrors(form);

    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    const ws = form.querySelector('[name="workshop"]');

    if (!name?.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
    if (!phone?.value.trim() || !/^[\d\s\-\+\(\)]{7,15}$/.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number'); valid = false;
    }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Please enter a valid email address'); valid = false;
    }
    if (!ws?.value) { showError(ws, 'Please select a workshop'); valid = false; }

    return valid;
}

function validateContactForm(form) {
    let valid = true;
    clearErrors(form);

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name?.value.trim()) { showError(name, 'Name is required'); valid = false; }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Valid email is required'); valid = false;
    }
    if (!message?.value.trim()) { showError(message, 'Please write a message'); valid = false; }

    return valid;
}

function showError(el, msg) {
    if (!el) return;
    el.style.borderColor = 'var(--terracotta)';
    el.style.boxShadow = '0 0 0 3px rgba(200,90,54,0.15)';
    const err = document.createElement('span');
    err.className = 'form-error';
    err.style.cssText = 'display:block;font-size:0.75rem;color:var(--terracotta);margin-top:4px;';
    err.textContent = msg;
    el.parentNode?.insertBefore(err, el.nextSibling);
}

function clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(e => e.remove());
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
        el.style.borderColor = '';
        el.style.boxShadow = '';
    });
}
