document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('header nav');

    if (nav) {
        nav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="index.html#showcase">Projects</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        `;
    }

    // --- SLIDESHOW ---
    const SLIDES = [
        { src: 'assets/images/VodWallpaper.png',           label: 'VOD — Souls-like RPG',        href: 'project-1.html' },
        { src: 'assets/images/AriaAren_Lightning_Girl.png', label: 'Aria Aren — Character Art',   href: 'project-1.html' },
        { src: 'assets/images/City1.png',                   label: 'City Environment',             href: 'project-1.html' },
        { src: 'assets/images/NirreannahYelling2.png',      label: 'Nirreannah — Character',       href: 'project-1.html' },
        { src: 'assets/images/Outdoors1.png',               label: 'Outdoor Scene',                href: 'project-1.html' },
        { src: 'assets/images/Scenery.png',                 label: 'Environment Concept',          href: 'project-1.html' },
        { src: 'assets/images/3D3-ult.png',                 label: 'High-Fidelity 3D Assets',      href: 'project-3.html' },
        { src: 'assets/images/3D1.png',                     label: '3D Asset Showcase',            href: 'project-3.html' },
        { src: 'assets/images/VodBottom.png',               label: 'VOD — World Art',              href: 'project-1.html' },
        { src: 'assets/images/TeranoxLogo.png',             label: 'GalaxyWord — Language App',   href: 'project-2.html' },
    ];

    const N = SLIDES.length;
    let current = 0;

    // roles[0]=prevId, roles[1]=activeId, roles[2]=nextId
    let roles = ['sa', 'sb', 'sc'];

    function wrap(i) {
        return ((i % N) + N) % N;
    }

    function setContent(elId, dataIdx) {
        const el = document.getElementById(elId);
        if (!el) return;
        const d = SLIDES[dataIdx];
        el.querySelector('.slide-img').src = d.src;
        el.querySelector('.slide-img').alt = d.label;
        el.querySelector('.slide-label').textContent = d.label;
        el.querySelector('.slide-inner').href = d.href;
    }

    function updateDots() {
        document.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('is-active', i === current);
        });
    }

    function goTo(newIndex, dir) {
        if (newIndex === current) return;

        const [prevId, activeId, nextId] = roles;
        // The element that will fly off-screen to make room for the incoming card
        const outId = dir > 0 ? prevId : nextId;
        // The element that will become the new active
        const inId  = dir > 0 ? nextId : prevId;

        current = newIndex;

        // Instantly reposition the outgoing element off-screen on the opposite side
        const outEl = document.getElementById(outId);
        outEl.style.transition = 'none';
        outEl.className = 'slide-wrapper ' + (dir > 0 ? 'is-far-right' : 'is-far-left');
        setContent(outId, dir > 0 ? wrap(current + 1) : wrap(current - 1));

        // Force a reflow so the browser registers the instant position
        outEl.offsetHeight; // eslint-disable-line no-unused-expressions

        // Re-enable transitions and animate everything into place
        outEl.style.transition = '';
        outEl.className = 'slide-wrapper ' + (dir > 0 ? 'is-next' : 'is-prev');

        document.getElementById(activeId).className = 'slide-wrapper ' + (dir > 0 ? 'is-prev' : 'is-next');
        document.getElementById(inId).className     = 'slide-wrapper is-active';

        // Rotate role assignments
        roles = dir > 0
            ? [activeId, inId, outId]   // new [prev, active, next]
            : [outId,    inId, activeId]; // new [prev, active, next]

        updateDots();
    }

    function initSlideshow() {
        const dotsEl = document.getElementById('slide-dots');
        if (!dotsEl) return;

        // Build dot buttons
        SLIDES.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'slide-dot' + (i === 0 ? ' is-active' : '');
            btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
            btn.addEventListener('click', () => {
                if (i === current) return;
                const dir = ((i - current + N) % N) <= N / 2 ? 1 : -1;
                goTo(i, dir);
            });
            dotsEl.appendChild(btn);
        });

        // Populate initial content
        setContent('sa', wrap(current - 1)); // prev
        setContent('sb', wrap(current));      // active
        setContent('sc', wrap(current + 1)); // next

        document.getElementById('slide-prev-btn').addEventListener('click', () => {
            goTo(wrap(current - 1), -1);
        });
        document.getElementById('slide-next-btn').addEventListener('click', () => {
            goTo(wrap(current + 1), 1);
        });
    }

    initSlideshow();
});