/**
 * CINEYFPV — Interactive Homepage Application Controller
 *
 * Implements:
 * - Dynamic rendering from centralised CINEY_CONFIG
 * - Sticky header transition on scroll
 * - Accessible mobile menu drawer with keyboard Escape & focus management
 * - Full-screen hero video orchestration (YouTube IFrame API + native MP4 fallback + offscreen pause)
 * - Accessible native <dialog closedby="any"> video lightbox with light-dismiss fallback
 * - Accessible editorial testimonial switcher & keyboard controls
 * - Accessible FAQ accordion with ARIA states
 * - B2B project enquiry form with :user-invalid + JS WeakMap fallback + ARIA sync
 * - Restrained GSAP & ScrollTrigger animations with prefers-reduced-motion compliance
 */

(function () {
  "use strict";

  const config = window.CINEY_CONFIG;
  if (!config) {
    console.error("CINEY_CONFIG failed to load.");
    return;
  }

  let ytHeroPlayer = null;
  let isHeroVideoMuted = true;
  let activeTestimonialIndex = 0;
  let lastFocusedTrigger = null;

  /* ========================================================================
     1. POPULATE DYNAMIC SECTIONS FROM CENTRALISED CONFIG
     ======================================================================== */

  function renderFloatingHeroPanel() {
    const container = document.getElementById("hero-benefits-grid");
    if (!container) return;

    const benefitsHtml = config.hero.floatingPanelBenefits
      .map(
        (item, idx) => `
      <div class="p-6 sm:p-8 lg:p-9 flex flex-col justify-between ${
        idx < 2 ? "border-b lg:border-b-0 lg:border-r border-[#101716]/10" : "border-b lg:border-b-0 lg:border-r border-[#101716]/10"
      }">
        <div>
          <span class="font-mono text-xs font-medium tracking-widest text-[#57786F] block mb-3">${item.number}</span>
          <h2 class="font-heading text-xl sm:text-2xl font-bold text-[#101716] tracking-tight mb-2.5">${item.title}</h2>
          <p class="text-sm sm:text-[15px] text-[#252D2B]/85 leading-relaxed mb-6">${item.description}</p>
        </div>
        <div>
          <a href="${item.target}" class="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-widest text-[#101716] border-b border-[#101716]/40 pb-1 hover:border-[#101716] hover:text-[#57786F] transition-colors">
            Explore <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    `
      )
      .join("");

    const preview = config.hero.floatingPanelPreview;
    const previewHtml = `
      <div class="relative min-h-[220px] lg:min-h-full overflow-hidden group bg-[#101716]">
        <img
          src="${preview.posterUrl}"
          alt="Preview frame from ${preview.label}"
          width="640"
          height="360"
          class="w-full h-full object-cover opacity-80 media-card-zoom"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#101716]/90 via-[#101716]/35 to-transparent"></div>
        <button
          type="button"
          data-video-id="${preview.videoId}"
          data-video-title="Tramnak Property & Fit-Out Tour"
          data-video-industry="Construction & Fit-Out"
          class="js-open-video absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer group focus:outline-none"
          aria-label="Play featured FPV tour: Tramnak Property & Fit-Out Tour"
        >
          <span class="w-14 h-14 rounded-full bg-[#F7F7F2]/15 backdrop-blur-md border border-[#F7F7F2]/40 flex items-center justify-center text-[#F7F7F2] group-hover:bg-[#C9F36B] group-hover:text-[#101716] group-hover:border-[#C9F36B] group-hover:scale-105 transition-all duration-300 mb-3 shadow-lg">
            <svg class="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </span>
          <span class="font-heading text-sm font-semibold text-[#F7F7F2] tracking-tight">Watch in 4K FPV</span>
          <span class="font-mono text-[11px] uppercase tracking-widest text-[#C9F36B] mt-1">${preview.label}</span>
        </button>
      </div>
    `;

    container.innerHTML = benefitsHtml + previewHtml;
  }

  function renderClientCredibility() {
    const container = document.getElementById("client-trust-grid");
    if (!container) return;

    container.innerHTML = config.clients
      .map(
        (client, idx) => `
      <div class="group flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6 rounded-2xl border border-[#101716]/10 bg-white/80 hover:bg-white hover:border-[#101716]/25 hover:shadow-md transition-all duration-300">
        <div class="flex items-center gap-4 min-w-0">
          ${
            client.logo
              ? `<img src="${client.logo}" alt="${client.name} logo" width="48" height="48" loading="lazy" class="w-12 h-12 rounded-full object-cover border border-[#101716]/12 shrink-0" />`
              : `<span class="w-12 h-12 rounded-full bg-[#101716] text-[#C9F36B] font-mono text-sm font-medium flex items-center justify-center shrink-0">${client.name.slice(0, 2).toUpperCase()}</span>`
          }
          <div class="text-left min-w-0">
            <div class="font-heading font-bold text-base sm:text-lg text-[#101716] leading-snug truncate">${client.name}</div>
            <div class="font-mono text-xs text-[#57786F] tracking-wide mt-0.5">${client.sector}</div>
          </div>
        </div>
        <span class="font-mono text-[11px] uppercase tracking-widest text-[#101716]/40 group-hover:text-[#57786F] transition-colors shrink-0">
          0${idx + 1}
        </span>
      </div>
    `
      )
      .join("");
  }

  function renderFeaturedProjects() {
    const container = document.getElementById("featured-projects-grid");
    if (!container) return;

    container.innerHTML = config.featuredProjects
      .map(
        (project, idx) => `
      <article class="reveal-up group flex flex-col justify-between rounded-2xl bg-white border border-[#101716]/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
        <div>
          <!-- Cinematic Thumbnail Container -->
          <div class="relative aspect-[16/10] bg-[#101716] overflow-hidden">
            <img
              src="${project.posterUrl}"
              alt="${project.title} — ${project.industry} FPV drone tour thumbnail"
              width="640"
              height="400"
              loading="${idx === 0 ? "eager" : "lazy"}"
              class="w-full h-full object-cover media-card-zoom opacity-90 group-hover:opacity-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#101716]/85 via-[#101716]/25 to-transparent"></div>

            <!-- Top Metadata Pills -->
            <div class="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
              <span class="px-3 py-1 rounded-full bg-[#101716]/75 backdrop-blur-md border border-[#F7F7F2]/15 font-mono text-[11px] uppercase tracking-wider text-[#F7F7F2]">
                ${project.industry}
              </span>
              <span class="px-2.5 py-1 rounded-full bg-[#101716]/75 backdrop-blur-md font-mono text-[11px] text-[#C9F36B]">
                0${idx + 1}
              </span>
            </div>

            <!-- Center Play Affordance -->
            <button
              type="button"
              data-video-id="${project.youtubeId}"
              data-video-title="${project.title}"
              data-video-industry="${project.industry}"
              class="js-open-video absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer focus:outline-none"
              aria-label="Watch project video: ${project.title}"
            >
              <span class="w-16 h-16 rounded-full bg-[#101716]/70 backdrop-blur-md border border-[#F7F7F2]/30 flex items-center justify-center text-[#F7F7F2] group-hover:bg-[#C9F36B] group-hover:text-[#101716] group-hover:border-[#C9F36B] group-hover:scale-110 transition-all duration-300 shadow-xl">
                <svg class="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
              </span>
              <span class="mt-2.5 px-3 py-1 rounded-full bg-[#101716]/70 backdrop-blur-sm font-mono text-[11px] uppercase tracking-widest text-[#F7F7F2] opacity-90 group-hover:opacity-100">
                Play Fly-Through
              </span>
            </button>

            <!-- Bottom Metadata inside Thumbnail (Inspired by Reference Cards) -->
            <div class="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F7F7F2]/85 pointer-events-none">
              <span class="inline-flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#C9F36B]"></span>
                ${project.client}
              </span>
              <span>${project.format}</span>
            </div>
          </div>

          <!-- Editorial Copy -->
          <div class="p-6 sm:p-7">
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-[#101716] tracking-tight mb-2.5 group-hover:text-[#57786F] transition-colors">
              ${project.title}
            </h3>
            <p class="text-[#252D2B]/80 text-sm sm:text-[15px] leading-relaxed">
              ${project.description}
            </p>
          </div>
        </div>

        <!-- Card Action Footer -->
        <div class="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 flex items-center justify-between border-t border-[#101716]/5 mt-2">
          <button
            type="button"
            data-video-id="${project.youtubeId}"
            data-video-title="${project.title}"
            data-video-industry="${project.industry}"
            class="js-open-video inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#101716]/25 font-mono text-xs font-medium uppercase tracking-wider text-[#101716] hover:bg-[#101716] hover:text-[#F7F7F2] hover:border-[#101716] transition-all cursor-pointer"
          >
            Watch Project
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <a
            href="${project.youtubeUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-[11px] text-[#57786F] hover:text-[#101716] transition-colors inline-flex items-center gap-1"
            aria-label="Open ${project.title} on YouTube in a new tab"
          >
            YouTube <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `
      )
      .join("");

    // Render additional verified archive strip below the 3 primary cards
    const archiveContainer = document.getElementById("additional-projects-strip");
    if (archiveContainer && config.additionalVerifiedVideos) {
      archiveContainer.innerHTML = config.additionalVerifiedVideos
        .map(
          (vid) => `
        <button
          type="button"
          data-video-id="${vid.youtubeId}"
          data-video-title="${vid.title}"
          data-video-industry="${vid.industry}"
          class="js-open-video group flex items-center gap-3.5 p-2.5 pr-4 rounded-xl bg-white border border-[#101716]/10 hover:border-[#101716]/30 hover:shadow-md transition-all text-left cursor-pointer"
        >
          <div class="relative w-16 h-11 rounded-lg overflow-hidden bg-[#101716] shrink-0">
            <img src="${vid.posterUrl}" alt="${vid.title}" width="120" height="80" loading="lazy" class="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform" />
            <span class="absolute inset-0 flex items-center justify-center bg-[#101716]/40 text-[#C9F36B]">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </span>
          </div>
          <div class="min-w-0">
            <div class="font-heading text-xs sm:text-sm font-bold text-[#101716] truncate group-hover:text-[#57786F] transition-colors">${vid.title}</div>
            <div class="font-mono text-[10px] uppercase tracking-wider text-[#57786F]">${vid.industry}</div>
          </div>
        </button>
      `
        )
        .join("");
    }
  }

  function renderIndustries() {
    const container = document.getElementById("industries-grid");
    if (!container) return;

    container.innerHTML = config.industries
      .map(
        (ind, idx) => `
      <a
        href="${ind.target}"
        data-industry-select="${ind.title}"
        class="js-industry-card reveal-up group relative flex flex-col justify-end min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden bg-[#101716] border border-[#101716]/10 p-6 sm:p-8 focus:outline-none"
      >
        <img
          src="${ind.imageUrl}"
          alt="${ind.title} — CINEYFPV commercial drone filming"
          width="640"
          height="420"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover opacity-70 media-card-zoom"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#101716] via-[#101716]/55 to-[#101716]/15 group-hover:via-[#101716]/65 transition-colors"></div>

        <!-- Top Bar -->
        <div class="relative z-10 mb-auto flex items-center justify-between w-full">
          <span class="font-mono text-xs text-[#C9F36B] bg-[#101716]/75 backdrop-blur-md px-3 py-1 rounded-full border border-[#F7F7F2]/10">
            0${idx + 1} / SECTOR
          </span>
          <span class="w-10 h-10 rounded-full bg-[#F7F7F2]/10 backdrop-blur-md border border-[#F7F7F2]/20 flex items-center justify-center text-[#F7F7F2] group-hover:bg-[#C9F36B] group-hover:text-[#101716] group-hover:border-[#C9F36B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
            <span aria-hidden="true" class="text-base leading-none">↗</span>
          </span>
        </div>

        <!-- Bottom Content -->
        <div class="relative z-10 mt-8">
          <span class="font-mono text-[11px] uppercase tracking-widest text-[#F7F7F2]/65 block mb-1.5">
            Featured: ${ind.projectRef}
          </span>
          <h3 class="font-heading text-2xl sm:text-[26px] font-bold text-[#F7F7F2] tracking-tight mb-2.5">
            ${ind.title}
          </h3>
          <p class="text-sm sm:text-[15px] text-[#F7F7F2]/80 leading-relaxed">
            ${ind.description}
          </p>
          <span class="inline-flex items-center gap-1.5 mt-4 font-mono text-xs uppercase tracking-wider text-[#C9F36B] group-hover:underline">
            Enquire about ${ind.title} <span aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    `
      )
      .join("");
  }

  function renderServices() {
    const container = document.getElementById("services-list");
    if (!container) return;

    container.innerHTML = config.services
      .map(
        (srv) => `
      <article class="reveal-up group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12 border-t border-[#F7F7F2]/12 items-center">
        <!-- Number & Title -->
        <div class="lg:col-span-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-xs uppercase tracking-widest text-[#C9F36B] px-2.5 py-1 rounded bg-[#252D2B] border border-[#F7F7F2]/10">
              ${srv.number}
            </span>
            <span class="font-mono text-xs uppercase tracking-widest text-[#F7F7F2]/50">Core Deliverable</span>
          </div>
          <h3 class="font-heading text-2xl sm:text-3xl font-bold text-[#F7F7F2] tracking-tight mb-3">
            ${srv.title}
          </h3>
          <p class="text-base sm:text-lg text-[#F7F7F2]/90 font-medium leading-snug mb-3">
            ${srv.description}
          </p>
          <p class="text-sm sm:text-[15px] text-[#F7F7F2]/65 leading-relaxed mb-6">
            ${srv.detail}
          </p>
          <ul class="flex flex-wrap gap-2">
            ${srv.deliverables
              .map(
                (del) => `
              <li class="font-mono text-xs text-[#F7F7F2]/80 bg-[#252D2B]/90 border border-[#F7F7F2]/10 px-3 py-1.5 rounded-full">
                ${del}
              </li>
            `
              )
              .join("")}
          </ul>
        </div>

        <!-- Genuine Looping Video Preview -->
        <div class="lg:col-span-7">
          <div class="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#252D2B] border border-[#F7F7F2]/10">
            <video
              class="js-lazy-video w-full h-full object-cover"
              data-src="${srv.videoUrl}"
              poster="${srv.posterUrl}"
              muted
              loop
              playsinline
              preload="none"
            ></video>
            <div class="absolute inset-0 bg-gradient-to-t from-[#101716]/60 via-transparent to-transparent pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span class="font-mono text-[11px] uppercase tracking-widest text-[#F7F7F2]/80 bg-[#101716]/75 backdrop-blur-md px-3 py-1 rounded-full">
                CINEYFPV Footage — ${srv.title}
              </span>
              <a
                href="#contact"
                class="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C9F36B] text-[#101716] font-mono text-xs font-medium uppercase tracking-wider hover:bg-[#F7F7F2] transition-colors"
              >
                Request Quote ↗
              </a>
            </div>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  function renderDifferentiators() {
    const container = document.getElementById("differentiators-grid");
    if (!container) return;

    container.innerHTML = config.differentiators.items
      .map(
        (item) => `
      <div class="reveal-up p-6 sm:p-7 rounded-2xl bg-white border border-[#101716]/10 flex flex-col justify-between">
        <div>
          <span class="font-mono text-xs font-medium text-[#57786F] block mb-2.5">${item.code} / STANDARD</span>
          <h3 class="font-heading text-lg sm:text-xl font-bold text-[#101716] tracking-tight mb-2">
            ${item.title}
          </h3>
          <p class="text-sm sm:text-[15px] text-[#252D2B]/80 leading-relaxed">
            ${item.description}
          </p>
        </div>
      </div>
    `
      )
      .join("");
  }

  function renderProcessSteps() {
    const container = document.getElementById("process-timeline");
    if (!container) return;

    container.innerHTML = config.processSteps
      .map(
        (step) => `
      <div class="reveal-up group relative flex flex-col justify-between rounded-2xl bg-[#252D2B]/55 border border-[#F7F7F2]/10 overflow-hidden hover:border-[#C9F36B]/50 transition-all duration-300">
        <div class="relative aspect-[16/10] overflow-hidden bg-[#101716]">
          <img
            src="${step.imageUrl}"
            alt="Step ${step.step}: ${step.title} — CINEYFPV production process"
            width="600"
            height="375"
            loading="lazy"
            class="w-full h-full object-cover opacity-80 media-card-zoom"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#101716] via-[#101716]/25 to-transparent"></div>
          <span class="absolute top-4 left-4 font-mono text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full bg-[#101716]/85 text-[#C9F36B] border border-[#C9F36B]/30">
            ${step.step} / ${step.title}
          </span>
        </div>
        <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-[#F7F7F2] tracking-tight mb-2.5">
              ${step.step} / ${step.title}
            </h3>
            <p class="text-sm sm:text-[15px] text-[#F7F7F2]/75 leading-relaxed">
              ${step.description}
            </p>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  function renderTestimonials() {
    const navList = document.getElementById("testimonial-selector-list");
    if (!navList) return;

    navList.innerHTML = config.testimonials
      .map(
        (t, idx) => `
      <button
        type="button"
        data-testimonial-index="${idx}"
        role="tab"
        aria-selected="${idx === 0 ? "true" : "false"}"
        aria-controls="testimonial-stage"
        id="testimonial-tab-${idx}"
        class="js-testimonial-tab w-full text-left py-4 px-5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
          idx === 0
            ? "bg-[#101716] text-[#F7F7F2] border-[#101716] shadow-md"
            : "bg-transparent text-[#101716]/65 border-transparent hover:bg-[#101716]/5 hover:text-[#101716]"
        }"
      >
        <div class="flex items-center gap-3.5">
          <span class="font-mono text-xs ${idx === 0 ? "text-[#C9F36B]" : "text-[#57786F]"}">0${idx + 1}</span>
          <div>
            <div class="font-heading font-bold text-base leading-tight">${t.organisation}</div>
            <div class="font-mono text-[11px] opacity-75 mt-0.5">${t.sector}</div>
          </div>
        </div>
        <span class="font-mono text-xs ${idx === 0 ? "text-[#C9F36B]" : "opacity-30"}">→</span>
      </button>
    `
      )
      .join("");

    updateActiveTestimonial(0);
  }

  function updateActiveTestimonial(index) {
    const items = config.testimonials;
    if (!items || !items[index]) return;
    activeTestimonialIndex = index;

    const current = items[index];
    const stage = document.getElementById("testimonial-stage");
    if (!stage) return;

    // Update selector tabs
    document.querySelectorAll(".js-testimonial-tab").forEach((btn, idx) => {
      const isSelected = idx === index;
      btn.setAttribute("aria-selected", isSelected ? "true" : "false");
      btn.className = `js-testimonial-tab w-full text-left py-4 px-5 rounded-xl transition-all flex items-center justify-between cursor-pointer border ${
        isSelected
          ? "bg-[#101716] text-[#F7F7F2] border-[#101716] shadow-md"
          : "bg-transparent text-[#101716]/65 border-transparent hover:bg-[#101716]/5 hover:text-[#101716]"
      }`;
      const numSpan = btn.querySelector("span:first-child");
      const arrowSpan = btn.querySelector("span:last-child");
      if (numSpan) numSpan.className = `font-mono text-xs ${isSelected ? "text-[#C9F36B]" : "text-[#57786F]"}`;
      if (arrowSpan) arrowSpan.className = `font-mono text-xs ${isSelected ? "text-[#C9F36B]" : "opacity-30"}`;
    });

    stage.setAttribute("aria-labelledby", `testimonial-tab-${index}`);
    stage.innerHTML = `
      <div class="flex flex-col justify-between h-full">
        <div>
          <!-- Verified Rating & Badge -->
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#101716]/10">
            <div class="flex items-center gap-2">
              <div class="flex items-center text-[#101716]" aria-label="Rated ${current.rating} out of 5 stars">
                ${Array(5)
                  .fill(0)
                  .map(
                    () =>
                      `<svg class="w-4 h-4 fill-current text-[#101716]" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
                  )
                  .join("")}
              </div>
              <span class="font-mono text-xs font-medium text-[#101716]">(${current.rating})</span>
              <span class="font-mono text-[11px] uppercase tracking-wider text-[#57786F] ml-2">• Verified Client Review</span>
            </div>
            <span class="font-mono text-xs uppercase tracking-widest text-[#57786F]">
              Excerpt & Full Attribution
            </span>
          </div>

          <!-- Large Editorial Pull Quote (Excerpt) -->
          <blockquote class="mb-8">
            <p class="font-heading text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#101716] leading-[1.2] tracking-tight mb-6">
              “${current.excerpt}”
            </p>
            <p class="text-sm sm:text-base text-[#252D2B]/80 leading-relaxed bg-[#F5F3EE] p-5 rounded-xl border border-[#101716]/8">
              <span class="font-mono text-[11px] uppercase tracking-wider text-[#57786F] block mb-1.5">Full Published Review on cineyfpv.com:</span>
              “${current.fullQuote}”
            </p>
          </blockquote>
        </div>

        <!-- Client Attribution & Related Project Video Trigger -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#101716]/10">
          <div class="flex items-center gap-4">
            ${
              current.logoUrl
                ? `<img src="${current.logoUrl}" alt="${current.organisation}" width="52" height="52" loading="lazy" class="w-13 h-13 rounded-full object-cover border border-[#101716]/15" />`
                : ""
            }
            <div>
              <div class="font-heading text-lg font-bold text-[#101716]">${current.organisation}</div>
              <div class="font-mono text-xs text-[#57786F] uppercase tracking-wider">${current.sector}</div>
            </div>
          </div>

          ${
            current.projectVideoId
              ? `<button
                  type="button"
                  data-video-id="${current.projectVideoId}"
                  data-video-title="${current.organisation} — FPV Tour"
                  data-video-industry="${current.sector}"
                  class="js-open-video inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#101716] text-[#F7F7F2] font-mono text-xs uppercase tracking-wider hover:bg-[#57786F] transition-colors cursor-pointer"
                >
                  Watch ${current.organisation} Film ▶
                </button>`
              : ""
          }
        </div>
      </div>
    `;
  }

  function renderFaqs() {
    const container = document.getElementById("faq-accordion-list");
    if (!container) return;

    container.innerHTML = config.faqs
      .map(
        (faq, idx) => `
      <div class="border-b border-[#101716]/15">
        <h3>
          <button
            type="button"
            id="faq-btn-${idx}"
            aria-expanded="${idx === 0 ? "true" : "false"}"
            aria-controls="faq-panel-${idx}"
            class="js-faq-trigger w-full py-6 flex items-center justify-between gap-6 text-left group cursor-pointer focus:outline-none"
          >
            <div class="flex items-baseline gap-4">
              <span class="font-mono text-xs text-[#57786F] shrink-0">0${idx + 1}</span>
              <span class="font-heading text-lg sm:text-xl font-bold text-[#101716] group-hover:text-[#57786F] transition-colors">
                ${faq.question}
              </span>
            </div>
            <span class="js-faq-icon w-8 h-8 rounded-full border border-[#101716]/25 flex items-center justify-center shrink-0 text-[#101716] group-hover:bg-[#101716] group-hover:text-[#F7F7F2] transition-all">
              <svg class="w-4 h-4 transition-transform duration-300 ${idx === 0 ? "rotate-45" : ""}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
        </h3>
        <div
          id="faq-panel-${idx}"
          role="region"
          aria-labelledby="faq-btn-${idx}"
          class="faq-content-grid ${idx === 0 ? "is-open" : ""}"
        >
          <div class="faq-content-inner">
            <p class="pb-6 pl-0 sm:pl-8 text-[#252D2B]/85 text-base leading-relaxed max-w-3xl">
              ${faq.answer}
            </p>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  /* ========================================================================
     2. HERO VIDEO ORCHESTRATION (YOUTUBE API + FALLBACK + OFFSCREEN PAUSE)
     ======================================================================== */

  function initHeroVideo() {
    const heroSection = document.getElementById("top");
    const nativeVideo = document.getElementById("hero-native-video");
    const ytContainer = document.getElementById("hero-youtube-iframe-wrapper");
    const muteToggleBtn = document.getElementById("hero-mute-toggle");
    const pauseToggleBtn = document.getElementById("hero-playback-toggle");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion && nativeVideo) {
      nativeVideo.pause();
      nativeVideo.removeAttribute("autoplay");
    } else if (nativeVideo) {
      nativeVideo.muted = true;
      nativeVideo.defaultMuted = true;
      nativeVideo.setAttribute("playsinline", "");
      nativeVideo.setAttribute("webkit-playsinline", "");
      nativeVideo.play().catch(() => {});
    }

    if (ytContainer) {
      ytContainer.classList.add("hidden");
    }

    // Pause hero playback when scrolled completely off-screen to protect performance
    if ("IntersectionObserver" in window && heroSection) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (prefersReducedMotion) return;
            const isPausedManually = pauseToggleBtn && pauseToggleBtn.getAttribute("data-paused") === "true";
            const videoModal = document.getElementById("video-modal");
            const isModalOpen = Boolean(videoModal && videoModal.open);
            if (isPausedManually || isModalOpen) return;

            if (entry.isIntersecting) {
              if (nativeVideo && nativeVideo.paused) {
                nativeVideo.play().catch(() => {});
              }
              if (ytHeroPlayer && typeof ytHeroPlayer.playVideo === "function") {
                ytHeroPlayer.playVideo();
              }
            } else {
              if (nativeVideo && !nativeVideo.paused) {
                nativeVideo.pause();
              }
              if (ytHeroPlayer && typeof ytHeroPlayer.pauseVideo === "function") {
                ytHeroPlayer.pauseVideo();
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(heroSection);
    }

    // Play/Pause toggle button for user control
    if (pauseToggleBtn) {
      pauseToggleBtn.addEventListener("click", () => {
        const currentlyPaused = pauseToggleBtn.getAttribute("data-paused") === "true";
        if (currentlyPaused) {
          pauseToggleBtn.setAttribute("data-paused", "false");
          pauseToggleBtn.setAttribute("aria-label", "Pause background video");
          pauseToggleBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#C9F36B]"></span><span>Pause Ambient</span>`;
          if (nativeVideo) nativeVideo.play().catch(() => {});
          if (ytHeroPlayer && typeof ytHeroPlayer.playVideo === "function") ytHeroPlayer.playVideo();
        } else {
          pauseToggleBtn.setAttribute("data-paused", "true");
          pauseToggleBtn.setAttribute("aria-label", "Play background video");
          pauseToggleBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#F7F7F2]/50"></span><span>Play Ambient</span>`;
          if (nativeVideo) nativeVideo.pause();
          if (ytHeroPlayer && typeof ytHeroPlayer.pauseVideo === "function") ytHeroPlayer.pauseVideo();
        }
      });
    }
  }

  /* ========================================================================
     3. LAZY-LOAD BELOW-THE-FOLD SERVICE VIDEOS
     ======================================================================== */

  function initLazyVideos() {
    const lazyVideos = document.querySelectorAll("video.js-lazy-video");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!("IntersectionObserver" in window)) {
      lazyVideos.forEach((video) => {
        if (video.dataset.src) {
          video.src = video.dataset.src;
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            if (!prefersReducedMotion) {
              video.play().catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { rootMargin: "150px 0px", threshold: 0.1 }
    );

    lazyVideos.forEach((v) => observer.observe(v));
  }

  /* ========================================================================
     4. ACCESSIBLE VIDEO MODAL (<dialog closedby="any"> + FALLBACK)
     ======================================================================== */

  function initVideoModal() {
    const dialog = document.getElementById("video-modal");
    const iframeContainer = document.getElementById("video-modal-iframe-container");
    const titleEl = document.getElementById("video-modal-title");
    const industryEl = document.getElementById("video-modal-industry");
    const externalLinkEl = document.getElementById("video-modal-yt-link");
    const closeBtn = document.getElementById("video-modal-close");

    if (!dialog || !iframeContainer) return;

    // Track active modal YouTube player instance
    let modalYtPlayer = null;

    // Lookup helper to find matching native MP4 and poster for any YouTube ID
    function findProjectMedia(videoId) {
      const allProjects = [
        ...(config.featuredProjects || []),
        ...(config.additionalVerifiedVideos || [])
      ];
      const match = allProjects.find((p) => p.youtubeId === videoId);
      return {
        nativeVideoUrl:
          (match && match.nativeVideoUrl) ||
          `./videos/${videoId}.mp4`,
        remotePreviewUrl:
          (match && match.remotePreviewUrl) ||
          config.hero.nativeVideoFallbackUrl ||
          "https://framerusercontent.com/assets/lAPPtwOlWBxSSpLmQwWGogo5OCw.mp4",
        posterUrl:
          (match && match.posterUrl) ||
          config.hero.posterUrl
      };
    }

    function destroyModalPlayer() {
      if (modalYtPlayer) {
        try {
          if (typeof modalYtPlayer.stopVideo === "function") modalYtPlayer.stopVideo();
          if (typeof modalYtPlayer.destroy === "function") modalYtPlayer.destroy();
        } catch (_) {}
        modalYtPlayer = null;
      }
    }

    function renderNativePlayer(videoId, title, media, isFileProtocol) {
      destroyModalPlayer();
      iframeContainer.innerHTML = `
        <div class="relative w-full bg-[#101716] flex flex-col">
          <div id="modal-video-stage" class="relative w-full h-[54vh] sm:h-auto sm:aspect-video max-h-[75vh] bg-black flex items-center justify-center overflow-hidden">
            <video
              id="modal-native-video-el"
              class="w-full h-full object-contain bg-black transition-all"
              src="${media.nativeVideoUrl}"
              poster="${media.posterUrl}"
              controls
              autoplay
              playsinline
            ></video>
          </div>
          <div class="px-4 py-3 bg-[#101716]/95 border-t border-[#F7F7F2]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span class="text-[#C9F36B]">
              Playing Full-Length CINEYFPV Video (${title || videoId})
            </span>
            <div class="flex items-center gap-3 sm:gap-4">
              <button type="button" id="js-toggle-video-fit" class="sm:hidden text-[#C9F36B] hover:underline cursor-pointer">
                Fill Vertical
              </button>
              ${
                !isFileProtocol
                  ? `<button type="button" id="js-switch-to-yt" class="text-[#F7F7F2]/80 hover:text-[#C9F36B] underline cursor-pointer">Switch to YouTube Embed</button>`
                  : ""
              }
              <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="text-[#F7F7F2] hover:text-[#C9F36B] underline">
                Open on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      `;

      const videoEl = document.getElementById("modal-native-video-el");
      const toggleFitBtn = document.getElementById("js-toggle-video-fit");
      if (toggleFitBtn && videoEl) {
        toggleFitBtn.addEventListener("click", () => {
          const isCover = videoEl.classList.contains("object-cover");
          if (isCover) {
            videoEl.classList.remove("object-cover");
            videoEl.classList.add("object-contain");
            toggleFitBtn.textContent = "Fill Vertical";
          } else {
            videoEl.classList.remove("object-contain");
            videoEl.classList.add("object-cover");
            toggleFitBtn.textContent = "Fit Full Frame";
          }
        });
      }
      if (videoEl && media.remotePreviewUrl) {
        videoEl.addEventListener(
          "error",
          () => {
            if (videoEl.src !== media.remotePreviewUrl) {
              videoEl.src = media.remotePreviewUrl;
              videoEl.loop = true;
              videoEl.play().catch(() => {});
            }
          },
          { once: true }
        );
      }

      const switchYtBtn = document.getElementById("js-switch-to-yt");
      if (switchYtBtn) {
        switchYtBtn.addEventListener("click", () => {
          renderYouTubeEmbed(videoId, title, media);
        });
      }
    }

    function renderYouTubeEmbed(videoId, title, media) {
      destroyModalPlayer();

      const isHttpOrigin =
        window.location.protocol.startsWith("http") &&
        Boolean(window.location.origin) &&
        window.location.origin !== "null";

      const originParam = isHttpOrigin
        ? `&origin=${encodeURIComponent(window.location.origin)}`
        : "";

      iframeContainer.innerHTML = `
        <div class="relative w-full bg-[#101716] flex flex-col">
          <div class="relative w-full min-h-[54vh] sm:min-h-0 sm:aspect-video max-h-[72vh] bg-black flex items-center justify-center overflow-hidden">
            <iframe
              class="w-full h-full min-h-[54vh] sm:min-h-0 sm:aspect-video border-0"
              src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1${originParam}"
              title="${title || "CINEYFPV Project Video"}"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="px-4 py-3 bg-[#101716] border-t border-[#F7F7F2]/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span class="text-[#F7F7F2]/75">
              Playing Full-Length YouTube Video
            </span>
            <div class="flex items-center gap-4">
              <button type="button" id="js-switch-to-native" class="text-[#C9F36B] hover:underline cursor-pointer">
                Play Direct Full-Length MP4 ▶
              </button>
              <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="text-[#F7F7F2] hover:text-[#C9F36B] underline">
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </div>
      `;

      const switchNativeBtn = document.getElementById("js-switch-to-native");
      if (switchNativeBtn) {
        switchNativeBtn.addEventListener("click", () => {
          renderNativePlayer(videoId, title, media, false);
        });
      }
    }

    function openVideoModal(videoId, title, industry, triggerEl) {
      lastFocusedTrigger = triggerEl || document.activeElement;
      if (titleEl) titleEl.textContent = title || "CINEYFPV Project Showcase";
      if (industryEl) industryEl.textContent = industry || "Cinematic FPV Tour";
      if (externalLinkEl) externalLinkEl.href = `https://www.youtube.com/watch?v=${videoId}`;

      // Pause background hero video while modal is open so full-length modal video has dedicated bandwidth & audio
      const heroNative = document.getElementById("hero-native-video");
      if (heroNative && !heroNative.paused) heroNative.pause();
      if (ytHeroPlayer && typeof ytHeroPlayer.pauseVideo === "function") {
        ytHeroPlayer.pauseVideo();
      }

      const media = findProjectMedia(videoId);
      const isFileProtocol = window.location.protocol === "file:";

      // Play the full-length local MP4 directly so it works reliably on both file:// and http://
      // with full timeline scrubbing, audio, and zero YouTube Error 153 embed restrictions.
      renderNativePlayer(videoId, title, media, isFileProtocol);

      dialog.showModal();
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }

    function cleanupModal() {
      destroyModalPlayer();
      iframeContainer.innerHTML = "";
      document.body.style.overflow = "";

      // Resume ambient hero video if not manually paused by user
      const pauseToggleBtn = document.getElementById("hero-playback-toggle");
      const isPausedManually = pauseToggleBtn && pauseToggleBtn.getAttribute("data-paused") === "true";
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!isPausedManually && !prefersReducedMotion) {
        const heroNative = document.getElementById("hero-native-video");
        if (heroNative && heroNative.paused) heroNative.play().catch(() => {});
        if (ytHeroPlayer && typeof ytHeroPlayer.playVideo === "function") {
          ytHeroPlayer.playVideo();
        }
      }

      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === "function") {
        lastFocusedTrigger.focus();
      }
    }

    dialog.addEventListener("close", cleanupModal);

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        dialog.close();
      });
    }

    // Modern Web Guidance Fallback for browsers without native `closedby="any"` support
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      });
    }

    // Event delegation for any `.js-open-video` button across the page
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".js-open-video");
      if (!btn) return;
      e.preventDefault();
      const videoId = btn.getAttribute("data-video-id") || config.hero.youtubeVideoId;
      const title = btn.getAttribute("data-video-title");
      const industry = btn.getAttribute("data-video-industry");
      openVideoModal(videoId, title, industry, btn);
    });
  }

  /* ========================================================================
     5. HEADER SCROLL TRANSITION & MOBILE NAVIGATION DRAWER
     ======================================================================== */

  function initNavigation() {
    const header = document.getElementById("site-header");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileClose = document.getElementById("mobile-menu-close");
    const mobileDrawer = document.getElementById("mobile-menu-drawer");
    const mobileLinks = document.querySelectorAll(".js-mobile-nav-link");

    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 44) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    function openMobileMenu() {
      if (!mobileDrawer || !mobileToggle) return;
      mobileDrawer.classList.remove("hidden");
      requestAnimationFrame(() => {
        mobileDrawer.classList.remove("opacity-0");
        mobileDrawer.classList.add("opacity-100");
      });
      mobileToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      if (mobileClose) mobileClose.focus();
    }

    function closeMobileMenu() {
      if (!mobileDrawer || !mobileToggle) return;
      mobileDrawer.classList.remove("opacity-100");
      mobileDrawer.classList.add("opacity-0");
      mobileToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      setTimeout(() => {
        mobileDrawer.classList.add("hidden");
      }, 250);
      mobileToggle.focus();
    }

    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
        if (isExpanded) closeMobileMenu();
        else openMobileMenu();
      });
    }

    if (mobileClose) {
      mobileClose.addEventListener("click", closeMobileMenu);
    }

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileDrawer && !mobileDrawer.classList.contains("hidden")) {
          closeMobileMenu();
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer && !mobileDrawer.classList.contains("hidden")) {
        closeMobileMenu();
      }
    });

    // Pre-select space type in form when clicking an Industry card
    document.addEventListener("click", (e) => {
      const indCard = e.target.closest(".js-industry-card");
      if (!indCard) return;
      const selectedSector = indCard.getAttribute("data-industry-select");
      const spaceSelect = document.getElementById("space-type");
      if (spaceSelect && selectedSector) {
        Array.from(spaceSelect.options).forEach((opt) => {
          if (opt.value.toLowerCase().includes(selectedSector.split(" ")[0].toLowerCase())) {
            spaceSelect.value = opt.value;
          }
        });
      }
    });
  }

  /* ========================================================================
     6. INTERACTIVE TESTIMONIALS & FAQ ACCORDION
     ======================================================================== */

  function initTestimonialsAndFaq() {
    // Testimonial tab clicks
    document.addEventListener("click", (e) => {
      const tab = e.target.closest(".js-testimonial-tab");
      if (tab) {
        const idx = parseInt(tab.getAttribute("data-testimonial-index"), 10);
        if (!isNaN(idx)) updateActiveTestimonial(idx);
      }
    });

    const prevBtn = document.getElementById("testimonial-prev");
    const nextBtn = document.getElementById("testimonial-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const total = config.testimonials.length;
        const nextIdx = (activeTestimonialIndex - 1 + total) % total;
        updateActiveTestimonial(nextIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const total = config.testimonials.length;
        const nextIdx = (activeTestimonialIndex + 1) % total;
        updateActiveTestimonial(nextIdx);
      });
    }

    // FAQ Accordion
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".js-faq-trigger");
      if (!trigger) return;

      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const panelId = trigger.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const svgIcon = trigger.querySelector(".js-faq-icon svg");

      trigger.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      if (panel) {
        panel.classList.toggle("is-open", !isExpanded);
      }
      if (svgIcon) {
        svgIcon.classList.toggle("rotate-45", !isExpanded);
      }
    });
  }

  /* ========================================================================
     7. ACCESSIBLE B2B ENQUIRY FORM (:user-invalid + ARIA SYNC + FALLBACK)
     ======================================================================== */

  function initEnquiryForm() {
    const form = document.getElementById("project-enquiry-form");
    const statusBanner = document.getElementById("form-status-banner");
    const resetBtn = document.getElementById("form-reset-btn");

    if (!form) return;

    // Sync programmatic aria-invalid state with native validity
    const syncAriaInvalid = (input) => {
      if (!input.checkValidity) return;
      if (!input.checkValidity()) {
        input.setAttribute("aria-invalid", "true");
      } else {
        input.removeAttribute("aria-invalid");
      }
    };

    form.addEventListener(
      "blur",
      (e) => {
        if (e.target.matches("input[required], select[required], textarea[required]")) {
          syncAriaInvalid(e.target);
        }
      },
      true
    );

    form.addEventListener("input", (e) => {
      if (
        e.target.matches("input[required], select[required], textarea[required]") &&
        e.target.checkValidity()
      ) {
        e.target.removeAttribute("aria-invalid");
      }
    });

    // WeakMap Fallback for browsers without native `:user-invalid` support
    const dirtyState = new WeakMap();
    if (!CSS.supports("selector(:user-invalid)")) {
      const updateFallbackState = (input) => {
        const isValid = input.checkValidity();
        input.classList.toggle("user-invalid-fallback", !isValid);
        input.classList.toggle("user-valid-fallback", isValid);
        syncAriaInvalid(input);
      };

      form.addEventListener(
        "blur",
        (e) => {
          const input = e.target;
          if (!input.checkValidity) return;
          const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
          state.hasBlurred = true;
          dirtyState.set(input, state);
          if (state.hasInteracted) updateFallbackState(input);
        },
        true
      );

      form.addEventListener("input", (e) => {
        const input = e.target;
        if (!input.checkValidity) return;
        const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
        state.hasInteracted = true;
        dirtyState.set(input, state);
        if (state.hasBlurred) updateFallbackState(input);
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll("input[required], select[required], textarea[required]");
      let firstInvalid = null;

      requiredFields.forEach((field) => {
        syncAriaInvalid(field);
        if (!field.checkValidity()) {
          field.classList.add("user-invalid-fallback");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.classList.remove("user-invalid-fallback");
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // Believable local prototype submission state
      const formData = new FormData(form);
      const clientName = formData.get("fullName") || "there";
      const companyName = formData.get("companyName") || "your organisation";
      const spaceType = formData.get("spaceType") || "commercial space";

      const fieldsWrapper = document.getElementById("form-fields-wrapper");
      if (fieldsWrapper) fieldsWrapper.classList.add("hidden");

      if (statusBanner) {
        statusBanner.classList.remove("hidden");
        const summaryEl = document.getElementById("form-confirmation-summary");
        if (summaryEl) {
          summaryEl.textContent = `Thank you, ${clientName}. Your project brief for ${companyName} (${spaceType}) has been validated locally in this prototype.`;
        }
        statusBanner.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        form.reset();
        form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
        form.querySelectorAll(".user-invalid-fallback, .user-valid-fallback").forEach((el) => {
          el.classList.remove("user-invalid-fallback", "user-valid-fallback");
        });
        if (statusBanner) statusBanner.classList.add("hidden");
        const fieldsWrapper = document.getElementById("form-fields-wrapper");
        if (fieldsWrapper) fieldsWrapper.classList.remove("hidden");
      });
    }
  }

  /* ========================================================================
     8. RESTRAINED GSAP + SCROLLTRIGGER REVEAL ANIMATIONS
     ======================================================================== */

  function initAnimations() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof window.gsap === "undefined") {
      return;
    }

    const gsap = window.gsap;
    if (window.ScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);
    }

    // Subtle Hero Entrance
    gsap.fromTo(
      ".js-hero-animate",
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform"
      }
    );

    // Section Reveal Animations
    const revealElements = document.querySelectorAll(".reveal-up");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          },
          clearProps: "transform"
        }
      );
    });
  }

  /* ========================================================================
     INITIALISE PROTOTYPE
     ======================================================================== */

  document.addEventListener("DOMContentLoaded", () => {
    renderFloatingHeroPanel();
    renderClientCredibility();
    renderFeaturedProjects();
    renderIndustries();
    renderServices();
    renderDifferentiators();
    renderProcessSteps();
    renderTestimonials();
    renderFaqs();

    initNavigation();
    initHeroVideo();
    initLazyVideos();
    initVideoModal();
    initTestimonialsAndFaq();
    initEnquiryForm();
    initAnimations();
  });
})();
