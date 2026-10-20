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
     START SCREEN: PORTFOLIO LOADING, LIGHTS ON & SCROLL SEQUENCE
     ========================================================================== */
  function initStartScreenLoaderAndSequence() {
    const loader = document.getElementById('stage-loader');
    const percentNum = document.getElementById('loader-percent-num');
    const progressBar = document.getElementById('loader-progress-fill');
    const statusMessage = document.getElementById('loader-status-message');
    const scrollTrack = document.getElementById('hero-scroll-track');
    const canvas = document.getElementById('hero-sequence-canvas');
    const portraitStage = document.getElementById('hero-portrait-stage');
    const scrollCue = document.getElementById('hero-scroll-cue');

    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const TOTAL_FRAMES = 241;
    const FRAME_BASE_PATH = 'assets/pngs/ezgif-frame-';
    const frameImages = new Array(TOTAL_FRAMES + 1);

    let loadedCount = 0;
    let frame1Loaded = false;
    let currentPercent = 0;
    let isStageLit = false;

    let targetFrame = 1;
    let renderedFrame = 1;
    let lastDrawnFrame = -1;

    // Lock scrolling while loading
    if (loader) {
      document.body.classList.add('loading-locked');
    }

    // Function to get image path for frame index 1..241
    function getFrameSrc(index) {
      const padded = String(index).padStart(3, '0');
      return `${FRAME_BASE_PATH}${padded}.png`;
    }

    // Helper to queue a single frame
    function loadFrame(idx) {
      if (idx < 1 || idx > TOTAL_FRAMES || frameImages[idx]) return;
      const img = new Image();
      img.src = getFrameSrc(idx);
      frameImages[idx] = img;
      img.onload = () => {
        loadedCount++;
      };
      img.onerror = () => {
        loadedCount++;
      };
    }

    // Responsive high-DPI canvas resizing for 100% full screen width
    function resizeCanvas() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round((window.innerWidth || canvas.clientWidth || 1920) * dpr);
      const targetH = Math.round((window.innerHeight || canvas.clientHeight || 1080) * dpr);

      if (targetW > 0 && targetH > 0 && (canvas.width !== targetW || canvas.height !== targetH)) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      // Redraw frame immediately on resize
      const frameToDraw = lastDrawnFrame > 0 ? lastDrawnFrame : 1;
      if (frameImages[frameToDraw] && frameImages[frameToDraw].complete) {
        drawFrame(frameToDraw);
      }
    }

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    // Draw frame onto canvas ensuring 100% width coverage
    function drawFrame(index) {
      let img = frameImages[index];

      // If requested frame is still buffering, locate the nearest loaded frame to prevent skipping/stalling
      if (!img || !img.complete || img.naturalWidth === 0) {
        let nearestImg = null;
        for (let offset = 1; offset <= 30; offset++) {
          const before = frameImages[index - offset];
          if (before && before.complete && before.naturalWidth > 0) {
            nearestImg = before;
            break;
          }
          const after = frameImages[index + offset];
          if (after && after.complete && after.naturalWidth > 0) {
            nearestImg = after;
            break;
          }
        }

        if (nearestImg) {
          img = nearestImg;
        } else if (frameImages[1] && frameImages[1].complete && frameImages[1].naturalWidth > 0) {
          img = frameImages[1];
        } else {
          return;
        }
      }

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      const canvasAspect = cw / ch;
      const imageAspect = iw / ih;

      let renderW, renderH, offsetX, offsetY;

      if (canvasAspect >= imageAspect) {
        // Wider canvas (desktop 16:9, ultrawide):
        // Span 100% full width of screen, center vertically
        renderW = cw;
        renderH = cw / imageAspect;
        offsetX = 0;
        offsetY = (ch - renderH) * 0.5;
      } else {
        // Taller canvas (laptop 16:10, tablet, mobile portrait):
        // Cover full height and center horizontally so barstool remains in center
        renderH = ch;
        renderW = ch * imageAspect;
        offsetX = (cw - renderW) * 0.5;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      lastDrawnFrame = index;
    }

    // Render loop for smooth 60fps lerp scrubbing
    function renderLoop() {
      if (isStageLit) {
        // Lerp for liquid smooth scrubbing
        renderedFrame += (targetFrame - renderedFrame) * 0.18;
        const frameIndex = Math.min(Math.max(Math.round(renderedFrame), 1), TOTAL_FRAMES);

        if (frameIndex !== lastDrawnFrame) {
          drawFrame(frameIndex);
        }
      }

      requestAnimationFrame(renderLoop);
    }

    // Update target frame based on scroll progress through #hero-scroll-track
    function handleScroll() {
      if (!scrollTrack || !isStageLit) return;

      const rect = scrollTrack.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const trackHeight = scrollTrack.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScrollDistance = trackHeight - windowHeight;

      if (maxScrollDistance <= 0) return;

      const currentScroll = window.scrollY - trackTop;
      const progress = Math.min(Math.max(currentScroll / maxScrollDistance, 0), 1);

      targetFrame = Math.min(Math.max(Math.floor(progress * (TOTAL_FRAMES - 1)) + 1, 1), TOTAL_FRAMES);

      // Dynamically prioritize loading frames around target scroll position
      for (let i = 0; i <= 5; i++) {
        loadFrame(targetFrame + i);
        loadFrame(targetFrame - i);
      }

      // Fade out scroll cue once user starts scrolling
      if (scrollCue) {
        if (progress > 0.04) {
          scrollCue.classList.add('faded');
        } else {
          scrollCue.classList.remove('faded');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preloading pipeline with progressive controlled queue
    function startPreloading() {
      // Step 1: Preload Frame 1 immediately (the starting frame)
      const frame1 = new Image();
      frame1.src = getFrameSrc(1);
      frameImages[1] = frame1;

      frame1.onload = () => {
        frame1Loaded = true;
        loadedCount++;
        resizeCanvas();
        drawFrame(1);
        if (portraitStage) portraitStage.classList.add('canvas-active');
      };
      frame1.onerror = () => {
        frame1Loaded = true;
        loadedCount++;
      };

      // Step 2: Preload key milestone frames to ensure instant response across full track
      const keyMilestones = [241, 120, 60, 180, 30, 90, 150, 210];
      keyMilestones.forEach(idx => loadFrame(idx));

      // Step 3: Stream remaining frames smoothly with controlled concurrency
      const CONCURRENCY = 6;
      let inFlight = 0;
      let nextIndex = 2;

      function pumpQueue() {
        while (inFlight < CONCURRENCY && nextIndex <= TOTAL_FRAMES) {
          const idx = nextIndex++;
          if (frameImages[idx]) continue; // Already loaded or queued

          inFlight++;
          const img = new Image();
          img.src = getFrameSrc(idx);
          frameImages[idx] = img;

          img.onload = () => {
            inFlight--;
            loadedCount++;
            pumpQueue();
          };
          img.onerror = () => {
            inFlight--;
            loadedCount++;
            pumpQueue();
          };
        }
      }

      // Start queue
      pumpQueue();
    }

    // Smooth UI percentage counter & lights-on trigger
    const startTime = performance.now();
    const MIN_LOAD_TIME = 1200; // 1.2s smooth studio loading feel
    const MAX_LOAD_TIME = 2200; // 2.2s guarantee

    function updateLoaderProgress(now) {
      if (!loader || isStageLit) return;

      const elapsed = now - startTime;
      const timeRatio = Math.min(elapsed / MIN_LOAD_TIME, 1);
      const frameRatio = Math.min(loadedCount / 12, 1);

      // Smooth progress calculation ramping toward 100%
      let targetP = Math.min(100, Math.max(timeRatio * 100, frameRatio * 85));

      // Ease currentPercent toward targetP
      currentPercent += (targetP - currentPercent) * 0.18;

      if ((currentPercent >= 98.2 && (frame1Loaded || elapsed >= 1000)) || elapsed >= MAX_LOAD_TIME) {
        currentPercent = 100;
      }

      const roundedPercent = Math.min(100, Math.round(currentPercent));

      if (percentNum) percentNum.textContent = roundedPercent;
      if (progressBar) progressBar.style.width = `${roundedPercent}%`;

      if (statusMessage) {
        if (roundedPercent < 35) {
          statusMessage.textContent = 'Calibrating studio lighting & optical stage...';
        } else if (roundedPercent < 75) {
          statusMessage.textContent = 'Buffering high-fidelity sequence frames...';
        } else if (roundedPercent < 100) {
          statusMessage.textContent = 'Finalizing presentation canvas...';
        } else {
          statusMessage.textContent = 'Portfolio Ready · Turning on studio lights...';
          statusMessage.classList.add('ready');
        }
      }

      // Check if loading complete (guaranteed 100% transition)
      if (roundedPercent >= 100) {
        if (percentNum) percentNum.textContent = '100';
        if (progressBar) progressBar.style.width = '100%';
        if (statusMessage) {
          statusMessage.textContent = 'Portfolio Ready · Turning on studio lights...';
          statusMessage.classList.add('ready');
        }

        // 180ms pause so user clearly sees 100% reached, then trigger lights on!
        setTimeout(() => {
          triggerLightsOn();
        }, 180);
        return;
      }

      requestAnimationFrame(updateLoaderProgress);
    }

    // "Then the lights turn on" cinematic sequence
    function triggerLightsOn() {
      if (isStageLit) return;
      isStageLit = true;

      // 1. Studio light ignition effect
      loader.classList.add('lights-on');

      // Ensure Frame 1 is rendered on the canvas
      resizeCanvas();
      drawFrame(1);
      if (portraitStage) portraitStage.classList.add('canvas-active');

      // 2. Play realistic studio light ignition & reveal stage
      setTimeout(() => {
        // Iris aperture bloom & dissolve loader
        loader.classList.add('stage-complete');
        document.body.classList.remove('loading-locked');

        // Check scroll position and render initial frame (Frame 1)
        handleScroll();
        resizeCanvas();
        drawFrame(1);

        // 3. Remove loader element after transition completes
        setTimeout(() => {
          loader.style.display = 'none';
          resizeCanvas();
          drawFrame(1);
        }, 800);
      }, 650);
    }

    // Start everything
    startPreloading();
    requestAnimationFrame(updateLoaderProgress);
    requestAnimationFrame(renderLoop);
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
    initStartScreenLoaderAndSequence();
  });
})();
