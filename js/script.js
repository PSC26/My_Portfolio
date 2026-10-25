/**
 * PRANAV CHOUDHARI — PORTFOLIO WEBSITE JAVASCRIPT
 * Senior UI/UX Designer & Creative Technologist
 * Vanilla JS: Modular, Accessible, Zero-Dependency
 */

(function () {
  'use strict';

  /* ==========================================================================
     PROJECT CASE STUDY DATA (Complete Source of Truth)
     ========================================================================== */
  const PROJECTS_DATA = {
    curocare: {
      id: 'curocare',
      title: 'CuroCare',
      category: 'Healthcare · Insurance · EMR',
      badge: '01',
      image: '/assets/projects/curocare.jpg',
      role: 'Lead UI/UX Designer',
      focus: 'Healthcare workflows & EMR',
      work: 'User Journeys · Wireframing · UI Systems · Interactive Prototypes',
      platform: 'Web Application + Mobile Responsive',
      overview:
        'CuroCare is a multi-sided healthcare operating system designed to bridge third-party administrators (TPAs), insurance providers, enterprise corporates, hospitals, healthcare professionals, and patients. It replaces fragmented claim processing, appointment silos, and disconnected medical histories with a unified, role-based digital workspace.',
      challenge:
        'Healthcare platforms frequently suffer from severe cognitive overload, cluttered tabular data, and confusing claim authorization delays. Different personas—from hospital desk coordinators to corporate HR admins—require completely different permission boundaries and task priorities within the same clinical network.',
      solution:
        'Developed an empathetic, highly structured role-based dashboard architecture. By implementing modular clinical widgets, clear claims status trackers, and empathetic patient timelines, CuroCare reduced average claim processing latency and eliminated redundant medical records across partner facilities.',
      deliverables: [
        'End-to-end role-based information architecture for 5 distinct clinical and administrative personas',
        'Complex claim adjudication pipeline with real-time settlement tracking and discrepancy alerts',
        'Electronic Medical Record (EMR) charting UI optimized for quick doctor consultation notes',
        'Comprehensive healthcare design token library, WCAG AA compliant contrast palette, and micro-component library'
      ]
    },
    tmobile: {
      id: 'tmobile',
      title: 'T-Mobile Outage AI',
      category: 'Agentic AI · Enterprise Telemetry',
      badge: '02',
      image: '/assets/projects/t-mobile.jpg',
      role: 'Product Designer & UX Architect',
      focus: 'Agentic AI & Network Diagnostics',
      work: 'Conversational UX · Network Topology · Root-Cause Analysis',
      platform: 'Enterprise Web Console',
      overview:
        'An intelligent enterprise diagnostics and natural-language outage reporting system for telecommunications engineering teams. The platform synthesizes billions of real-time cell-tower telemetry signals and uses autonomous Agentic AI to pinpoint outage root causes within seconds.',
      challenge:
        'Network operations engineers faced severe alert fatigue during regional disruptions, often triaging through thousands of simultaneous log alarms across conflicting monitoring dashboards to identify whether a failure was caused by fiber cuts, hardware degradation, or power anomalies.',
      solution:
        'Engineered an Agentic AI interface that converts complex cellular telemetry into plain-English incident summaries, automated root-cause probability trees, and interactive network map topologies. Engineers can converse naturally with the system to isolate issues and deploy remediation scripts.',
      deliverables: [
        'Conversational telemetry querying UX supporting natural language incident triage',
        'Real-time automated root-cause probability tree visualization and historical trend comparisons',
        'Multi-layer cellular node map interface with instant cell cluster degradation heatmaps',
        'Automated engineering escalation workflow and incident post-mortem generator'
      ]
    },
    altleads: {
      id: 'altleads',
      title: 'Altleads',
      category: 'CRM · B2B SaaS',
      badge: '03',
      image: '/assets/projects/altleads.jpg',
      role: 'UI/UX Designer',
      focus: 'B2B Sales Pipeline & Scheduling',
      work: 'Information Architecture · Kanban Boards · Funnel Analytics',
      platform: 'Cloud SaaS Web Application',
      overview:
        'Altleads is a modern, high-velocity CRM platform tailored for modern revenue teams. It integrates lead qualification, visual sales pipeline stages, integrated meeting scheduling, and deep funnel conversion reporting into an effortless, friction-free interface.',
      challenge:
        'Conventional enterprise CRMs are notorious for bloated navigation, sluggish data entry, and opaque sales pipeline views that force account executives into tedious spreadsheet workarounds.',
      solution:
        'Designed an intuitive, keyboard-first Kanban pipeline and drag-and-drop opportunity board with instant in-line editing, contextual activity timelines, and seamless Google/Outlook calendar synchronization.',
      deliverables: [
        'Dynamic multi-view sales pipeline with customizable stage gates and velocity indicators',
        'Context-aware lead dossier with aggregated communication logs, emails, and call recordings',
        'Automated demo scheduling wizard that synchronizes meeting availability across distributed teams',
        'Executive revenue forecast dashboard with cohort win/loss analysis'
      ]
    },
    dde: {
      id: 'dde',
      title: 'DDE Industrial Analytics',
      category: 'Industrial IoT · Analytics',
      badge: '04',
      image: '/assets/projects/dde.jpg',
      role: 'UX Engineer & UI Designer',
      focus: 'Industrial Machine Runtime & Alarms',
      work: 'Real-time Dashboards · Alarm Systems · Trend Visualizations',
      platform: 'Industrial Web & Ruggedized Tablets',
      overview:
        'A mission-critical industrial telemetry dashboard designed for factory floor managers and process engineers. It monitors machine runtime, predictive maintenance alerts, equipment downtime root causes, and multi-year historical operational trends in harsh manufacturing environments.',
      challenge:
        'Shop floor environments demand ultra-high legibility under variable lighting conditions, instant error recognition from several meters away, and rapid touch navigation on industrial-grade tablets.',
      solution:
        'Crafted a high-contrast, glanceable telemetry interface using standardized industrial alarm color codings, predictive downtime gauges, and responsive data visualizations that scale seamlessly from shop-floor touchscreen kiosks to engineering workstations.',
      deliverables: [
        'Industrial machine runtime telemetry gauges with Overall Equipment Effectiveness (OEE) metrics',
        'Predictive maintenance alarm dispatching system with clear severity hierarchies',
        'Interactive downtime pareto charts and historical trend comparative overlays',
        'High-contrast industrial display mode optimized for glare resilience and touchscreen usage'
      ]
    }
  };

  /* ==========================================================================
     THEME MANAGEMENT (Dark / Light Mode)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'pranav_portfolio_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : prefersDark ? 'dark' : 'light';
    applyTheme(initialTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }

    // Listen to OS preference changes if no manual override
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const sunIcon = toggleBtn.querySelector('.icon-sun');
      const moonIcon = toggleBtn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    }
  }

  /* ==========================================================================
     NAVIGATION & SCROLL BEHAVIOR
     ========================================================================== */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    // Scroll header compacting & scroll progress
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (header) {
        if (scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      updateScrollProgress();
    }, { passive: true });

    // Active Section Tracking via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));

    // Mobile Hamburger Drawer
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });

      // Close on link click
      const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMobileDrawer);
      });

      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          closeMobileDrawer();
        }
      });
    }

    function openMobileDrawer() {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('modal-open');
    }

    function closeMobileDrawer() {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('modal-open');
    }
  }

  /* ==========================================================================
     SCROLL PROGRESS & BACK TO TOP RING
     ========================================================================== */
  function updateScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const ringCircle = document.querySelector('.progress-ring-circle');

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (ringCircle) {
      const radius = ringCircle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (scrollPercent / 100) * circumference;
      ringCircle.style.strokeDashoffset = offset;
    }
  }

  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /* ==========================================================================
     COUNT-UP METRICS (Scroll-Triggered)
     ========================================================================== */
  function initMetricsCountUp() {
    const metricElements = document.querySelectorAll('.metric-value[data-target]');
    if (!metricElements.length) return;

    let hasCounted = false;
    const metricsSection = document.getElementById('metrics');

    if (!metricsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            metricElements.forEach((el) => {
              const target = parseFloat(el.getAttribute('data-target') || '0');
              const isDecimal = target % 1 !== 0;
              const duration = 1600;
              const startTime = performance.now();

              function animateNumber(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo curve
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = target * easeOut;

                if (isDecimal) {
                  el.textContent = current.toFixed(1);
                } else {
                  el.textContent = Math.floor(current).toString();
                }

                if (progress < 1) {
                  requestAnimationFrame(animateNumber);
                } else {
                  el.textContent = isDecimal ? target.toFixed(1) : target.toString();
                }
              }

              requestAnimationFrame(animateNumber);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsSection);
  }

  /* ==========================================================================
     HORIZONTAL PROJECT SHOWCASE SLIDER
     ========================================================================== */
  function initProjectCarousel() {
    const viewport = document.getElementById('work-viewport');
    const track = document.getElementById('work-track');
    const btnPrev = document.getElementById('work-prev');
    const btnNext = document.getElementById('work-next');
    const dotsContainer = document.getElementById('work-dots');
    const counterDisplay = document.getElementById('work-counter');

    if (!viewport || !track) return;

    const cards = track.querySelectorAll('.project-card');
    const totalCards = cards.length;

    // Generate pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('button');
        dot.className = `pagination-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Navigate to project ${i + 1}`);
        dot.addEventListener('click', () => {
          scrollToCardIndex(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateActiveState() {
      const scrollLeft = viewport.scrollLeft;
      const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 400; // 32px gap
      const activeIndex = Math.min(Math.round(scrollLeft / cardWidth), totalCards - 1);

      if (counterDisplay) {
        counterDisplay.textContent = `0${activeIndex + 1} / 0${totalCards}`;
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.pagination-dot');
        dots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }

    function scrollToCardIndex(index) {
      if (!cards[index]) return;
      const cardLeft = cards[index].offsetLeft - track.offsetLeft;
      viewport.scrollTo({
        left: cardLeft,
        behavior: 'smooth'
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 400;
        viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 400;
        viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    viewport.addEventListener('scroll', updateActiveState, { passive: true });

    // Mouse Dragging to Scroll
    let isDown = false;
    let startX = 0;
    let scrollStartLeft = 0;

    viewport.addEventListener('mousedown', (e) => {
      // Don't drag if clicking a button inside card
      if (e.target.closest('button') || e.target.closest('a')) return;
      isDown = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollStartLeft = viewport.scrollLeft;
    });

    viewport.addEventListener('mouseleave', () => {
      isDown = false;
    });

    viewport.addEventListener('mouseup', () => {
      isDown = false;
    });

    viewport.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5; // multiplier
      viewport.scrollLeft = scrollStartLeft - walk;
    });
  }

  /* ==========================================================================
     CASE STUDY MODAL
     ========================================================================== */
  function initCaseStudyModal() {
    const modal = document.getElementById('case-study-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modal) return;

    // Delegate open clicks from all "View Case Study" buttons & cards
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-case-study]');
      if (trigger) {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-case-study');
        openCaseStudy(projectId);
      }
    });

    function openCaseStudy(projectId) {
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      const modalCategory = document.getElementById('modal-category');
      const modalTitle = document.getElementById('modal-title');
      const modalImg = document.getElementById('modal-hero-img');
      const modalOverview = document.getElementById('modal-overview');
      const modalRole = document.getElementById('modal-role-val');
      const modalFocus = document.getElementById('modal-focus-val');
      const modalWork = document.getElementById('modal-work-val');
      const modalPlatform = document.getElementById('modal-platform-val');
      const modalDeliverables = document.getElementById('modal-deliverables');

      if (modalCategory) modalCategory.textContent = data.category;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalImg) {
        modalImg.src = data.image;
        modalImg.alt = `${data.title} UI preview`;
      }
      if (modalOverview) {
        modalOverview.innerHTML = `<strong>Overview:</strong> ${data.overview}<br><br><strong>Design Solution:</strong> ${data.solution}`;
      }
      if (modalRole) modalRole.textContent = data.role;
      if (modalFocus) modalFocus.textContent = data.focus;
      if (modalWork) modalWork.textContent = data.work;
      if (modalPlatform) modalPlatform.textContent = data.platform;

      if (modalDeliverables) {
        modalDeliverables.innerHTML = '';
        data.deliverables.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          modalDeliverables.appendChild(li);
        });
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     PROCESS TRACK LINE ANIMATION
     ========================================================================== */
  function initProcessTrackAnimation() {
    const processSection = document.getElementById('process');
    const progressBar = document.getElementById('process-track-progress');

    if (!processSection || !progressBar) return;

    window.addEventListener('scroll', () => {
      const rect = processSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalHeight = rect.height + windowHeight;
        const currentY = windowHeight - rect.top;
        const progress = Math.min(Math.max(currentY / totalHeight, 0), 1);
        progressBar.style.width = `${progress * 100}%`;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     FAQ ACCORDION (Single Open Item)
     ========================================================================== */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items
        faqItems.forEach((other) => {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  /* ==========================================================================
     CONTACT FORM (MAILTO INTEGRATION & FEEDBACK)
     ========================================================================== */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        alert('Please fill out all fields before sending.');
        return;
      }

      // Generate mailto link
      const recipient = 'pranavchoudhari01@gmail.com';
      const subject = encodeURIComponent(`Design Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Pranav,\n\n${message}\n\nFrom: ${name} (${email})`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      // Open mail client
      window.location.href = mailtoUrl;

      if (statusMsg) {
        statusMsg.classList.add('success');
        statusMsg.textContent = 'Enquiry draft opened in your email client. Thank you!';
        setTimeout(() => {
          statusMsg.classList.remove('success');
          form.reset();
        }, 6000);
      }
    });
  }

  /* ==========================================================================
     CUSTOM CURSOR (Desktop Only, Pointer Fine, Non-Reduced-Motion)
     ========================================================================== */
  function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorText = cursor ? cursor.querySelector('.custom-cursor-text') : null;

    // Guard against touch devices or reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!cursor || isTouch || prefersReducedMotion) {
      if (cursor) cursor.style.display = 'none';
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      // Lerp smoothing
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover States
    document.addEventListener('mouseover', (e) => {
      const projectCard = e.target.closest('.project-card');
      const imageFrame = e.target.closest('.portrait-card, .about-image-card, .workspace-setup-frame, .hero-portrait-stage, .hero-stage-portrait-cutout');
      const interactiveBtn = e.target.closest('button, a, .service-row, .faq-trigger, .hero-cta-button-pill, .hero-pill-opportunity');

      if (projectCard) {
        cursor.classList.add('active-project');
        if (cursorText) cursorText.textContent = 'VIEW CASE STUDY';
      } else if (imageFrame) {
        cursor.classList.add('active-image');
        if (cursorText) cursorText.textContent = 'EXPLORE ↗';
      } else if (interactiveBtn) {
        cursor.classList.add('active-hover');
        if (cursorText) cursorText.textContent = '';
      }
    });

    document.addEventListener('mouseout', (e) => {
      const projectCard = e.target.closest('.project-card');
      const imageFrame = e.target.closest('.portrait-card, .about-image-card, .workspace-setup-frame, .hero-portrait-stage, .hero-stage-portrait-cutout');
      const interactiveBtn = e.target.closest('button, a, .service-row, .faq-trigger, .hero-cta-button-pill, .hero-pill-opportunity');

      if (projectCard) {
        cursor.classList.remove('active-project');
        if (cursorText) cursorText.textContent = '';
      }
      if (imageFrame) {
        cursor.classList.remove('active-image');
        if (cursorText) cursorText.textContent = '';
      }
      if (interactiveBtn) {
        cursor.classList.remove('active-hover');
      }
    });
  }

  /* ==========================================================================
     TIMELINE SCROLL REVEAL
     ========================================================================== */
  function initTimelineReveal() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    timelineItems.forEach((item) => observer.observe(item));
  }

  /* ==========================================================================
     INITIALIZATION ON DOM CONTENT LOADED
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initBackToTop();
    initMetricsCountUp();
    initProjectCarousel();
    initCaseStudyModal();
    initProcessTrackAnimation();
    initFaqAccordion();
    initContactForm();
    initCustomCursor();
    initTimelineReveal();
  });
})();
