/* CrossTalk Global — Apple-style premium script
   Each page sets: const PAGE_DEPTH = N; before this file */
(function () {
  "use strict";

  var depth = typeof PAGE_DEPTH !== "undefined" ? PAGE_DEPTH : 0;
  var r = "../".repeat(depth);

  /* ── helpers ── */
  var $ = function(s,c){ return (c||document).querySelector(s); };
  var $$ = function(s,c){ return Array.from((c||document).querySelectorAll(s)); };
  function safe(fn, name) { try { fn(); } catch(e) { console.warn("["+name+"]",e); } }

  /* ══ Lucide icon SVGs (inline — key subset needed across site) ══ */
  var ICONS = {
    "users":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "globe":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    "repeat-2":      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/></svg>',
    "unlock":        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',
    "mic":           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    "radio":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>',
    "arrow-right":   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    "check":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
    "facebook":      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    "twitter":       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>',
    "youtube":       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>',
    "instagram":     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    "mail":          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    "graduation-cap":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
    "plane":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 3 16.5 4.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    "heart":         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    "book-open":     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    "map-pin":       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    "handshake":     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>'
  };

  /* ── Render icon ── */
  function icon(name, size) {
    var svg = ICONS[name] || ICONS["arrow-right"];
    var px = size || 20;
    return svg.replace("<svg", '<svg width="'+px+'" height="'+px+'" stroke-width="1.75" class="lucide"');
  }

  /* ── CrossTalk cross SVG (actual brand logo petals) ── */
  var CROSS_SVG = '<svg width="36" height="49" viewBox="0 0 420.14 571.93" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0" aria-hidden="true">'
    + '<path fill="#ced929" d="M250,0H170.2a28.51,28.51,0,0,0-28.52,28.51v71.68a28.52,28.52,0,0,0,13.92,24.5c6.21,3.7,19.4,6.89,23.51,12.84l31,57.93,31-57.93c4.12-5.95,17.31-9.14,23.51-12.84a28.5,28.5,0,0,0,13.92-24.5V28.51A28.5,28.5,0,0,0,250,0z"/>'
    + '<path fill="#62c2e6" d="M420.14,255.28V175.53A28.5,28.5,0,0,0,391.63,147H320a28.48,28.48,0,0,0-24.49,13.91c-3.71,6.21-6.9,19.4-12.84,23.52l-57.94,31,57.94,31c5.94,4.12,9.13,17.31,12.84,23.52A28.48,28.48,0,0,0,320,283.79h71.68A28.5,28.5,0,0,0,420.14,255.28z"/>'
    + '<path fill="#7dbf42" d="M0,255.28V175.53A28.5,28.5,0,0,1,28.51,147h71.68a28.51,28.51,0,0,1,24.5,13.91c3.7,6.21,6.89,19.4,12.84,23.52l57.93,31-57.93,31c-5.95,4.12-9.14,17.31-12.84,23.52a28.51,28.51,0,0,1-24.5,13.91H28.51A28.5,28.5,0,0,1,0,255.28z"/>'
    + '<path fill="#00a49b" d="M250,571.93H170.2a28.51,28.51,0,0,1-28.52-28.51V317.74a28.49,28.49,0,0,1,13.92-24.49c6.21-3.71,19.4-6.9,23.51-12.84l31-57.94,31,57.94c4.12,5.94,17.31,9.13,23.51,12.84a28.47,28.47,0,0,1,13.92,24.49V543.42A28.5,28.5,0,0,1,250,571.93z"/>'
    + '</svg>';

  /* ── Floating menu: per-letter roll markup (hover effect, CSS-driven) ── */
  function fmLetters(label) {
    return label.split("").map(function (ch, i) {
      var glyph = ch === " " ? "&nbsp;" : ch;
      return '<span class="fm-char"><span class="fm-char-col" style="transition-delay:' + (i * 28) + 'ms">'
        + '<span class="fm-char-row">' + glyph + '</span>'
        + '<span class="fm-char-row" aria-hidden="true">' + glyph + '</span>'
        + '</span></span>';
    }).join("");
  }
  function fmItemHTML(label, href) {
    return '<a class="fm-item" href="' + href + '"><span class="fm-item-inner">' + fmLetters(label) + '</span></a>';
  }
  function fmParentItemHTML(label, cat) {
    return '<button type="button" class="fm-item fm-item--parent" data-cat="' + cat + '">'
      + '<span class="fm-item-inner">' + fmLetters(label) + '</span>'
      + '<svg class="fm-item-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>'
      + '</button>';
  }

  /* ══════════════════════════════════════════
     NAV HTML
  ══════════════════════════════════════════ */
  function navHTML() {
    /* Nav links now live in the floating bottom menu (see fmItemHTML calls
       in footerHTML) — the header keeps only the logo. */
    return `
<header class="site-header" id="siteHeader">
  <div class="header-inner">
    <a href="${r}index.html" class="site-logo" aria-label="CrossTalk Global — Home">
      ${CROSS_SVG}
      <div>
        <div class="logo-org-name">CrossTalk Global</div>
        <div class="logo-tagline">Equipping biblical communicators worldwide</div>
      </div>
    </a>
  </div>
</header>`;
  }

  /* ══════════════════════════════════════════
     FOOTER HTML — footer.tsx minimal centered
  ══════════════════════════════════════════ */
  function footerHTML() {
    return `
<footer class="site-footer">
  <div class="container">
    <!-- Logo centered -->
    <div class="footer-center-logo">
      <svg width="28" height="38" viewBox="0 0 420.14 571.93" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill="#ced929" d="M250,0H170.2a28.51,28.51,0,0,0-28.52,28.51v71.68a28.52,28.52,0,0,0,13.92,24.5c6.21,3.7,19.4,6.89,23.51,12.84l31,57.93,31-57.93c4.12-5.95,17.31-9.14,23.51-12.84a28.5,28.5,0,0,0,13.92-24.5V28.51A28.5,28.5,0,0,0,250,0z"/>
        <path fill="#62c2e6" d="M420.14,255.28V175.53A28.5,28.5,0,0,0,391.63,147H320a28.48,28.48,0,0,0-24.49,13.91c-3.71,6.21-6.9,19.4-12.84,23.52l-57.94,31,57.94,31c5.94,4.12,9.13,17.31,12.84,23.52A28.48,28.48,0,0,0,320,283.79h71.68A28.5,28.5,0,0,0,420.14,255.28z"/>
        <path fill="#7dbf42" d="M0,255.28V175.53A28.5,28.5,0,0,1,28.51,147h71.68a28.51,28.51,0,0,1,24.5,13.91c3.7,6.21,6.89,19.4,12.84,23.52l57.93,31-57.93,31c-5.95,4.12-9.14,17.31-12.84,23.52a28.51,28.51,0,0,1-24.5,13.91H28.51A28.5,28.5,0,0,1,0,255.28z"/>
        <path fill="#00a49b" d="M250,571.93H170.2a28.51,28.51,0,0,1-28.52-28.51V317.74a28.49,28.49,0,0,1,13.92-24.49c6.21-3.71,19.4-6.9,23.51-12.84l31-57.94,31,57.94c4.12,5.94,17.31,9.13,23.51,12.84a28.47,28.47,0,0,1,13.92,24.49V543.42A28.5,28.5,0,0,1,250,571.93z"/>
      </svg>
      <div class="footer-brand-name">CrossTalk Global</div>
    </div>

    <!-- Nav links row -->
    <nav class="footer-nav-row" aria-label="Footer navigation">
      <a href="${r}why/index.html">Why CrossTalk</a>
      <a href="${r}what/our-goal/index.html">Our Goal</a>
      <a href="${r}what/our-strategy/index.html">Strategy</a>
      <a href="${r}what/our-results/index.html">Results</a>
      <a href="${r}who/executive-board/index.html">Leadership</a>
      <a href="${r}where/africa/index.html">Where</a>
      <a href="${r}seminars/index.html">Seminars</a>
      <a href="${r}give/index.html">Give</a>
    </nav>

    <!-- Social icons row -->
    <div class="footer-social-row">
      <a href="https://www.facebook.com/CrossTalkGlobal" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook",16)}</a>
      <a href="https://twitter.com/CrossTalkGlobal" target="_blank" rel="noopener" aria-label="Twitter">${icon("twitter",16)}</a>
      <a href="https://www.youtube.com/@CrossTalkGlobal" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube",16)}</a>
      <a href="https://www.instagram.com/crossTalkglobal" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram",16)}</a>
      <a href="mailto:crosstalk@crosstalkglobal.com" aria-label="Email">${icon("mail",16)}</a>
    </div>

    <!-- Newsletter inline -->
    <div class="footer-nl-row">
      <form class="footer-nl-inline" onsubmit="return false;" aria-label="Newsletter signup">
        <input type="email" placeholder="Your email address" aria-label="Email">
        <button type="submit">Subscribe</button>
      </form>
    </div>

    <!-- Copyright -->
    <p class="footer-copyright">
      &copy; 2026 CrossTalk Global &nbsp;&middot;&nbsp; 501(c)(3) &nbsp;&middot;&nbsp; EIN #46-3978221
      &nbsp;&middot;&nbsp; P.O. Box 2068, Yorba Linda CA 92885
      &nbsp;&middot;&nbsp; <a href="#">Privacy Policy</a>
    </p>
  </div>
</footer>

<!-- Podcast floating widget — present on every page -->
<div class="podcast-widget" id="podcastWidget" role="complementary" aria-label="CrossTalk Podcast">
  <div class="podcast-badge" id="podcastBadge">
    <span class="pb-dot"></span>
    <span class="pb-label">New Episode Available</span>
  </div>
  <a href="https://www.youtube.com/@CrossTalkGlobal" target="_blank" rel="noopener"
     class="podcast-btn" aria-label="Listen to CrossTalk Podcast" title="CrossTalk Podcast">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.75" style="position:relative;z-index:1">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
    </svg>
  </a>
</div>

<!-- Floating liquid-morph menu — present on every page -->
<div class="fm-shell" id="fmShell" role="navigation" aria-label="Quick menu">
  <div class="fm-bg"></div>
  <div class="fm-morph"></div>
  <div class="fm-panel" id="fmPanel">
    <div class="fm-root is-active" id="fmRoot">
      ${fmItemHTML("Why?", r + "why/index.html")}
      ${fmParentItemHTML("What?", "what")}
      ${fmParentItemHTML("Who?", "who")}
      ${fmParentItemHTML("Where?", "where")}
      ${fmParentItemHTML("How?", "how")}
      ${fmItemHTML("Give", r + "give/index.html")}
    </div>

    <div class="fm-sub" data-sub="what">
      <button type="button" class="fm-back">&lsaquo; Back</button>
      <a href="${r}what/our-goal/index.html">Our Goal</a>
      <a href="${r}what/our-beliefs-convictions/index.html">Beliefs &amp; Convictions</a>
      <a href="${r}what/our-strategy/index.html">Our Strategy</a>
      <a href="${r}what/our-results/index.html">Our Results</a>
    </div>
    <div class="fm-sub" data-sub="who">
      <button type="button" class="fm-back">&lsaquo; Back</button>
      <a href="${r}who/kent-edwards/index.html">J. Kent Edwards — Founder</a>
      <a href="${r}who/executive-board/index.html">Executive Board</a>
    </div>
    <div class="fm-sub" data-sub="where">
      <button type="button" class="fm-back">&lsaquo; Back</button>
      <a href="${r}where/africa/index.html">Africa</a>
      <a href="${r}where/america/index.html">America</a>
      <a href="${r}where/eastern-europe/index.html">Eastern Europe</a>
      <a href="${r}where/india/index.html">India</a>
      <a href="${r}where/latin-america/index.html">Latin America</a>
      <a href="${r}where/vietnam/index.html">Vietnam</a>
      <a href="${r}seminars/index.html">Seminars</a>
    </div>
    <div class="fm-sub" data-sub="how">
      <button type="button" class="fm-back">&lsaquo; Back</button>
      <a href="${r}how/come-to-my-culture/index.html">Come to My Culture</a>
      <a href="${r}how/be-a-student/index.html">Be a Student</a>
      <a href="${r}how/learn-more/index.html">Can I Learn More?</a>
      <a href="${r}how/help-teach/index.html">Help Teach</a>
      <a href="${r}how/support-crosstalk/index.html">Support CrossTalk</a>
    </div>
  </div>
  <div class="fm-bar" id="fmBar" role="button" tabindex="0" aria-expanded="false" aria-label="Toggle quick menu">
    <span class="fm-bar-label">Menu</span>
    <span class="fm-burger" aria-hidden="true">
      <span class="fm-burger-line fm-burger-line--1"></span>
      <span class="fm-burger-line fm-burger-line--2"></span>
    </span>
  </div>
</div>`;
  }

  /* ══ INJECT ══ */
  document.body.insertAdjacentHTML("afterbegin", navHTML());
  document.body.insertAdjacentHTML("beforeend", footerHTML());

  /* ══════════════════════════════════════════
     SCROLL-BASED NAV
  ══════════════════════════════════════════ */
  function initScrollNav() {
    var header = $("#siteHeader");
    if (!header) return;

    /* Header stays transparent (white text) while dark sections are behind it,
       then turns solid. Homepage: hero+confront are dark, stat-band is first light
       block. Inner pages: dark page-banner/hero then light content. */
    function getThreshold() {
      var ref = $(".stat-band") || $(".page-banner") || $(".region-hero") || $(".hero");
      if (ref) return ref.offsetTop + ref.offsetHeight - header.offsetHeight - 8;
      return 80; /* light-first pages: go solid almost immediately */
    }

    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > getThreshold());
      ticking = false;
    }
    window.addEventListener("scroll", function() {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════
     MOBILE NAV
  ══════════════════════════════════════════ */
  function initNav() {
    var toggle = $("#navToggle");
    var nav    = $("#mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function() {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$(".has-dropdown").forEach(function(item) {
      var link = item.querySelector(".nav-link");
      if (!link) return;
      link.addEventListener("click", function(e) {
        if (window.innerWidth < 960) { e.preventDefault(); item.classList.toggle("open"); }
      });
    });
    document.addEventListener("click", function(e) {
      if (!nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
        nav.classList.remove("open"); toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded","false"); document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        nav.classList.remove("open"); toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded","false"); document.body.style.overflow = "";
      }
    });
  }

  /* ══════════════════════════════════════════
     SCROLL REVEALS — staggered
  ══════════════════════════════════════════ */
  function initReveals() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });
    $$("[data-reveal]").forEach(function(el) { io.observe(el); });
    $$(".regions-grid, .pillars-grid, .card-grid, .team-grid, .giving-options, .feature-bullets").forEach(function(grid) {
      Array.from(grid.children).forEach(function(child, i) {
        if (!child.hasAttribute("data-reveal")) {
          child.setAttribute("data-reveal","");
          child.setAttribute("data-delay", Math.min(i+1, 6));
          io.observe(child);
        }
      });
    });
    setTimeout(function() {
      $$("[data-reveal]:not(.is-revealed)").forEach(function(el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ══════════════════════════════════════════
     COUNTER ANIMATION
  ══════════════════════════════════════════ */
  function initCounters() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute("data-count-to"), 10);
        var start = performance.now();
        io.unobserve(el);
        (function tick(now) {
          var t = Math.min((now - start) / 1600, 1);
          el.textContent = Math.round((1 - Math.pow(1-t, 3)) * target);
          if (t < 1) requestAnimationFrame(tick); else el.textContent = target;
        })(performance.now());
      });
    }, { threshold: 0.5 });
    $$("[data-count-to]").forEach(function(el) { io.observe(el); });
  }

  /* ══════════════════════════════════════════
     HERO PARALLAX
  ══════════════════════════════════════════ */
  function initParallax() {
    var heroBg = $(".hero-bg");
    if (!heroBg) return;
    var ticking = false;
    window.addEventListener("scroll", function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          heroBg.style.transform = "translateY("+window.scrollY*0.35+"px) scale(1.1)";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     CINEMATIC 3D PARALLAX on confront section
  ══════════════════════════════════════════ */
  function initConfrontParallax() {
    var section = $(".section-confront");
    var inner = $(".confront-perspective-inner");
    if (!section || !inner) return;
    var ticking = false;
    window.addEventListener("scroll", function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          var rect = section.getBoundingClientRect();
          var progress = -rect.top / window.innerHeight;
          if (progress < -0.2 || progress > 1.3) { ticking = false; return; }
          var rotX = Math.max(-6, Math.min(6, progress * 10 - 3));
          var ty   = Math.max(-30, Math.min(20, progress * 40 - 20));
          inner.style.transform = "rotateX("+rotX+"deg) translateY("+ty+"px)";
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     MAGNETIC BUTTONS
     While actively tracking the pointer, transitions must be OFF — a CSS
     transition fighting a value that changes on every mousemove is what
     produces the "vibrating" jitter instead of a smooth follow. Only the
     release (mouseleave) gets an eased spring back to rest.
  ══════════════════════════════════════════ */
  /* Removed: the old "magnetic" effect had buttons chase the cursor by
     rewriting `transform` on every mousemove. Following the pointer
     per-frame is inherently unsteady — it reads as wobbling, and it also
     fought the CSS hover transition. Button hover is now pure CSS (see the
     .btn rules), which stays smooth and needs no JS. */

  /* ══════════════════════════════════════════
     SMOOTH SCROLL
  ══════════════════════════════════════════ */
  function initSmoothScroll() {
    document.addEventListener("click", function(e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
    });
  }

  /* ══════════════════════════════════════════
     PODCAST WIDGET
  ══════════════════════════════════════════ */
  function initPodcastWidget() {
    var widget = $("#podcastWidget");
    var badge  = $("#podcastBadge");
    if (!widget) return;

    /* Show widget after hero/confront section passes */
    var trigger = $(".section-confront") || $(".stat-band") || $(".hero");
    if (trigger) {
      var io = new IntersectionObserver(function(entries) {
        if (!entries[0].isIntersecting) widget.classList.add("pw-visible");
      }, { threshold: 0 });
      io.observe(trigger);
    } else {
      setTimeout(function() { widget.classList.add("pw-visible"); }, 2000);
    }

    /* Detect light vs dark section under the widget — switch badge style */
    var LIGHT_SELECTORS = ".section--light, .section--gray, .gfc-section, .globe-section ~ *, .features2-section";
    function checkBackground() {
      /* Widget is fixed bottom-right — check what element is at that position */
      var wx = window.innerWidth - 60;
      var wy = window.innerHeight - 60;
      var el = document.elementFromPoint(wx, wy);
      if (!el) return;
      /* Walk up to find a section with known background */
      var node = el;
      var onLight = false;
      while (node && node !== document.body) {
        var bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          /* Parse rgb values */
          var m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            var lum = (parseInt(m[1])*0.299 + parseInt(m[2])*0.587 + parseInt(m[3])*0.114);
            onLight = lum > 128;
            break;
          }
        }
        node = node.parentElement;
      }
      widget.classList.toggle("pw-on-light", onLight);
    }
    window.addEventListener("scroll", checkBackground, { passive: true });
    checkBackground();

    /* Periodic badge pulse — appears every ~12s */
    if (badge) {
      function showBadge() {
        badge.classList.add("pb-show");
        setTimeout(function() { badge.classList.remove("pb-show"); }, 4000);
      }
      setTimeout(function() { showBadge(); setInterval(showBadge, 12000); }, 5000);
    }
  }

  /* ══════════════════════════════════════════
     3D GLOBE — wireframe/dotted orthographic globe (d3-geo), rendered on
     a 2D canvas. Rotates by dragging with mouse OR touch (no button
     controls) and shows clickable, labeled pins for every CrossTalk region.
  ══════════════════════════════════════════ */
  function initGlobe() {
    var canvas = document.getElementById("globeCanvas");
    if (!canvas) return;
    var markersWrap = document.getElementById("globeMarkers");
    var hint = document.getElementById("globeHint");

    /* Coordinates match the exact lat/lng each region page already uses for
       its own Leaflet map (where/.../index.html data-map), so the globe pins
       land on the real cities, not approximations. */
    var MARKERS = [
      { lat: -4.0435, lng:   39.6682, name: "Africa — Mombasa, Kenya",           href: "where/africa/index.html" },
      { lat: 28.6139, lng:   77.209,  name: "India — New Delhi",                 href: "where/india/index.html" },
      { lat: 21.0278, lng:  105.8342, name: "Vietnam — Hanoi",                   href: "where/vietnam/index.html" },
      { lat: 23.1136, lng:  -82.3666, name: "Latin America — Havana, Cuba",      href: "where/latin-america/index.html" },
      { lat: 23.0411, lng:  -81.5775, name: "Latin America — Matanzas, Cuba",    href: "where/latin-america/index.html" },
      { lat:  8.9824, lng:  -79.5199, name: "Latin America — Panama City",       href: "where/latin-america/index.html" },
      { lat: 47.1585, lng:   27.6014, name: "Eastern Europe — Iași, Romania",    href: "where/eastern-europe/index.html" },
      { lat: 48.2917, lng:   25.9352, name: "Eastern Europe — Chernivtsi, Ukraine", href: "where/eastern-europe/index.html" },
      { lat: 47.0465, lng:   21.9189, name: "Eastern Europe — Oradea, Romania",  href: "where/eastern-europe/index.html" },
      { lat: 33.8886, lng: -117.8131, name: "America — HQ, Yorba Linda",        href: "where/america/index.html" }
    ];

    var width = 0, height = 0, baseRadius = 0, zoom = 1;
    var rotation = [-18, -12];       /* [yaw, pitch] in degrees */
    var autoRotate = true;
    var ctx, projection, path, graticule;
    var landFeatures = null, allDots = [];
    var markerEls = [];
    var rafId = null;

    function buildMarkerDom() {
      if (!markersWrap) return;
      MARKERS.forEach(function (m) {
        var a = document.createElement("a");
        a.className = "globe-marker";
        a.href = r + m.href;
        a.innerHTML = '<span class="globe-marker-dot"></span><span class="globe-marker-label">' + m.name + '</span>';
        markersWrap.appendChild(a);
        markerEls.push(a);
      });
    }

    function sizeCanvas() {
      var wrap = canvas.parentElement;
      var s = Math.min(wrap.getBoundingClientRect().width || 460, 480);
      width = height = s;
      baseRadius = s / 2.5;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (projection) {
        projection.scale(baseRadius * zoom).translate([width / 2, height / 2]);
      }
    }

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      var currentScale = projection.scale();
      var sf = currentScale / baseRadius;

      /* sphere */
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, currentScale, 0, Math.PI * 2);
      var grad = ctx.createRadialGradient(
        width * 0.36, height * 0.32, currentScale * 0.05,
        width / 2, height / 2, currentScale
      );
      grad.addColorStop(0, "#0f2a35");
      grad.addColorStop(1, "#03080d");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1.25 * sf;
      ctx.stroke();

      if (landFeatures) {
        ctx.beginPath();
        path(graticule());
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.lineWidth = 1 * sf;
        ctx.stroke();

        ctx.beginPath();
        landFeatures.features.forEach(function (f) { path(f); });
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 1.1 * sf;
        ctx.stroke();

        /* Cull dots on the far hemisphere at (almost exactly) the same
           angle the outline itself clips at — clipAngle(90) on the
           projection. Using a visibly looser threshold here (as before)
           let the dot fill drift away from the coastline stroke near the
           limb of the sphere; matching them keeps the halftone texture
           sitting right on the outline instead of "corrido" (shifted). */
        var center = [-rotation[0], -rotation[1]];
        var CLIP = Math.PI / 2 - 0.02;
        ctx.fillStyle = "#26d9c9";
        for (var i = 0; i < allDots.length; i++) {
          var d = allDots[i];
          if (window.d3.geoDistance([d.lng, d.lat], center) > CLIP) continue;
          var p = projection([d.lng, d.lat]);
          if (!p) continue;
          ctx.beginPath();
          ctx.arc(p[0], p[1], 1.15 * sf, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function updateMarkers() {
      if (!projection) return;
      var center = [-rotation[0], -rotation[1]];
      MARKERS.forEach(function (m, i) {
        var el = markerEls[i];
        if (!el) return;
        var visible = window.d3.geoDistance([m.lng, m.lat], center) < 1.4;
        var p = projection([m.lng, m.lat]);
        if (p) { el.style.left = p[0] + "px"; el.style.top = p[1] + "px"; }
        el.classList.toggle("is-visible", visible);
      });
    }

    function loop() {
      if (autoRotate) {
        rotation[0] += 0.045;
        projection.rotate(rotation);
      }
      render();
      updateMarkers();
      rafId = requestAnimationFrame(loop);
    }

    /* ── point-in-polygon dot fill (translated from the supplied wireframe-
       dotted-globe component — unchanged algorithm, just de-typed) ── */
    function pointInPolygon(point, polygon) {
      var x = point[0], y = point[1], inside = false;
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];
        if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    }
    function pointInFeature(point, feature) {
      var geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        var coords = geometry.coordinates;
        if (!pointInPolygon(point, coords[0])) return false;
        for (var i = 1; i < coords.length; i++) if (pointInPolygon(point, coords[i])) return false;
        return true;
      }
      if (geometry.type === "MultiPolygon") {
        for (var p = 0; p < geometry.coordinates.length; p++) {
          var polygon = geometry.coordinates[p];
          if (pointInPolygon(point, polygon[0])) {
            var inHole = false;
            for (var h = 1; h < polygon.length; h++) if (pointInPolygon(point, polygon[h])) { inHole = true; break; }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    }
    function generateDotsInPolygon(feature, dotSpacing) {
      var dots = [];
      var bounds = window.d3.geoBounds(feature);
      var minLng = bounds[0][0], minLat = bounds[0][1], maxLng = bounds[1][0], maxLat = bounds[1][1];
      var step = dotSpacing * 0.08;
      for (var lng = minLng; lng <= maxLng; lng += step) {
        for (var lat = minLat; lat <= maxLat; lat += step) {
          if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
        }
      }
      return dots;
    }

    function loadLand() {
      fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
        .then(function (res) { if (!res.ok) throw new Error("land fetch failed"); return res.json(); })
        .then(function (json) {
          landFeatures = json;
          var dots = [];
          json.features.forEach(function (f) {
            generateDotsInPolygon(f, 11).forEach(function (pt) { dots.push({ lng: pt[0], lat: pt[1] }); });
          });
          allDots = dots;
        })
        .catch(function (err) { console.warn("[globe] land data failed to load:", err); });
    }

    /* ── drag to spin — mouse ── */
    function hideHint() { if (hint) hint.classList.add("is-hidden"); }
    function onMouseDown(e) {
      hideHint();
      autoRotate = false;
      var startX = e.clientX, startY = e.clientY, startRot = rotation.slice();
      function onMove(ev) {
        var dx = ev.clientX - startX, dy = ev.clientY - startY;
        rotation[0] = startRot[0] + dx * 0.5;
        rotation[1] = Math.max(-90, Math.min(90, startRot[1] - dy * 0.5));
        projection.rotate(rotation);
      }
      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setTimeout(function () { autoRotate = true; }, 10);
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    }

    /* ── drag to spin / pinch to zoom — touch ── */
    var touchStartRot = null, touchStartXY = null, pinchStartDist = null, pinchStartZoom = null;
    function touchDist(touches) {
      var dx = touches[0].clientX - touches[1].clientX;
      var dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    function onTouchStart(e) {
      hideHint();
      autoRotate = false;
      if (e.touches.length === 2) {
        pinchStartDist = touchDist(e.touches);
        pinchStartZoom = zoom;
      } else {
        touchStartXY = [e.touches[0].clientX, e.touches[0].clientY];
        touchStartRot = rotation.slice();
      }
    }
    function onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length === 2 && pinchStartDist) {
        var dist = touchDist(e.touches);
        zoom = Math.max(0.6, Math.min(2.4, pinchStartZoom * (dist / pinchStartDist)));
        projection.scale(baseRadius * zoom);
      } else if (touchStartXY) {
        var dx = e.touches[0].clientX - touchStartXY[0];
        var dy = e.touches[0].clientY - touchStartXY[1];
        rotation[0] = touchStartRot[0] + dx * 0.5;
        rotation[1] = Math.max(-90, Math.min(90, touchStartRot[1] - dy * 0.5));
        projection.rotate(rotation);
      }
    }
    function onTouchEnd(e) {
      if (e.touches.length === 0) {
        touchStartXY = null; pinchStartDist = null;
        setTimeout(function () { autoRotate = true; }, 10);
      }
    }

    /* ── mouse wheel to zoom ── */
    function onWheel(e) {
      e.preventDefault();
      var factor = e.deltaY > 0 ? 0.9 : 1.1;
      zoom = Math.max(0.6, Math.min(2.4, zoom * factor));
      projection.scale(baseRadius * zoom);
    }

    function build() {
      var d3lib = window.d3;
      sizeCanvas();
      projection = d3lib.geoOrthographic().clipAngle(90)
        .scale(baseRadius * zoom).translate([width / 2, height / 2])
        .rotate(rotation);
      path = d3lib.geoPath().projection(projection).context(ctx);
      graticule = d3lib.geoGraticule();

      buildMarkerDom();
      loadLand();

      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("touchstart", onTouchStart, { passive: true });
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });
      canvas.addEventListener("touchend", onTouchEnd);
      canvas.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("resize", sizeCanvas);

      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 1s ease";
      requestAnimationFrame(function () { canvas.style.opacity = "1"; });

      loop();
    }

    /* Pause the render loop when off-screen or the tab is hidden. */
    function pause() { if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; } }
    function resume() { if (rafId == null && projection) loop(); }
    if ("IntersectionObserver" in window) {
      var visIO = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) resume(); else pause();
      }, { threshold: 0.05 });
      visIO.observe(canvas);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) pause(); else resume();
    });

    function ensureD3(cb) {
      if (window.d3) { cb(); return; }
      var s = document.createElement("script");
      s.src = "https://unpkg.com/d3@7/dist/d3.min.js";
      s.onload = cb;
      s.onerror = function () {
        console.warn("[globe] d3 failed to load — showing static fallback");
        var c = canvas.getContext("2d");
        sizeCanvasFallback(c);
      };
      document.head.appendChild(s);
    }
    function sizeCanvasFallback(c) {
      var wrap = canvas.parentElement;
      var s = Math.min(wrap.getBoundingClientRect().width || 460, 480);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = s * dpr; canvas.height = s * dpr;
      canvas.style.width = canvas.style.height = s + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var g = c.createRadialGradient(s * 0.4, s * 0.4, 10, s * 0.5, s * 0.5, s * 0.5);
      g.addColorStop(0, "#0d3b38"); g.addColorStop(1, "#0a1622");
      c.fillStyle = g; c.beginPath();
      c.arc(s / 2, s / 2, s * 0.46, 0, Math.PI * 2); c.fill();
    }

    /* Load d3 + build only when the globe scrolls into view. */
    function load() { ensureD3(build); }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); load(); }
      }, { threshold: 0.1 });
      io.observe(canvas);
    } else {
      load();
    }
  }

  /* ══════════════════════════════════════════
     HERO CHROME — the header only belongs to the hero. Once it scrolls
     past, the header eases out and the floating bottom menu eases in to
     take over as the persistent nav (and vice versa scrolling back up).
  ══════════════════════════════════════════ */
  function initHeroChrome() {
    var header = $("#siteHeader");
    var fm = $("#fmShell");
    if (!header) return;
    var heroEl = $(".hero") || $(".page-banner") || $(".region-hero");
    if (!heroEl) { if (fm) fm.classList.add("is-visible"); return; }

    /* On the homepage the cinematic "confront" section immediately follows
       the hero and has its own centered CTAs — the fixed floating menu
       sitting at the bottom-center of the viewport could otherwise land
       right on top of those buttons and steal the click. Treat hero +
       confront as one continuous "opening" chrome zone: header stays,
       floating menu stays hidden, until the whole thing has scrolled past. */
    var confrontEl = $(".section-confront");
    var chromeEnd = confrontEl || heroEl;

    var ticking = false;
    function update() {
      var pastHero = window.scrollY > (chromeEnd.offsetTop + chromeEnd.offsetHeight - 60);
      header.classList.toggle("is-hero-hidden", pastHero);
      if (fm) fm.classList.toggle("is-visible", pastHero);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ══════════════════════════════════════════
     FLOATING MENU — liquid-morph pill (bottom-center, all pages)
  ══════════════════════════════════════════ */
  function initFloatingMenu() {
    var shell = $("#fmShell");
    var bar = $("#fmBar");
    if (!shell) return;
    var podcast = $("#podcastWidget");
    var root = $("#fmRoot");
    var subEls = $$(".fm-sub", shell);

    function showRoot() {
      if (root) root.classList.add("is-active");
      subEls.forEach(function (s) { s.classList.remove("is-active"); });
    }
    function showSub(cat) {
      if (root) root.classList.remove("is-active");
      subEls.forEach(function (s) { s.classList.toggle("is-active", s.getAttribute("data-sub") === cat); });
    }
    $$(".fm-item--parent", shell).forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        showSub(btn.getAttribute("data-cat"));
      });
    });
    $$(".fm-back", shell).forEach(function (btn) {
      btn.addEventListener("click", function (e) { e.stopPropagation(); showRoot(); });
    });

    function setOpen(open) {
      shell.classList.toggle("is-open", open);
      if (bar) bar.setAttribute("aria-expanded", open ? "true" : "false");
      /* On narrow screens the open panel (up to 290px, centered) can reach
         the podcast widget in the bottom-right corner — step it out of the
         way rather than let the two overlap. */
      if (podcast) podcast.classList.toggle("pw-menu-open", open);
      if (!open) showRoot(); /* always reopen at the top level */
    }
    function isOpen() { return shell.classList.contains("is-open"); }

    shell.addEventListener("click", function () {
      if (!isOpen()) setOpen(true);
    });
    if (bar) {
      bar.addEventListener("click", function (e) {
        e.stopPropagation();
        setOpen(!isOpen());
      });
      bar.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(!isOpen()); }
      });
    }
    document.addEventListener("mousedown", function (e) {
      if (isOpen() && !shell.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) setOpen(false);
    });

    /* The footer's own centered content (newsletter form, copyright) sits
       at the same bottom-center spot as this fixed pill — step the menu
       aside once the footer scrolls into view so it never covers it. */
    var footer = $(".site-footer");
    if (footer && "IntersectionObserver" in window) {
      var footIO = new IntersectionObserver(function (entries) {
        var nearFooter = entries[0].isIntersecting;
        if (nearFooter) setOpen(false);
        shell.classList.toggle("fm-clear", nearFooter);
      }, { threshold: 0.12 });
      footIO.observe(footer);
    }
  }

  /* ══════════════════════════════════════════
     AMOUNT SLIDER — give/index.html custom donation picker
     Stepped $10 → $10,000+, snaps to sensible round amounts (mirrors the
     "magnetic stops" behavior of the supplied amount-slider component).
  ══════════════════════════════════════════ */
  function initAmountSlider() {
    var slider = $("#amountSlider");
    if (!slider) return;
    var valueEl  = $("#amountValue");
    var suffixEl = $("#amountSuffix");
    var cta      = $("#amountCta");
    var toggleBtns = $$(".amount-toggle-btn");
    var thumb    = $(".amount-toggle-thumb");

    var input = $("#amountInput");
    var STOPS = [10, 25, 50, 75, 100, 150, 200, 300, 500, 750, 1000, 1500, 2500, 5000, 7500, 10000];
    var MAX_STOP = STOPS[STOPS.length - 1];
    var freq = "monthly";
    /* The typed amount wins when present, so a donor can give any exact
       figure (including above the slider's ceiling) instead of being
       limited to the slider's preset stops. */
    var customAmount = null;

    function currentAmount() {
      return customAmount != null ? customAmount : STOPS[+slider.value];
    }
    function fmt(n) {
      return "$" + n.toLocaleString("en-US") + (customAmount == null && n === MAX_STOP ? "+" : "");
    }

    function render() {
      var amount = currentAmount();
      slider.style.setProperty("--fill", (slider.value / (STOPS.length - 1) * 100) + "%");
      if (valueEl) {
        valueEl.textContent = fmt(amount);
        valueEl.classList.remove("is-bump");
        void valueEl.offsetWidth; /* restart the CSS transition every snap */
        valueEl.classList.add("is-bump");
      }
      if (suffixEl) suffixEl.textContent = freq === "monthly" ? "/ month" : "one-time";
      if (cta) cta.textContent = "Give " + fmt(amount) + (freq === "monthly" ? " Monthly" : " Once");
    }

    slider.addEventListener("input", function () {
      /* Dragging the slider takes over again from a typed amount. */
      customAmount = null;
      if (input) input.value = "";
      render();
    });

    if (input) {
      input.addEventListener("input", function () {
        var digits = input.value.replace(/[^\d]/g, "").slice(0, 7);
        input.value = digits ? (+digits).toLocaleString("en-US") : "";
        customAmount = digits ? +digits : null;
        /* Keep the slider roughly in sync so the track still reads sensibly. */
        if (customAmount != null) {
          var nearest = 0;
          for (var i = 0; i < STOPS.length; i++) {
            if (Math.abs(STOPS[i] - customAmount) < Math.abs(STOPS[nearest] - customAmount)) nearest = i;
          }
          slider.value = nearest;
        }
        render();
      });
      input.addEventListener("blur", function () {
        if (customAmount != null && customAmount < 1) {
          customAmount = null; input.value = ""; render();
        }
      });
    }

    toggleBtns.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        toggleBtns.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        freq = btn.getAttribute("data-freq");
        if (thumb) thumb.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
        render();
      });
    });

    render();
  }

  /* ══════════════════════════════════════════
     INTERACTIVE MAPS — Leaflet (region pages)
  ══════════════════════════════════════════ */
  function initRegionMaps() {
    var maps = $$(".region-map[data-map]");
    if (!maps.length) return;

    /* Inject Leaflet CSS once */
    if (!document.getElementById("leaflet-css")) {
      var link = document.createElement("link");
      link.id = "leaflet-css"; link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    function buildMap(el) {
      var cfg;
      try { cfg = JSON.parse(el.getAttribute("data-map")); } catch (e) { return; }

      var map = L.map(el, {
        center: cfg.center, zoom: cfg.zoom,
        scrollWheelZoom: false,   /* don't hijack page scroll */
        zoomControl: true,
        attributionControl: true
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: "abcd", maxZoom: 19
      }).addTo(map);

      var icon = L.divIcon({
        className: "ct-marker",
        html: '<span class="ct-marker-dot"></span>',
        iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -10]
      });

      var pts = [];
      cfg.markers.forEach(function (m) {
        L.marker(m.coords, { icon: icon }).addTo(map)
          .bindPopup('<strong>' + m.name + '</strong><br>' + m.info);
        pts.push(m.coords);
      });
      if (pts.length > 1) map.fitBounds(pts, { padding: [50, 50], maxZoom: 7 });

      /* re-measure once visible (container animates in via data-reveal) */
      var fix = function () { map.invalidateSize(); };
      setTimeout(fix, 300); setTimeout(fix, 900);
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (e) {
          if (e[0].isIntersecting) { fix(); io.disconnect(); }
        }, { threshold: 0.05 });
        io.observe(el);
      }
    }

    function ready() { maps.forEach(buildMap); }

    if (window.L) { ready(); return; }
    var s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.onload = ready;
    s.onerror = function () {
      maps.forEach(function (m) {
        m.classList.add("region-map--down");
        m.innerHTML = '<span>Interactive map needs an internet connection.</span>';
      });
    };
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════
     BOOT
  ══════════════════════════════════════════ */
  function boot() {
    safe(initScrollNav,        "scrollNav");
    safe(initNav,              "nav");
    safe(initReveals,          "reveals");
    safe(initCounters,         "counters");
    safe(initParallax,         "parallax");
    safe(initConfrontParallax, "confrontParallax");
    safe(initSmoothScroll,     "smoothScroll");
    safe(initPodcastWidget,    "podcast");
    safe(initGlobe,            "globe");
    safe(initRegionMaps,       "regionMaps");
    safe(initHeroChrome,       "heroChrome");
    safe(initFloatingMenu,     "floatingMenu");
    safe(initAmountSlider,     "amountSlider");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
