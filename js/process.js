/* ============================================================
   TINY TREASURES BY MJ — Interactive Process Section
   Stepper accordion with auto-cycle
   ============================================================ */

export function initProcess(stages) {
    const container = document.getElementById('process-steps');
    if (!container) return;

    let activeIndex = 0;

    // Render step list
    stages.forEach((stage, i) => {
        const step = document.createElement('div');
        step.className = `process-step ${i === 0 ? 'active' : ''} reveal delay-${i + 1}`;
        step.setAttribute('data-index', i);
        step.setAttribute('role', 'button');
        step.setAttribute('tabindex', '0');
        step.setAttribute('aria-label', `Step ${i + 1}: ${stage.title}`);
        step.innerHTML = `
      <div class="process-step-icon" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
      <div class="process-step-body">
        <h4>${stage.title}</h4>
        <p>${stage.detail}</p>
      </div>
    `;
        step.addEventListener('click', () => activate(i));
        step.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') activate(i);
        });
        container.appendChild(step);
    });

    // Update active stepper state
    function activate(index) {
        activeIndex = index;

        // Steps
        container.querySelectorAll('.process-step').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
    }

    // Auto-cycle through stages
    let autoCycle = setInterval(() => {
        const next = (activeIndex + 1) % stages.length;
        activate(next);
    }, 4000);

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoCycle));
    container.addEventListener('mouseleave', () => {
        autoCycle = setInterval(() => {
            const next = (activeIndex + 1) % stages.length;
            activate(next);
        }, 4000);
    });

    // Initial
    activate(0);
}
