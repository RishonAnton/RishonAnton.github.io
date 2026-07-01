/**
 * Main JavaScript — Portfolio interactions
 * Handles: loader, theme, navigation, scroll effects,
 * animations, projects, modals, lightbox, form, cursor
 */
(function () {
  'use strict';

  /* ============================================
     DOM References
     ============================================ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const loader = $('#loader');
  const header = $('#header');
  const scrollProgress = $('#scrollProgress');
  const themeToggle = $('#themeToggle');
  const navBurger = $('#navBurger');
  const navLinks = $('#navLinks');
  const backToTop = $('#backToTop');
  const projectModal = $('#projectModal');
  const modalContent = $('#modalContent');
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const contactForm = $('#contactForm');
  const projectsGrid = $('#projectsGrid');
  const cursor = $('#cursor');
  const cursorFollower = $('#cursorFollower');

  /* ============================================
     Loading Screen
     ============================================ */
  function initLoader() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        initCounters();
        initTyping();
      }, 2000);
    });
  }

  /* ============================================
     Theme Toggle (Dark / Light with persistence)
     ============================================ */
  function initTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateGitHubStatsTheme(next);
    });
  }

  function updateGitHubStatsTheme(theme) {
    const statsImg = $('.github-stats');
    if (!statsImg) return;
    const colorTheme = theme === 'dark' ? 'dark' : 'default';
    statsImg.src = `https://github-readme-stats.vercel.app/api?username=RishonAnton&show_icons=true&theme=${colorTheme}&hide_border=true&bg_color=00000000&title_color=6366f1&text_color=${theme === 'dark' ? 'c9d1d9' : '1e293b'}&icon_color=6366f1`;
  }

  /* ============================================
     Navigation
     ============================================ */
  function initNav() {
    navBurger.addEventListener('click', () => {
      navBurger.classList.toggle('active');
      navLinks.classList.toggle('open');
      navBurger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });

    $$('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navBurger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    const sections = $$('section[id]');
    const navLinkEls = $$('.nav__link');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinkEls.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach(s => observer.observe(s));
  }

  /* ============================================
     Scroll Effects
     ============================================ */
  function initScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

          scrollProgress.style.width = `${progress}%`;
          header.classList.toggle('scrolled', scrollY > 50);
          backToTop.classList.toggle('visible', scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================
     Scroll Reveal Animations
     ============================================ */
  function initReveal() {
    const reveals = $$('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  }

  /* ============================================
     Skill Bars Animation
     ============================================ */
  function initSkillBars() {
    const bars = $$('.skill-bar');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skill = entry.target.dataset.skill;
            const fill = $('.skill-bar__fill', entry.target);
            if (fill) fill.style.width = `${skill}%`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach(bar => observer.observe(bar));
  }

  /* ============================================
     Counter Animation
     ============================================ */
  function initCounters() {
    const counters = $$('.counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.target);
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;

        counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);

        if (progress < 1) requestAnimationFrame(update);
        else counter.textContent = isDecimal ? target.toFixed(2) : target;
      }

      requestAnimationFrame(update);
    });
  }

  /* ============================================
     Typing Effect
     ============================================ */
  function initTyping() {
    const el = $('#typedText');
    if (!el) return;

    const phrases = [
      'UI/UX Designer',
      'Frontend Developer',
      'Design Systems Thinker',
      'Hackathon Finalist',
      'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ============================================
     Projects Grid & Modal
     ============================================ */
  function renderProjects() {
    if (!projectsGrid || typeof PROJECTS === 'undefined') return;

    projectsGrid.innerHTML = PROJECTS.map(project => `
      <article class="project-card ${project.featured ? 'project-card--featured' : ''} reveal"
               data-project="${project.id}" tabindex="0" role="button"
               aria-label="View ${project.title} project details">
        <div class="project-card__image">
          ${project.image
            ? `<img src="${project.image}" alt="${project.title} — ${project.subtitle}" loading="lazy">`
            : `<div class="project-card__placeholder project-card__placeholder--${project.id}" aria-hidden="true"><span>${project.title}</span><small>${project.subtitle}</small></div>`
          }
          <div class="project-card__overlay">
            <span>View Project →</span>
          </div>
        </div>
        <div class="project-card__body">
          <div class="project-card__tags">
            ${project.tags.slice(0, 4).map(t => `<span class="project-card__tag">${t}</span>`).join('')}
          </div>
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          ${project.award ? `<div class="project-card__award">🏆 ${project.award}</div>` : ''}
        </div>
      </article>
    `).join('');

    $$('.project-card').forEach(card => {
      card.addEventListener('click', () => openProjectModal(card.dataset.project));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(card.dataset.project);
        }
      });
    });

    initReveal();
  }

  function openProjectModal(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    modalContent.innerHTML = `
      <div class="modal__hero">
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}">`
          : `<div class="project-card__placeholder project-card__placeholder--${project.id} project-card__placeholder--modal"><span>${project.title}</span><small>${project.subtitle}</small></div>`
        }
      </div>
      <div class="modal__body">
        <div class="modal__tags">
          ${project.tags.map(t => `<span class="modal__tag">${t}</span>`).join('')}
          <span class="modal__tag">${project.year}</span>
        </div>
        <h2 class="modal__title">${project.title}</h2>
        <p class="modal__desc">${project.description}</p>

        ${project.award ? `
          <div class="modal__section">
            <h4>🏆 Recognition</h4>
            <p style="color: var(--accent-warm); font-weight: 600;">${project.award}</p>
          </div>
        ` : ''}

        <div class="modal__section">
          <h4>Key Features</h4>
          <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>

        <div class="modal__section">
          <h4>Challenges Solved</h4>
          <ul>${project.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>

        <div class="modal__section">
          <h4>Impact</h4>
          <p style="color: var(--text-secondary); line-height: 1.7;">${project.impact}</p>
        </div>

        ${project.images.length > 1 ? `
          <div class="modal__section">
            <h4>Gallery</h4>
            <div class="modal__gallery">
              ${project.images.map(img => `
                <img src="${img}" alt="${project.title} screenshot" data-lightbox="${img}" loading="lazy">
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="modal__links">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn--primary ripple">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
          ${project.demo ? `
            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost ripple">
              Live Demo →
            </a>
          ` : `
            <span class="btn btn--ghost" style="opacity: 0.5; cursor: default;">Demo — Coming Soon</span>
          `}
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (project.images.length) initLightbox();
    initRipple();
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    $$('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeProjectModal();
        closeLightbox();
      }
    });
  }

  /* ============================================
     Lightbox
     ============================================ */
  function initLightbox() {
    $$('[data-lightbox]').forEach(el => {
      el.addEventListener('click', e => {
        e.stopPropagation();
        const src = el.dataset.lightbox || el.src;
        openLightbox(src);
      });
    });
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (!projectModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  /* ============================================
     Ripple Effect
     ============================================ */
  function initRipple() {
    $$('.ripple').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ============================================
     Custom Cursor
     ============================================ */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('no-cursor');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    $$('a, button, [data-cursor="hover"], .project-card, .cert-card, .gallery__item').forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
  }

  /* ============================================
     Contact Form
     ============================================ */
  function initForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:rishonanton@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ============================================
     Initialize Everything
     ============================================ */
  function initLightboxControls() {
    const closeBtn = $('#lightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    initLightbox();
  }

  function init() {
    initLoader();
    initTheme();
    initNav();
    initScroll();
    initReveal();
    initSkillBars();
    renderProjects();
    initModal();
    initLightboxControls();
    initRipple();
    initCursor();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
