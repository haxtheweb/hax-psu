import { html, render, css, nothing } from 'lit';
import "@haxtheweb/page-section/page-section.js";
import "@haxtheweb/future-terminal-text/future-terminal-text.js";
import "@haxtheweb/simple-cta/simple-cta.js";
import "@haxtheweb/simple-img/simple-img.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import {
  DDDAllStyles
} from "@haxtheweb/d-d-d/lib/DDDStyles.js";
import { examples } from "./examples.mjs";
import { screenshotRelPath } from "./slug.mjs";

export class HaxPsu extends DDD {
  static get properties() {
    return {
      title: { type: String },
      stats: { type: Object },
      image: { type: String },
      year: { type: Number },
      examples: { type: Array },
    };
  }

  static get styles() {
    return [DDDAllStyles, css`
      :host {
        --hax-psu-square-1: var(--primary-color-1);
        --hax-psu-square-2: var(--primary-color-2);
        --hax-psu-square-3: var(--primary-color-3);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: #444444;
        margin: 0 auto;
        background-color: white;
        overflow-x: hidden;
      }

      simple-img {
        display: block;
      }

      .logo {
        transition: all 0.3s ease-in-out;
        width: 200px;
        height: auto;
        top: 0;
        left: 0;
      }

      header {
        width: 100%;
        height: 100px;
        display: flex;
        margin-bottom: -100px;
        z-index: 100;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        font-style: normal;
        text-transform: none;
        text-decoration: none;
        letter-spacing: 1px;
        padding-bottom: 8px;
        line-height: 1em;
        margin: 0;
      }

      hr.side-line {
        display: inline-block;
        width: 9%;
        margin-bottom: 2.75%;
        height: 1px;
        border: none;
        border-top: 5px solid var(--secondary-color-1);
      }

      .logo-wrapper {
        padding: 16px;
      }

      a {
        color: var(--link-color-1);
        font-weight: 600;
        text-decoration: underline;
      }
      a:focus {
        outline: 2px solid var(--link-color-1);
        outline-offset: 2px;
      }

      a:hover {
        text-decoration: none;
      }

      .logo-wrapper a {
        display: block;
      }

      main {
        flex-grow: 1;
        width: 100%;
        display: block;
      }

      main h1,
      main h2 {
        text-align: left;
      }

      .tease-link {
        text-decoration: none;
        margin: 16px auto;
        display: block;
      }

      .tease-link button {
        transition: all 0.3s ease-in-out;
        background-color: orange;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 40px;
        cursor: pointer;
      }

      .tease-link button:hover,
      .tease-link button:focus {
        background-color: #ff8c00;
      }

      .tease-link button:active {
        background-color: black;
        color: #ff8c00;
      }
      .container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        margin: 0px auto;
      }
      .section {
        background-color: var(--bg-color-1);
      }
      grid-plate {
        margin: 0 0 64px;
      }
      grid-plate p {
        margin: 0 32px;
      }
      play-list {
        --sl-color-neutral-300: var(--primary-color-2);
        --sl-color-neutral-700: var(--secondary-color-2);
        --play-list-icon-color: var(--primary-color-1);
      }
      page-section ul,
      page-section li {
        font-size: var(--ddd-font-size-xxs);
      }
      #section-2 {
        background-color: var(--bg-color-1);
      }

      #section-3 {
        background-color: var(--bg-color-2);
      }

      #section-4 {
        color: var(--bg-color-1);
        --page-section-content-padding: 0 2%;
        --page-section-content-width: 90%;
        --page-section-content-max-width: 90%;
      }

      #section-4 grid-plate p {
        margin: 8px 0 24px 0;
        padding: 16px;
        text-align: justify;
      }

      page-section p {
        text-align: justify;
      }

      #section-5 {
        background-color: var(--bg-color-1);
      }

      #section-7 {
        background-color: var(--bg-color-2);
      }

      p[slot="entice"] {
        padding: var(--ddd-spacing-3);
      }
      
      .section.top {
        text-align: left;
      }
      .section:not(.top) {
        --page-section-padding: 32px 0;
      }

      .section.top h1 .text {
        font-size: var(--ddd-font-size-xl);
      }

      .section.top h1 .line {
        display: block;
      }

      .section.top h1 .hax {
        font-weight: bold;
        font-style: italic;
        font-family: 'Press Start 2P', sans-serif;
        font-size: var(--ddd-font-size-m);
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 8px;
      }

      .section.top h1 .create {
        font-weight: bold;
        font-style: italic;
        font-family: 'Press Start 2P', sans-serif;
        font-size: var(--ddd-font-size-m);
        display: inline-block;
        vertical-align: middle;
        margin: 8px 0;
      }

      play-list::part(site-wrapper) {
        display: flex;
        min-width: 150px;
        text-align: center;
      }

      play-list::part(site-details) {
        margin: 0 16px;
        padding: 0 12px;
      }

      play-list::part(site-description) {
        margin: 0;
        padding: 0 12px;
        font-size: var(--ddd-font-size-4xs);
      }
      play-list::part(simple-cta) {
        font-size: var(--ddd-font-size-3xs);
        margin: 4px auto;
        display: block;
      }
      play-list::part(site-type) {
        margin: 0;
        padding: 0 12px;
        font-size: var(--ddd-font-size-3xs);
      }

      .section-style-1 {
        width: 80%;
        margin: 0 auto;
        max-width: 1080px;
        padding: 32px 0;
        text-align: left;
      }

      p {
        line-height: 32px;
        margin: 0 0 32px 0;
        padding: 0;
      }
      h3,h4,h5,h6 {
        margin: 0;
        padding: 0 0 8px 0;
        line-height: 42px;
        text-transform: uppercase;
      }

      .menu {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        margin-right: 100px;
        margin-top: 10px;
      }

      .menu-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        list-style: none;
        gap: 0;
        margin: 0;
        padding: 0;
      }

      .menu-list li {
        display: flex;
        margin: 0;
        padding: 0;
      }

      .menu .menu-item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin: 0 16px;
        cursor: pointer;
        text-decoration: none;
        padding: 8px 16px;
        background-color: transparent;
        color: var(--primary-color-3);
        font-weight: normal;
        height: 64px;
        transition: all 0.3s ease-in-out;
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-xxs);
      }

      .menu .menu-item.menu-login {
        color: var(--primary-color-1);
        background-color: var(--secondary-color-1);
      }

      /* dark navy on invent orange is ~6:1; the previous white text was < 3:1 */
      .menu .menu-item:hover,
      .menu .menu-item:focus-visible {
        color: var(--primary-color-1);
        background-color: var(--ddd-theme-default-inventOrange);
        text-decoration: none;
      }

      .menu .menu-item:focus-visible {
        outline: 3px solid var(--primary-color-3);
        outline-offset: 2px;
      }

      .skip-link,
      .skip-link:any-link {
        position: absolute;
        top: 8px;
        left: 8px;
        z-index: 1000;
        padding: 8px 16px;
        background-color: var(--primary-color-3);
        color: var(--primary-color-1);
        font-weight: bold;
        transform: translateY(-200%);
      }

      .skip-link:focus {
        transform: none;
      }

      main:focus,
      page-section:focus {
        outline: none;
      }

      simple-cta {
        margin-right: 8px;
        padding: 0;
      }

      .square {
        color: white;
        background-color: var(--hax-psu-square-1);
        margin: 0 8px;
        border: 6px solid black;
      }

      .square-2 {
        background-color: var(--hax-psu-square-2);
      }

      .square-3 {
        background-color: var(--hax-psu-square-3);
        color: black;
      }

      future-terminal-text {
        overflow-wrap: break-all;
        line-height: 36px;
        height: 36px;
        text-align: left;
        --future-terminal-text-color: white;
      }

      count-up {
        text-align: center;
        width: 200px;
        min-height: 200px;
        font-size: 20px;
        color: white;
        padding: 16px;
        --count-up-number-font-weight: 500;
        --count-up-number-font-size: 64px;
        --count-up-color: white;
      }

      .square-3 count-up {
        color: black;
        --count-up-color: black;        
      }

      footer {
        background-image: linear-gradient(180deg,#002e69 0%,#001e44 60%)!important;
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-4xs);
        overflow: hidden;
        width: 100%;
        border-bottom: solid var(--ddd-spacing-2) var(--secondary-color-2);
      }
      .footer-inner {
        width: 80%;
        max-width: 1080px;
        margin: auto;
        position: relative;
        padding: var(--ddd-spacing-10);
      }
      .footer-logo {
        float: left;
        max-width: 160px;
        margin-right: 2em;
        padding-top: var(--ddd-spacing-5);
      }
      footer a,
      footer a:-webkit-any-link {
        font-family: var(--ddd-font-navigation);
        font-size: var(--ddd-font-size-4xs);

        color: var(--link-color-2);
        font-weight: normal;
        text-decoration: none;
      }
      footer a:hover,
      footer a:hover:-webkit-any-link {
        text-decoration: underline;
      }
      footer a:focus-visible {
        outline: 2px solid var(--primary-color-3);
        outline-offset: 2px;
      }
      footer ul {
        display: block;
        list-style: none;
        padding: 0.5rem 0;
        margin: 0;
      }
      footer ul li {
        display: inline-block;
        border-right: 1px solid #314d64;
        padding: 0 8px;
        margin-left: 0;
      }
      footer img {
        margin: 0 auto 0;
        width: 168px;
        max-width: 100%;
        height: auto;
      }
      footer ul li:first-child {
        padding-left: 0;
      }
      footer ul li:last-child {
        border-right: none;
        padding-right: 0;
      }

      video-player {
        font-size: var(--ddd-font-size-4xs);
      }

      #top {
        position: fixed;
        right: 0;
        bottom: 125px;
        z-index: 10000;
        --simple-icon-width: 48px;
        --simple-icon-height: 48px;
        --simple-icon-button-border-radius: none;
      }

      details summary {
        padding: 6px;
        margin: 16px 0 0 0;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        color: black;
      }

      details summary:hover,
      details summary:focus {
        background-color: var(--bg-color-2);
      }

      details[open] summary:hover,
      details[open] summary:focus {
        background-color: light-dark(
      var(--ddd-theme-default-limestoneMaxLight),
      var(--ddd-theme-default-potentialMidnight)
    );
      }

      details[open] summary ~ * {
        padding: 16px;
        background-color: var(--bg-color-2);
      }

      @media (prefers-reduced-motion: no-preference) {
        details[open] summary ~ * {
          animation: sweep .5s ease-in-out;
        }
      }

      .rpg-container {
        margin-bottom: 32px;
        display: flex;
        justify-content: space-evenly;
      }

      @keyframes sweep {
        0%    {opacity: 0; margin-left: -10px}
        100%  {opacity: 1; margin-left: 0px}
      }

      @media (max-width: 1400px) {
        .menu {
          margin-right: 0px;
          margin-top: 4px;
        }
        .menu .menu-item {
          margin: 0px 4px;
        }
      }

      @media (max-width: 1200px) {
        .logo {
          width: 150px;
        }
        .menu .menu-item {
          font-size: 16px;
        }  
      }

      @media (max-width: 1000px) {
        .logo {
          width: 100px;
        }
        .menu .menu-item {
          padding: 4px 8px;
        }  
      }

      @media (max-width: 768px) {

        play-list {
          padding: 4px;
        }

        .menu .menu-item {
          margin: 0px 4px;
          padding: 4px 8px;
          font-size: 12px;
          height: 48px;
        }

        #section-2,
        #section-3,
        #section-5,
        #section-7 {
          --page-section-content-padding: 0 2%;
          --page-section-content-width: 90%;
          --page-section-content-max-width: 90%;
        }
        #section-3 .container count-up {
          width: unset;
          --count-up-number-font-size: 26px;
        }
        .section-style-1 {
          width: 100%;
          padding: 16px 0;
        }

        page-section p {
          line-height: 24px;
          font-size: var(--ddd-font-size-4xs) !important;
          margin: 0 0 24px 0;
        }
        h3,h4,h5,h6 {
          padding: 0 0 8px 0;
          line-height: 32px;
          font-size: var(--ddd-font-size-3xs);
        }
      }

      @media (max-width: 780px) and (orientation: landscape) {
        page-section.top {
          --page-section-padding: 0;
          --page-section-content-padding: 0;
        }
        .section.top h1 .text {
          font-size: var(--ddd-font-size-ml);
        }

        .section.top h1 .hax {
          font-size: var(--ddd-font-size-l);          
        }

        .section.top h1 .create {
          font-size: var(--ddd-font-size-xs);
        }
        p[slot="entice"] {
          display: none;
        }
        #top {
          bottom: 24px;
          --simple-icon-width: 32px;
          --simple-icon-height: 32px;
        }
      }

      @media (max-width: 640px) {
        .menu .menu-item.menu-login {
          display: none;
        }
        #top {
        bottom: 36px;
        --simple-icon-width: 20px;
        --simple-icon-height: 20px;
      }
        details {
          max-height: unset;
        }

        .footer-links {
          display: flex;
        }
        .footer-bottom {
          display: flex;
        }
        .footer-inner {
          padding: var(--ddd-spacing-4);
        }
        .footer-logo {
          float: unset;
          padding-top: var(--ddd-spacing-2);
        }

        .section.top {
          --ddd-spacing-20: 140px; /* hack so arrow looks better on menu being expanded on initial load */
        }

        .section.top h1 .text {
          font-size: var(--ddd-font-size-l);
        }

        .section.top h1 .hax {
          font-size: var(--ddd-font-size-m);          
        }

        .section.top h1 .create {
          display: block;
          font-size: var(--ddd-font-size-xs);
        }

        .logo-wrapper {
          position: absolute;
        }
        .menu {
          width: auto;
          margin-top: 48px;
        }
      }
    `];
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    setTimeout(() => {
      import("@haxtheweb/scroll-button/scroll-button.js");
      import("@haxtheweb/play-list/play-list.js");
      import("@haxtheweb/grid-plate/grid-plate.js");
      import("@haxtheweb/count-up/count-up.js");
      // video-player (~175KB chunk) and rpg-character are below the fold;
      // only fetch them when they are about to be seen.
      this.loadWhenNear("#section-6", () =>
        import("@haxtheweb/video-player/video-player.js"),
      );
      this.loadWhenNear(".rpg-container", () =>
        import("@haxtheweb/rpg-character/rpg-character.js"),
      );
      this.renderExamplesTemplate();
      setTimeout(() => {
        if (this.shadowRoot && window.location.hash) {
          const nextTarget = this.shadowRoot.querySelector(`${window.location.hash}`);
          if (nextTarget && nextTarget.scrollIntoView) {
            nextTarget.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 1000);
    }, 0);
  }

  // run loader() once the element matching selector is close to (or inside)
  // the viewport. rpg-character sits inside a closed <details>, which has no
  // layout box until opened, so we also listen for the details toggle.
  loadWhenNear(selector, loader) {
    const target = this.shadowRoot.querySelector(selector);
    let loaded = false;
    const load = () => {
      if (!loaded) {
        loaded = true;
        loader();
      }
    };
    if (!target || !("IntersectionObserver" in globalThis)) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(target);
    const details = target.closest("details");
    if (details) {
      details.addEventListener("toggle", () => {
        if (details.open) {
          io.disconnect();
          load();
        }
      });
    }
  }

    // because of how processed <template> tags work in lit (illegal) we have to specialized way of rendering
  // so that the play-list element is empty for a second and then we template stamp it into placee
  renderExamplesTemplate() {
    let template = document.createElement("template");
    render(
      html`${this.examples.map(
        (item) =>
          html`
            <div part="site-wrapper">
              <div part="site-details">
                <a href="${item.url}" target="_blank" tabindex="-1" aria-hidden="true">
                  <simple-img height="250" width="400" quality="40" src="${makeUrl(screenshotRelPath(item))}" alt=""></simple-img>
                </a>
                <simple-cta slot="buttons" part="simple-cta" target="_blank" link="${item.url}" hotline filled outlined>${item.title}</simple-cta>
                <div part="site-type"><strong>${item.type}</strong></div>
                <p part="site-description">${item.description}</p>
              </div>
            </div>`
      )}`,
      template
    );
    this.shadowRoot
      .querySelector("#examplestemplate")
      .appendChild(template);
  }

  constructor() {
    super();
    globalThis.addEventListener(
      "hashchange",
      () => {
        setTimeout(() => {
          if (this.shadowRoot && globalThis.location.hash) {
            // the hash is user-controlled; an invalid selector throws
            try {
              const nextTarget = this.shadowRoot.querySelector(`${globalThis.location.hash}`);
              this.focusSection(nextTarget);
            } catch (e) {
              // ignore hashes that are not valid CSS selectors
            }
          }
        }, 0);
      },
      false,
    );
    this.title = 'HAX @ PSU';
    this.examples = examples;
    this.stats = {};
    this.year = new Date().getFullYear();
    this.image = '';
    // these stats come from nightly rebuilds against STAGING data
    // to avoid computation on live but is mirrored content from day prior
    fetch(`https://open-apis.hax.cloud/api/services/stats/haxPsuUsage`).then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        this.stats = null;
      }
    }
    ).then((data) => {
      this.stats = data.data.overall;
    }).catch((e) => {
      this.stats = null;
    });
    // the glitch/word-swap effect is decorative motion; skip it entirely for
    // people who ask the OS for reduced motion (WCAG 2.2.2 / 2.3.3)
    if (prefersReducedMotion()) {
      return;
    }
    setTimeout(() => {
      this.shadowRoot.querySelector('.hax')._doGlitch();
    }, 300);
    setTimeout(() => {
      this.shadowRoot.querySelector('.hax')._doGlitch();
    }, 5000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.hax')._doGlitch();
    }, 8000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.hax')._doGlitch();
    }, 11000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.hax')._doGlitch();
    }, 10000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.create').innerHTML = "COURSES";
      this.shadowRoot.querySelector('.create')._doGlitch();
    }, 3000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.create').innerHTML = "PORTFOLIOS";
      this.shadowRoot.querySelector('.create')._doGlitch();
    }, 6000);
    setTimeout(() => {
      this.shadowRoot.querySelector('.create').innerHTML = "ANYTHING";
      this.shadowRoot.querySelector('.create')._doGlitch();
    }, 9000);
  }

  // scroll a section into view and move keyboard focus to it so screen
  // reader / keyboard users land where sighted users see the page jump
  focusSection(target) {
    if (target && target.scrollIntoView) {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });
    }
  }

  skipToMain(e) {
    e.preventDefault();
    this.focusSection(this.shadowRoot.querySelector("main"));
  }

  render() {
    return html`
    <header>
      <a class="skip-link" href="#main" @click="${this.skipToMain}">Skip to main content</a>
      <div class="logo-wrapper">
        <a href="https://www.psu.edu" title="Penn State" role="link">
          <img decoding="async" width="400" height="126" src="${makeUrl('images/Penn-State-Mark.png')}" alt="Nittany Lion Shield Penn State Mark" class="logo" />
        </a>
      </div>
      <nav class="menu" aria-label="Main">
        <ul class="menu-list">
          <li><a href="/login.php" class="menu-item menu-login">Login</a></li>
          <li><a href="#section-2" class="menu-item">HAX</a></li>
          <li><a href="#section-3" class="menu-item">Usage</a></li>
          <li><a href="#section-4" class="menu-item">Users</a></li>
          <li><a href="#section-4b" class="menu-item">Impact</a></li>
          <li><a href="#section-5" class="menu-item">Examples</a></li>
          <li><a href="#section-6" class="menu-item">Create</a></li>
          <li><a href="#section-7" class="menu-item">About</a></li>
          <li><a href="#section-8" class="menu-item">Docs</a></li>
          <li><a href="#section-9" class="menu-item">FAQ</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <page-section id="section-1" full class="section top" filter accent-color="blue" fold scroller scroller-label="Let's learn about HAX" image="${makeUrl('images/lion-statue.webp')}">
        <h1><span class="text">Create <future-terminal-text white glitch class="create">WEBSITES</future-terminal-text></span>
          <span class="line">
            <span class="text">with </span><future-terminal-text glitch class="hax">HAX</future-terminal-text>
          </span>
        </h1>
        <p slot="entice">Part of <strong>Penn State</strong>?</p>
        <simple-cta slot="entice" id="psubtn" link="/login.php">Login</simple-cta>
        <simple-cta hide-icon data-primary="21" slot="buttons" link="https://github.com/haxtheweb" target="_blank">Open Source</simple-cta>
        <simple-cta hide-icon data-primary="11" slot="buttons" link="https://haxtheweb.org/">Docs</simple-cta>
      </page-section>
      <page-section id="section-2" class="section" scroller scroller-label="By the numbers">
        <div class="section-style-1">
          <h2 data-design-treatment="horz-full" data-primary="7">What is HAX?</h2>
          <p><strong>A standards-based publishing platform for <em>web authoring</em> and <em>content ownership</em>.</strong></p>
          <p>HAX is Penn State's open-source web authoring platform for accessible, standards-based publishing. It helps teams publish faster without sacrificing quality through portable content and long-term ownership not tied to a single vendor.</p>
          <p>HAX supports teaching, research, outreach, and student development with a shared platform that scales from one course site to institution-wide initiatives.</p>
          <h3 data-design-treatment="horz-50p" data-primary="16">Part of Penn State?</h3>
          <p>
            <simple-cta data-primary="8" data-accent="3" hotline filled outlined slot="buttons" link="/login.php">Log in to get started</simple-cta>
          </p>
          <h4 data-design-treatment="horz-25p" data-primary="18">Prefer command line?</h4>
          <pre><code><strong>npm install --global @haxtheweb/create
hax start
</strong></code></pre>
        </div>
      </page-section>
      <page-section id="section-3" class="section">
      ${this.stats != null ? html`
        <h2>HAX keeps growing!</h2>
        <div class="container">
          <div class="square">
            <count-up end="${this.stats.site_count}" suffixtext=" sites">
              <div slot="suffix">Built with HAX</div>
            </count-up>
          </div>
          <div class="square square-2">
            <count-up end="${this.stats.user_count}" suffixtext=" users">
              <div slot="suffix">Creating with HAX</div>
            </count-up>
          </div>
          <div class="square square-3">
            <count-up end="${this.stats.total_pages}" suffixtext=" pages">
              <div slot="suffix">of unique content</div>
            </count-up>
          </div>
        </div>
        ` : nothing}
      </page-section>
      <page-section id="section-4" accent-color="blue" bg="var(--primary-color-2)" image="" scroller scroller-label="Institutional impact" filter fold class="section">
        <h2>Built for every role at Penn State</h2>
        <grid-plate layout="1-1-1" style="margin-top:40px;">
          <p slot="col-1">
            <strong>Faculty</strong> - Create and update accessible course materials quickly. Reuse content across semesters, keep ownership of your work, and focus on teaching instead of platform complexity.
          </p>
          <p slot="col-1"><strong>Focus on teaching</strong>, <em>not complexity!</em></p>
          <p slot="col-2">
            <strong>Students</strong> - Build portfolios, resumes, and project sites you can take with you beyond graduation. HAX is portable and lightweight, and it gives students meaningful ways to learn by doing while contributing to a vibrant campus publishing community.
          </p>
          <p slot="col-3">
            <strong>Staff</strong> - Build a department website, a project website, or a personal website for a short-term initiative,
            anything you need. Set up a quick site to talk about a project, download the site and host it on another server.
            Host content from github or anywhere else. HAX is there to help you get your job done faster with less training.
          </p>
        </grid-plate>
      </page-section>
      <page-section id="section-4b" class="section" preset="lines">
        <div class="section-style-1">
          <h2>Institutional impact</h2>
          <p>HAX combines academic flexibility with operational discipline. It is supported through cross-college collaboration and designed for long-term maintainability.</p>
          <ul>
            <li>Open-source and portable architecture that reduces vendor lock-in risk</li>
            <li>Accessibility-forward publishing practices</li>
            <li>Shared governance across participating units</li>
            <li>Demonstrated adoption across courses, programs, and public-facing sites</li>
          </ul>
          <p>
            <simple-cta data-primary="8" data-accent="3" hotline filled outlined slot="buttons" link="mailto:bmr1@psu.edu">Discuss adoption for your unit</simple-cta>
          </p>
        </div>
      </page-section>
      <page-section id="section-5" class="section" scroller scroller-label="Watch how to make a site">
        <h2>Examples</h2>
        <p>Here are some examples of real courses and websites using HAX in production.</p>
        <play-list id="examplestemplate" loop pagination></play-list>
      </page-section>
      <page-section id="section-6" class="section" preset="video">
        <h2>Got 20 seconds?</h2>
        <video-player source="https://www.youtube.com/watch?v=fZK3UiOcvag" media-title="Creating your first HAX site in 20 seconds"></video-player>
      </page-section>
      <page-section id="section-7" class="section" preset="lines">
        <grid-plate layout="1-1">
          <div slot="col-1">
            <h2>About</h2>
            <p>
              HAX is a service provided through a collaboration between 
              <a href="https://arts.psu.edu/" target="_blank"><mark>Penn State College of Arts and Architecture</mark></a>,
              <a href="https://ist.psu.edu/" target="_blank"><mark data-primary="1">College of Information Sciences and Technology</mark></a>,
              <a href="https://ed.psu.edu/" target="_blank"><mark data-primary="18">College of Education</mark></a>,
              <a href="https://science.psu.edu/" target="_blank"><strong>Eberly College of Science</strong></a>, and
              <a href="https://libraries.psu.edu/" target="_blank"><strong>University Libraries</strong></a>.
              The platform is powered by <em>HAXcms</em>, originally developed to power 100s of high scale online courses.
            </p>
            <h3>Interested in collaboration?</h3>
            <p>Contact <a href="mailto:bmr1@psu.edu">Bill Rose, Product Owner</a>.</p>
          </div>
          <div slot="col-2">
            <h2>Privacy policy</h2>
            <p>
            Penn State IT does not monitor websites and does not assume responsibility for any published content.
            The content authors are responsible for the content of their websites.
            Use of this service is governed by <a href="https://security.psu.edu/awareness/psu-policies/" target="_blank" rel="noopener">Penn State policies and guidelines</a>, including 
            <a href="https://policy.psu.edu/policies/ad54" target="_blank" rel="noopener">Penn State IT Web Services Policy</a>.<br/>
            All pages must be compliant with <a href="https://policies.psu.edu/policies/ad69" target="_blank" rel="noopener">Accessibility Standards, Policy AD69</a>.
            </p>
          </div>
        </grid-plate>
      </page-section>
      <page-section id="section-8" class="section" preset="antihero" fold>
      <h2>Dig in to learn more about HAX</h2>
        <p>Need more tutorials? Dig into the <a href="https://haxtheweb.org/welcome">full documentation and user blocks section</a> to learn more about how HAX can help you!</p>
        <ul>
          <li><a href="https://haxtheweb.org/tutorials/migrate-data-to-hax">Migrating content to HAX</a></li>
          <li><a href="https://haxtheweb.org/tutorials/block-usage">Block tutorials</a></li>
          <li><a href="https://haxtheweb.org/the-gallery-of-online-excellence">The Gallery of Online Excellence</a></li>
        </ul>
      </page-section>
        <page-section id="section-9" class="section">
      <div class="section-style-1">
          <h2>Frequently Asked Questions</h2>
          <hr class="side-line" />
          <details>
            <summary>
              Who can use HAX?
            </summary>
            <p>
              Anyone, anywhere! Thanks to HAX being open source, all you need is a web server and a domain name to get started. We also support publishing directly to GitHub pages and other static publishing tools for advanced developer use-cases. If you are part of Penn State though you can just click <a href="/login.php">log in</a> to get started immediately!
            </p>
          </details>
          <details>
            <summary>
              Who supports HAX?
            </summary>
            <p>
              The HAX user community is supported internal to Penn State by a collaboration between several units including the College of Arts and Architecture,
              College of Information Sciences and Technology, College of Education, Eberly College of Science, and University Libraries. HAX also receives contributions from groups outside of Penn State including Buttercups LLC and community members at large.
            </p>
          </details>
          <details>
            <summary>
              How do I join the community?
            </summary>
            <p>
              Join our community Discord channel to get support from the community and the HAX team. <a href="https://discord.gg/aCGxmRHEJP">Join the HAX Discord</a>
            </p>
          </details>
          <details>
            <summary>
              Why was HAX created?
            </summary>
            <div>
              <p>
                HAX is a response to a lack of products existing to meet the needs of producing accessible and engaging web content in online course environments.
                The university has a rich history of building a mix of custom, open source and buying repurposed commercial products with varying success.
              </p>
              <p>
                HAX was born out of a university Request For Information (RFI) that sought to build a custom Drupal Instructional Content management System (iCMS).
                After requirements were gathered by stakeholders across the university, it was determined that the best path forward was to build a new kind of solution
                as the system requirements described were far beyond what any commercial product was offering, and no vendors responded to the Request for proposal after initial RFI process.
              </p>
            </div>
          </details>
          <details>
            <summary>
              How are decisions made?
            </summary>
            <p>
              Decisions about the platform are influenced by a mix of needs from students, faculty and staff either taking courses delivered via the platform or actively building material with the platform.
              The direction of HAX is steered by the <em>Core Product Development team</em> which meets monthly and is made up of representatives from any
              group contributing development, design, or other skillsets toward the platform's development and sustainment. If you would like to
              join the <em>Core Product Development team</em> please contact <a href="mailto:bmr1@psu.edu">Bill Rose, Product Owner</a>.
            </p>
          </details>
          <details>
            <summary>
              What's with the 8-bit RPG characters?
            </summary>
            <div>
            <p>Our 8-bit vibe was a design challenge presented to four College of IST students in the Spring of 2022. They were tasked with
              creating an over-world design that was fun, inviting, creative, and unique. The team took these requirements and built an
              experience that is playful, easy to use, and feels more like playing a video game than building a website. This inspired the
              creation of future iterations of the system which get more professional with each release, yet still retain the playful aspects
              at times to remind us of who we are building for.
            </p>
            <div class="rpg-container">
              <rpg-character></rpg-character>
              <rpg-character></rpg-character>
              <rpg-character></rpg-character>
              <rpg-character></rpg-character>
            </div>
            <p>Much like 8-bit video games were designed to be approachable and fun for all ages,
              HAX is designed to be approachable and fun for all skill levels! Each RPG style character is unique to the user logging in and helps provide a humanizing touch. Websites produced by HAX can be a mix of professional and playful
              but the 8-bit design helps you designate between the admin task and what end-users see.
            </p>
            </div>
          </details>
        </div>
      </page-section>
      </main>
      <footer>
      <div class="footer-inner">
        <div class="footer-logo">
          <a href="https://www.psu.edu" title="Penn State" role="link">
            <img loading="lazy" decoding="async" width="400" height="126" src="${makeUrl('images/Penn-State-Mark.png')}" alt="Nittany Lion Shield Penn State Mark" class="logo" />
          </a>
        </div>
        <div class="footer-left">
          <ul class="footer-links">
            <li><a href="https://www.psu.edu/web-privacy-statement">Privacy Statement</a></li>
            <li><a href="https://policy.psu.edu/policies/ad85">Non Discrimination</a></li>
            <li><a href="https://www.psu.edu/accessibilitystatement">Accessibility</a></li>
            <li><a href="https://policy.psu.edu/policies/hr11">Equal Opportunity</a></li>
            <li><a href="https://www.psu.edu/legal-statements">Legal Statements</a></li>
          </ul>
          <ul class="footer-bottom">
            <li><a href="https://www.psu.edu/copyright-information/index.html" role="link">The Pennsylvania State University © <span id="YEAR">${this.year}</span></a></li>
            <li><a href="/login.php" role="link">Login</a></li>
            <li class="footer-svg"><img loading="lazy" decoding="async" src="${makeUrl('images/we-are-penn-state.svg')}" alt="We Are Penn State"></li>
          </ul>
        </div>
      </div>
      <scroll-button id="top" label="Back to top"></scroll-button>
    </footer>
    `;
  }
}
function prefersReducedMotion() {
  return Boolean(
    globalThis.matchMedia &&
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

// make URL for build routine accurate
function makeUrl(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}

customElements.define('hax-psu', HaxPsu);
