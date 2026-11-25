/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * The hax.psu.edu homepage: Penn State's front door to HAX. Built from real
 * HAX elements (network bar, marketing blocks, rpg-character, un-sdg) plus
 * the psu-* pieces beside this file.
 */
import { html, css, nothing } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { loadFontFamily } from "@haxtheweb/d-d-d/lib/fonts.js";
import "@haxtheweb/future-terminal-text/future-terminal-text.js";
import "@haxtheweb/un-sdg/un-sdg.js";
import "@haxtheweb/simple-icon/lib/simple-icon-lite.js";
import "@haxtheweb/simple-icon/lib/simple-icons.js";
import "@haxtheweb/hax-iconset/lib/simple-hax-iconset.js";
import "@haxtheweb/hax-marketing-theme/lib/hax-marketing-blocks.js";
import "@haxtheweb/hax-marketing-theme/lib/hax-story-link.js";
import {
  HAX_NETWORK,
  haxNetworkGlyph,
  HaxNetworkGlyphStyles,
} from "@haxtheweb/hax-network-bar/lib/hax-network.js";
import {
  futureTraveler,
  HaxFutureTravelerStyles,
} from "@haxtheweb/hax-network-bar/lib/hax-future-traveler.js";
import "./psu-network-bar.js";
import "./psu-peek.js";
import "./psu-voices.js";
import { examples } from "./examples.mjs";

const CLOUD = "https://hax.cloud/";
// usage numbers the HAX stats job writes on this server; same origin, so
// nothing is asked of another host (open-apis.hax.cloud used to relay them)
const STATS_URL = "/stats/stats.json";
const DISCORD = "https://discord.gg/aCGxmRHEJP";

// ways into HAX Lab
const WAYS = [
  {
    name: "Drop in to open office hours",
    preset: "scientist",
    seed: "office hours",
    color: "skyLight",
    link: DISCORD,
    label: "Join the Discord",
    text: "Online every Monday, Wednesday and Friday, noon to 4 p.m. Eastern. Many contributors start here without ever taking a class.",
  },
  {
    name: "Independent study or internship",
    preset: "future-traveler",
    seed: "intern",
    color: "alertImmediate",
    link: "https://lab.hax.cloud/",
    label: "Meet HAX Lab",
    text: "Build a real feature that ships to hundreds of sites. Alumni now work at Red Hat, Adobe, IBM, Ford and PennDOT.",
  },
  {
    name: "Bring your club",
    preset: "artist",
    seed: "uxdc",
    color: "shrineLight",
    link: `${CLOUD}stories/1eb915c8`,
    label: "See what clubs did",
    text: "Security, UX, design: student clubs bring their own passion and HAX gives them a real problem to work on.",
  },
  {
    name: "Faculty: fund a student project",
    preset: "graduate",
    seed: "faculty grant",
    color: "slateMaxLight",
    link: `${CLOUD}stories/59022035`,
    label: "See faculty grants",
    text: "Faculty fund students to solve their own teaching problems, and HAX gains a capability everyone can use.",
  },
];

// the students the SIIP talk follows, each as the character HAX gives them
const STUDENTS = [
  {
    name: "Jimmy Kane",
    seed: "liljimmyk99",
    story: "stories/ee450a19",
    color: "skyLight",
    text: "Led the four-student team that built the first Site Dashboard in one semester, the work HAX's 8-bit characters come from. Now an iOS engineer at Ford Motor Credit.",
  },
  {
    name: "Zach Dodson",
    seed: "zdodson21",
    story: "stories/a3d9550d",
    color: "alertImmediate",
    text: "Built a HAX and AI proof of concept, then sent a pull request adding a design system audit to the HAX CLI. It was part of the class within weeks.",
  },
  {
    name: "Winston White",
    seed: "winstonwumbo",
    story: "stories/325e6281",
    color: "shrineLight",
    text: "Took IST 256 in 2024, then built themes, much of the HAX CLI and skeleton templating, and TA'd the class. Now in site reliability at IBM.",
  },
];

// in their own words: every quote is on record (PRAW talks and WINS, the
// Customer Discovery 101 testimonial)
const VOICES = [
  {
    name: "Winston White",
    github: "winstonwumbo",
    role: "HAX Lab alumnus, now at IBM",
    quote: "HAX was one of the single most impactful things for my career.",
    story: "stories/325e6281",
  },
  {
    name: "Dr. Jennifer Frank",
    role: "HAX Lab faculty partner, International Student Portfolio",
    quote: "I don't have to sit there and convince anybody that this is an important project. They get it right away.",
    story: "stories/59022035",
  },
  {
    name: "Annie Hughes",
    role: "Invent Penn State LaunchBox, Customer Discovery 101",
    quote: "Now launched, our program has received overwhelmingly positive reviews from our users for both functionality and design.",
    source: "https://customerdiscovery101.launchbox.psu.edu/",
    sourceLabel: "See Customer Discovery 101",
  },
  {
    name: "Bryan Ollendyke",
    github: "btopro",
    role: "HAX platform owner",
    quote: "You should not need to know what the web is to do everything with it.",
    story: "history",
  },
];

const AA_GOALS = [
  {
    n: 1,
    name: "Build a culture of collaboration",
    story: "stories/d83bb4ec",
    subs: [
      ["1A", "Shared spaces and systems that encourage collaboration"],
      ["1B", "Cross-disciplinary collaboration in curricula, research and practice"],
      ["1C", "Collaboration that reduces administrative burden"],
    ],
  },
  {
    n: 2,
    name: "Amplify our responsibility as a cultural bridge",
    story: "stories/342ec276",
    subs: [
      ["2B", "Student experiential opportunities"],
      ["2C", "Human-centered design in courses and creative practice"],
      ["2D", "A&A's visibility and partnerships, state to global"],
    ],
  },
  {
    n: 3,
    name: "Empower learners to build the future",
    story: "stories/71ac19ae",
    subs: [
      ["3A", "Diverse career pathways through experiential learning"],
      ["3B", "Ethical AI literacy and future-ready skills"],
      ["3C", "Creativity and emerging technology for all students"],
      ["3D", "New learning models that match workforce needs"],
    ],
  },
  {
    n: 4,
    name: "Champion arts and design as research and practice",
    story: "stories/cad05bce",
    subs: [
      ["4A", "Cross-campus partnerships that raise arts and design's impact"],
      ["4B", "Recognition of A&A's creative activity and scholarship"],
      ["4C", "Human-centered use of AI in creative practice"],
    ],
  },
  {
    n: 5,
    name: "Cultivate an equitable community for all",
    story: "stories/e6680a54",
    subs: [["5B", "Remove affordability and access barriers"]],
  },
];

const PSU_PRIORITIES = [
  {
    name: "Enhancing Student Success",
    story: "stories/c319d900",
    text: "Mentoring and class experiences that carry students into careers, student clubs working on a real product, and the Learn to Flourish Hub's focus on wellness.",
  },
  {
    name: "Increasing Land-Grant Impact",
    story: "stories/bc2c7d84",
    text: "Partnerships with industry, nonprofits and communities: open packages used around the world, HAX Camp, and the faculty and donors behind the Learn to Flourish Hub.",
  },
  {
    name: "Diversity, Equity, Inclusion and Belonging",
    story: "stories/55149bcc",
    text: "Closing outcome gaps by removing barriers: a $250 textbook became a $30 fee, and pages stay fast on any device.",
  },
];

const SDGS = [
  [4, "Quality Education", "stories/0b18f2ea", "Accessible and open by default; students learn by building a real product."],
  [7, "Affordable and Clean Energy", "stories/60ba266e", "Less energy per page: web standards, offline-capable sites, services that run only when called."],
  [8, "Decent Work and Economic Growth", "stories/a67c966c", "Real-product experience that carries into industry."],
  [9, "Industry, Innovation and Infrastructure", "stories/04fbf8b9", "Hundreds of open web components and packages others reuse."],
  [10, "Reduced Inequalities", "stories/b66a6c30", "Works for everyone, on any device, whatever their ability."],
  [12, "Responsible Consumption and Production", "stories/808a5b5a", "Content outlives redesigns, so nothing gets rebuilt."],
  [17, "Partnerships for the Goals", "stories/e6c6907b", "Colleges, foundations, companies and students build it together."],
];

const UNITS = [
  ["College of Arts and Architecture", "Where HAX began, home of HAX Lab and the Office of Digital Learning.", "stories/888e2051", "https://arts.psu.edu/"],
  ["College of Information Sciences and Technology", "IST 256, plus the CCSO and UXDC student clubs.", "stories/2e9dbaf4", "https://ist.psu.edu/"],
  ["College of Health and Human Development", "Home of the Learn to Flourish Hub.", "stories/2900ac93", "https://hhd.psu.edu/"],
  ["Eberly College of Science", "14 courses and more than 1,800 pages, from BIOL 110 to PHYS 212.", "stories/d250eba0", "https://science.psu.edu/"],
  ["University Libraries", "Publishes the Digital Beaumont and Fletcher plays.", "stories/a2318746", "https://libraries.psu.edu/"],
  ["Office of Digital Learning", "Arts and Architecture's digital learning team.", "", "https://odl.aanda.psu.edu/"],
  ["Innovation Hub", "Penn State's downtown coworking space; its earlier site ran on hax.psu.edu.", "stories/26ddb6ca", "https://innovationhub.psu.edu/"],
  ["Apereo Foundation", "The open source foundation HAX belongs to.", "stories/9931c355", "https://www.apereo.org/"],
];



const NAV = [
  ["#lab", "HAX Lab"],
  ["#students", "Students"],
  ["#voices", "Voices"],
  ["#units", "Colleges"],
  ["#goals", "Goals"],
  ["#faq", "FAQ"],
];

// files under assets/, which the build copies beside the bundle
function img(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}
function reducedMotion() {
  return Boolean(
    globalThis.matchMedia &&
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

export class HaxPsu extends DDD {
  static get tag() {
    return "hax-psu";
  }
  static get properties() {
    return {
      ...super.properties,
      stats: { type: Object },
      year: { type: Number },
      _place: { type: String, state: true },
    };
  }
  constructor() {
    super();
    this.year = new Date().getFullYear();
    this.stats = null;
    this._place = "";
    globalThis.addEventListener("hashchange", () => this._goHash());
    this._outside = (e) => {
      const place = this.shadowRoot && this.shadowRoot.querySelector(".psu-place");
      if (place && !e.composedPath().includes(place)) this._place = "";
    };
    // read the numbers when the page loads; nothing is cached or stored here.
    // /stats/stats.json is what the HAX stats job last compiled.
    this._loadStats();
    // the pixel font for the hero word and game day, served by DDD (no Google)
    loadFontFamily("Press Start 2P");
  }

  async _loadStats() {
    try {
      const res = await fetch(STATS_URL);
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      this.stats = json && json.overall ? json.overall : null;
    } catch (e) {
      // the file could not be read (e.g. a preview deploy): leave the strip out
      this.stats = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("click", this._outside);
  }
  disconnectedCallback() {
    globalThis.removeEventListener("click", this._outside);
    super.disconnectedCallback();
  }

  firstUpdated(changed) {
    if (super.firstUpdated) {
      super.firstUpdated(changed);
    }
    this._lazyDefine();
    if (reducedMotion()) {
      return;
    }
    const words = ["COURSES", "PORTFOLIOS", "LABS", "ANYTHING"];
    words.forEach((w, i) => {
      setTimeout(() => {
        const el = this.shadowRoot.querySelector(".create");
        if (el) {
          el.textContent = w;
          if (el._doGlitch) el._doGlitch();
        }
      }, 2500 * (i + 1));
    });
  }

  // Elements far below the fold are defined only when the visitor nears
  // them, so their code (video-player brings a whole media player) stays off
  // the first paint. Each still renders exactly as before once it loads.
  _lazyDefine() {
    const later = [
      [".students-video", () => import("@haxtheweb/video-player/video-player.js")],
      ["psu-game-day", () => import("./psu-game-day.js")],
    ];
    const io =
      "IntersectionObserver" in globalThis
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                entry.target._lazyLoad();
              });
            },
            { rootMargin: "800px 0px" },
          )
        : null;
    const idle = globalThis.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    const pending = [];
    later.forEach(([selector, load]) => {
      const el = this.shadowRoot.querySelector(selector);
      if (!el) return;
      let loaded = false;
      el._lazyLoad = () => {
        if (loaded) return;
        loaded = true;
        load();
      };
      pending.push(el);
      if (io) io.observe(el);
      else el._lazyLoad();
    });
    // the Future Traveler only appears after scrolling, so load it once idle
    idle(() => import("./psu-traveler.js"));
    // Safety net: once the page has finished loading and gone quiet, define
    // whatever is still waiting, so screen reader and find-in-page users who
    // reach these sections without scrolling past them still get them.
    const finish = () =>
      setTimeout(
        () =>
          idle(() => {
            if (io) io.disconnect();
            pending.forEach((el) => el._lazyLoad());
          }),
        3000,
      );
    if (globalThis.document.readyState === "complete") finish();
    else globalThis.addEventListener("load", finish, { once: true });
  }

  _goHash() {
    const hash = globalThis.location.hash;
    if (!hash || hash.indexOf("#install") === 0) return;
    let target = null;
    try {
      target = this.shadowRoot.querySelector(hash);
    } catch (e) {
      target = null;
    }
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }

  _navClick(e) {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.indexOf("#") === 0) {
      e.preventDefault();
      if (globalThis.location.hash !== href) {
        globalThis.history.pushState({}, "", href);
      }
      this._goHash();
    }
  }

  _placeKey(e) {
    if (e.key === "Escape") {
      this._place = "away";
      const b = this.shadowRoot.querySelector(".psu-here");
      if (b) b.focus();
    }
  }

  static get styles() {
    return [
      super.styles,
      HaxNetworkGlyphStyles,
      HaxFutureTravelerStyles,
      css`
        :host {
          display: block;
          --psu-ink: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
          --psu-surface: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-potentialMidnight));
          --psu-soft: light-dark(var(--ddd-theme-default-slateMaxLight), var(--ddd-theme-default-nittanyNavy));
          --psu-line: light-dark(var(--ddd-theme-default-slateGray), var(--ddd-theme-default-pughBlue));
          --psu-brand: light-dark(var(--ddd-theme-default-beaverBlue), var(--ddd-theme-default-pughBlue));
          --psu-on-brand: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-nittanyNavy));
          --psu-link: light-dark(var(--ddd-theme-default-link), var(--ddd-theme-default-linkLight));
          /* the haxtheweb.org marketing blocks, in Penn State colors */
          --hm-brand: var(--psu-brand);
          --hm-on-brand: var(--psu-on-brand);
          --hm-accent: var(--ddd-theme-default-keystoneYellow);
          --hm-on-accent: var(--ddd-theme-default-coalyGray);
          --hm-edge: var(--psu-ink);
          --hm-shade: var(--psu-brand);
          color: var(--psu-ink);
          background-color: var(--psu-surface);
          font-family: var(--ddd-font-primary);
        }
        a {
          color: var(--psu-link);
          font-weight: var(--ddd-font-weight-bold);
        }
        a:focus-visible,
        button:focus-visible,
        [tabindex="-1"]:focus-visible {
          outline: var(--ddd-border-size-md) solid var(--psu-brand);
          outline-offset: 2px;
        }
        section:focus,
        main:focus {
          outline: none;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
        }
        .skip-link,
        .skip-link:any-link {
          position: absolute;
          top: var(--ddd-spacing-2);
          left: var(--ddd-spacing-2);
          z-index: 1000;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          background-color: var(--ddd-theme-default-keystoneYellow);
          color: var(--ddd-theme-default-coalyGray);
          transform: translateY(-300%);
        }
        .skip-link:focus {
          transform: none;
        }

        /* Penn State header */
        header.site {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-6);
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-white);
          flex-wrap: wrap;
        }
        header.site .mark img {
          display: block;
          height: 48px;
          width: auto;
        }
        header.site nav {
          flex: 1 1 auto;
        }
        header.site nav ul {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--ddd-spacing-1);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        header.site nav li {
          margin: 0;
          padding: 0;
        }
        header.site nav a {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          padding: 0 var(--ddd-spacing-3);
          color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-medium, 500);
          text-decoration: none;
          border-radius: var(--ddd-radius-xs);
          border-bottom: 3px solid transparent;
        }
        header.site nav a:hover,
        header.site nav a:focus-visible {
          border-bottom-color: var(--ddd-theme-default-keystoneYellow);
          background-color: var(--ddd-theme-default-beaverBlue);
          outline-color: var(--ddd-theme-default-keystoneYellow);
        }
        header.site nav a.login {
          margin-left: var(--ddd-spacing-2);
          background-color: var(--ddd-theme-default-keystoneYellow);
          color: var(--ddd-theme-default-coalyGray);
          font-weight: var(--ddd-font-weight-bold);
        }
        header.site nav a.login:hover,
        header.site nav a.login:focus-visible {
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-nittanyNavy);
        }

        /* hero */
        .hero {
          position: relative;
          color: var(--ddd-theme-default-white);
          background-color: var(--ddd-theme-default-nittanyNavy);
          background-image:
            linear-gradient(100deg, rgba(0, 30, 68, 0.97) 0%, rgba(0, 30, 68, 0.9) 48%, rgba(0, 30, 68, 0.55) 100%),
            var(--hero-image);
          background-size: cover;
          background-position: center 30%;
          overflow: hidden;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--ddd-spacing-16) var(--ddd-spacing-6) var(--ddd-spacing-16);
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          margin: 0 0 var(--ddd-spacing-4);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .hero .eyebrow {
          color: var(--ddd-theme-default-keystoneYellow);
        }
        .hero h1 {
          margin: 0;
          font-family: var(--ddd-font-navigation);
          font-size: clamp(36px, 6vw, 72px);
          line-height: 1.05;
          font-weight: var(--ddd-font-weight-bold);
        }
        .hero h1 .line {
          display: block;
        }
        .hero future-terminal-text {
          --future-terminal-text-color: var(--ddd-theme-default-keystoneYellow);
          font-family: "Press Start 2P", var(--ddd-font-navigation);
          font-size: clamp(22px, 4vw, 48px);
          font-style: normal;
          vertical-align: middle;
        }
        .hero .lede {
          max-width: 640px;
          margin: var(--ddd-spacing-6) 0;
          font-size: var(--ddd-font-size-xs);
          line-height: 1.5;
        }
        .ctas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-3);
          align-items: center;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          min-height: 48px;
          box-sizing: border-box;
          padding: 0 var(--ddd-spacing-6);
          border: var(--ddd-border-size-md) solid currentColor;
          border-radius: var(--ddd-radius-sm);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-bold);
          text-decoration: none;
          transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
        }
        .btn.primary {
          background-color: var(--ddd-theme-default-keystoneYellow);
          border-color: var(--ddd-theme-default-keystoneYellow);
          color: var(--ddd-theme-default-coalyGray);
        }
        .btn.ghost {
          color: var(--ddd-theme-default-white);
        }
        .btn:hover,
        .btn:focus-visible {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 var(--ddd-theme-default-white);
          outline: none;
        }
        .btn simple-icon-lite {
          --simple-icon-width: 20px;
          --simple-icon-height: 20px;
        }

        /* sections */
        section {
          padding: var(--ddd-spacing-16) var(--ddd-spacing-6);
          scroll-margin-top: var(--ddd-spacing-4);
        }
        section.soft {
          background-color: var(--psu-soft);
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
        }
        h2 {
          margin: 0 0 var(--ddd-spacing-4);
          font-family: var(--ddd-font-navigation);
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.1;
        }
        h2 .bar {
          display: block;
          width: 64px;
          height: 6px;
          margin-bottom: var(--ddd-spacing-4);
          background-color: var(--psu-brand);
        }
        h3 {
          margin: 0 0 var(--ddd-spacing-2);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-s);
          line-height: 1.2;
        }
        p {
          line-height: 1.6;
          font-size: var(--ddd-font-size-4xs);
        }
        .intro {
          max-width: 760px;
          font-size: var(--ddd-font-size-xs);
          line-height: 1.5;
          margin: 0 0 var(--ddd-spacing-8);
        }
        section > .wrap > .eyebrow {
          color: var(--psu-brand);
        }
        .grid {
          display: grid;
          gap: var(--ddd-spacing-6);
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        }
        .grid.four {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
        .card {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2);
          box-sizing: border-box;
          padding: var(--ddd-spacing-5);
          border: var(--ddd-border-size-md) solid var(--psu-ink);
          border-radius: var(--ddd-radius-lg);
          background-color: var(--psu-surface);
        }
        .card p {
          margin: 0;
          flex: 1 1 auto;
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-3);
          align-items: center;
          margin-top: var(--ddd-spacing-6);
        }

        /* stats */
        .stats {
          padding: var(--ddd-spacing-10) var(--ddd-spacing-6);
        }

        /* the network */
        .net {
          display: grid;
          gap: var(--ddd-spacing-4);
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .net li {
          margin: 0;
          padding: 0;
        }
        .net a {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2);
          height: 100%;
          box-sizing: border-box;
          padding: var(--ddd-spacing-4);
          border: var(--ddd-border-size-md) solid var(--psu-ink);
          border-top: 10px solid var(--prop);
          border-radius: var(--ddd-radius-md);
          background-color: var(--psu-surface);
          color: var(--psu-ink);
          text-decoration: none;
          --glyph-accent: var(--prop);
          --glyph-lit: var(--prop);
          transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
        }
        .net a:hover,
        .net a:focus-visible {
          transform: translateY(-4px);
          box-shadow: 6px 6px 0 var(--prop);
          outline: none;
        }
        .net .tile {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
        }
        .net .tile .glyph {
          width: 32px;
          height: 32px;
        }
        .net strong {
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-xs);
        }
        .net .host {
          font-size: 14px;
          font-weight: var(--ddd-font-weight-regular, 400);
        }
        .net .purpose {
          font-size: var(--ddd-font-size-4xs);
          font-weight: var(--ddd-font-weight-regular, 400);
          line-height: 1.5;
        }
        .net li.here {
          --prop: var(--ddd-theme-default-beaverBlue);
        }
        .net li.here a {
          border-top-color: var(--ddd-theme-default-beaverBlue);
          background-color: var(--psu-soft);
        }
        .net li.here .tile {
          background-color: var(--ddd-theme-default-beaverBlue);
        }
        .net li.here .tile img {
          height: 36px;
          width: auto;
        }

        /* lab */
        hax-cast {
          margin-top: var(--ddd-spacing-6);
        }
        .subhead {
          margin: var(--ddd-spacing-12) 0 var(--ddd-spacing-2);
        }

        /* SIIP */
        .siip {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: var(--ddd-spacing-10);
          align-items: start;
        }
        .siip ol {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-3);
        }
        .siip li {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: var(--ddd-spacing-3);
          align-items: center;
          margin: 0;
          padding: var(--ddd-spacing-3);
          border: var(--ddd-border-size-sm) solid var(--psu-line);
          border-radius: var(--ddd-radius-md);
          background-color: var(--psu-surface);
          font-size: var(--ddd-font-size-4xs);
          line-height: 1.5;
        }
        .siip li b {
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-s);
          color: var(--psu-brand);
          text-align: center;
        }
        .split {
          display: flex;
          height: 28px;
          margin: var(--ddd-spacing-3) 0 var(--ddd-spacing-2);
          border: 2px solid var(--psu-ink);
          border-radius: var(--ddd-radius-sm);
          overflow: hidden;
        }
        .split span {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-theme-default-coalyGray);
        }
        .split span + span {
          border-left: 2px solid var(--psu-ink);
        }
        .split .s1 { flex: 40; background-color: var(--ddd-theme-default-skyLight); }
        .split .s2 { flex: 20; background-color: var(--ddd-theme-default-alertImmediate); }
        .split .s3 { flex: 20; background-color: var(--ddd-theme-default-shrineLight); }
        .split .s4 { flex: 20; background-color: var(--ddd-theme-default-keystoneYellow); }
        .legend {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        /* goals */
        .goal-block + .goal-block {
          margin-top: var(--ddd-spacing-16);
        }
        .goal {
          border-left: 10px solid var(--psu-brand);
        }
        .goal .num {
          font-family: "Press Start 2P", var(--ddd-font-navigation);
          font-size: 14px;
          color: var(--psu-brand);
        }
        .goal ul {
          margin: var(--ddd-spacing-2) 0 var(--ddd-spacing-3);
          padding: 0;
          list-style: none;
          flex: 1 1 auto;
        }
        .goal li {
          display: flex;
          gap: var(--ddd-spacing-2);
          margin: 0 0 var(--ddd-spacing-2);
          padding: 0;
          font-size: var(--ddd-font-size-4xs);
          line-height: 1.4;
        }
        .goal li code {
          flex: none;
          min-width: 2.6em;
          padding: 2px 6px;
          border-radius: var(--ddd-radius-xs);
          background-color: var(--psu-soft);
          color: var(--psu-ink);
          font-family: var(--ddd-font-navigation);
          font-weight: var(--ddd-font-weight-bold);
          font-size: 13px;
          text-align: center;
          height: fit-content;
        }
        .sdgs {
          display: grid;
          gap: var(--ddd-spacing-4);
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        .sdg {
          display: grid;
          grid-template-columns: 88px 1fr;
          gap: var(--ddd-spacing-3);
          align-items: start;
          padding: var(--ddd-spacing-3);
          border: var(--ddd-border-size-sm) solid var(--psu-line);
          border-radius: var(--ddd-radius-md);
          background-color: var(--psu-surface);
        }
        .sdg un-sdg {
          width: 88px;
          height: 88px;
        }
        .sdg strong {
          font-family: var(--ddd-font-navigation);
        }
        .sdg p {
          margin: var(--ddd-spacing-1) 0 var(--ddd-spacing-2);
          font-size: 15px;
          line-height: 1.45;
        }

        /* units */
        .unit h3 a {
          color: var(--psu-ink);
          text-decoration-color: var(--psu-brand);
          text-decoration-thickness: 3px;
          text-underline-offset: 4px;
        }

        /* examples */
        .examples {
          display: grid;
          gap: var(--ddd-spacing-3);
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .examples li {
          margin: 0;
          padding: 0;
        }
        .examples a {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          min-height: 64px;
          box-sizing: border-box;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border: var(--ddd-border-size-md) solid var(--psu-ink);
          border-radius: var(--ddd-radius-md);
          background-color: var(--psu-surface);
          color: var(--psu-ink);
          text-decoration: none;
        }
        .examples a:hover,
        .examples a:focus-visible {
          box-shadow: 4px 4px 0 var(--psu-brand);
          outline: none;
        }
        .examples .t {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .examples .t span {
          font-size: 14px;
          font-weight: var(--ddd-font-weight-regular, 400);
        }
        .examples simple-icon-lite {
          color: var(--psu-brand);
        }

        /* faq */
        details {
          border-bottom: var(--ddd-border-size-sm) solid var(--psu-line);
        }
        summary {
          display: flex;
          align-items: center;
          min-height: 48px;
          padding: var(--ddd-spacing-2) var(--ddd-spacing-3);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-xs);
          font-weight: var(--ddd-font-weight-bold);
          cursor: pointer;
        }
        summary:hover,
        summary:focus-visible {
          background-color: var(--psu-soft);
        }
        details > div {
          padding: 0 var(--ddd-spacing-3) var(--ddd-spacing-3);
        }
        a.solo {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
        }
        .faq-chars {
          display: flex;
          gap: var(--ddd-spacing-4);
          flex-wrap: wrap;
        }

        /* footer */
        footer {
          background-color: var(--ddd-theme-default-nittanyNavy);
          background-image: linear-gradient(180deg, #002e69 0%, #001e44 60%);
          color: var(--ddd-theme-default-white);
          border-bottom: var(--ddd-spacing-2) solid var(--ddd-theme-default-beaverBlue);
        }
        .footer-inner {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-8);
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--ddd-spacing-10) var(--ddd-spacing-6);
        }
        .footer-inner img {
          width: 168px;
          height: auto;
        }
        footer ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          list-style: none;
          margin: 0 0 var(--ddd-spacing-3);
          padding: 0;
        }
        footer li {
          margin: 0;
          padding: 0 var(--ddd-spacing-3) 0 0;
        }
        footer a {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          color: var(--ddd-theme-default-white);
          font-size: 14px;
          font-weight: var(--ddd-font-weight-regular, 400);
        }
        footer a:focus-visible {
          outline-color: var(--ddd-theme-default-keystoneYellow);
        }
        footer p {
          margin: 0;
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .siip {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 700px) {
          header.site {
            padding: var(--ddd-spacing-3);
          }
          header.site .mark img {
            height: 40px;
          }
          header.site nav a {
            padding: 0 var(--ddd-spacing-2);
            font-size: 14px;
          }
          section {
            padding: var(--ddd-spacing-10) var(--ddd-spacing-4);
          }
          .hero-inner {
            padding: var(--ddd-spacing-10) var(--ddd-spacing-4) var(--ddd-spacing-10);
          }
          .sdgs,
          .examples {
            grid-template-columns: 1fr;
          }
          .sdg {
            grid-template-columns: 64px 1fr;
          }
          .sdg un-sdg {
            width: 64px;
            height: 64px;
          }
        }

        /* the Penn State place in the network bar: lit, like the site you
           are on, with the same kind of card the bar's own places show */
        .psu-place {
          position: relative;
          display: inline-flex;
        }
        .psu-here {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          box-sizing: border-box;
          height: 44px;
          padding: 0 var(--ddd-spacing-3) 0 var(--ddd-spacing-2);
          border: 2px solid var(--ddd-theme-default-white);
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-theme-default-beaverBlue);
          color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
          font-size: 14px;
          font-weight: var(--ddd-font-weight-bold);
          cursor: pointer;
          transition: box-shadow 0.2s ease-out;
        }
        .psu-here img {
          height: 30px;
          width: auto;
          transition: transform 0.25s ease-out;
        }
        .psu-place:hover .psu-here,
        .psu-here:focus-visible {
          box-shadow: 0 0 0 3px var(--ddd-theme-default-keystoneYellow);
          outline: none;
        }
        .psu-place:hover .psu-here img,
        .psu-here:focus-visible img {
          transform: rotate(-8deg) scale(1.08);
        }
        .psu-card {
          display: none;
          position: absolute;
          top: calc(100% + var(--ddd-spacing-2));
          left: 0;
          z-index: 6;
          width: 290px;
          box-sizing: border-box;
          padding: var(--ddd-spacing-3);
          border: 1px solid #5c5c5c;
          border-top: 4px solid var(--ddd-theme-default-beaverBlue);
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          white-space: normal;
          font-size: 14px;
          line-height: 1.4;
        }
        .psu-card::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: calc(-1 * var(--ddd-spacing-3));
          height: var(--ddd-spacing-3);
        }
        .psu-place:hover .psu-card,
        .psu-place:focus-within .psu-card,
        .psu-place.open .psu-card {
          display: grid;
          gap: var(--ddd-spacing-1);
        }
        .psu-place.away .psu-card {
          display: none;
        }
        .psu-card .head {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0 var(--ddd-spacing-2);
        }
        .psu-card strong {
          font-family: var(--ddd-font-navigation);
          font-size: 16px;
        }
        .psu-card .host {
          color: #c8c8c8;
        }
        .psu-card .you {
          justify-self: start;
          padding: 0 var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-rounded);
          background-color: var(--ddd-theme-default-beaverBlue);
          color: var(--ddd-theme-default-white);
          font-weight: var(--ddd-font-weight-bold);
        }
        .psu-card a {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-1);
          min-height: 32px;
          color: var(--ddd-theme-default-keystoneYellow);
          font-weight: var(--ddd-font-weight-bold);
        }
        .psu-card a:focus-visible {
          outline: 2px solid var(--ddd-theme-default-keystoneYellow);
          outline-offset: 2px;
        }
        .psu-card simple-icon-lite {
          --simple-icon-width: 16px;
          --simple-icon-height: 16px;
        }
        @media (max-width: 599px) {
          .psu-here {
            padding: 0 var(--ddd-spacing-2);
          }
          .psu-here .word {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip-path: inset(50%);
          }
          .psu-card {
            width: min(290px, calc(100vw - 24px));
          }
        }

        /* office hours */
        .hours {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: var(--ddd-spacing-5);
          align-items: center;
          margin: var(--ddd-spacing-8) 0 0;
          padding: var(--ddd-spacing-5) var(--ddd-spacing-6);
          border-radius: var(--ddd-radius-lg);
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-white);
        }
        .hours .when {
          font-family: var(--ddd-font-navigation);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: var(--ddd-font-weight-bold);
          line-height: 1.15;
          color: var(--ddd-theme-default-keystoneYellow);
        }
        .hours p {
          margin: 0 0 var(--ddd-spacing-2);
          font-size: 17px;
        }
        .hours a {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          color: var(--ddd-theme-default-white);
        }
        .hours a:focus-visible {
          outline-color: var(--ddd-theme-default-keystoneYellow);
        }

        /* students */
        .students-video {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: var(--ddd-spacing-8);
          align-items: start;
          margin-top: var(--ddd-spacing-10);
        }
        .students-video video-player {
          display: block;
        }
        .students-video video-player:not(:defined) {
          aspect-ratio: 16 / 9;
        }
        .students-video p {
          font-size: 17px;
        }
        .wide-link {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          min-height: 44px;
        }
        .wide-link simple-icon-lite {
          --simple-icon-width: 18px;
          --simple-icon-height: 18px;
        }


        /* game day sits at the bottom: fun, not front and center */
        #game-day {
          border-top: var(--ddd-border-size-md) solid var(--psu-line);
        }


        /* peeking characters live in each section's own bottom padding */
        section {
          position: relative;
        }
        section > psu-peek {
          --psu-peek-height: var(--ddd-spacing-16);
          --psu-peek-height-small: var(--ddd-spacing-10);
        }
        .ft-mark {
          display: inline-flex;
          --future-traveler-size: 28px;
        }

        /* students: their story, then yours */
        .videos {
          display: grid;
          gap: var(--ddd-spacing-6);
        }
        .your-turn ul.more {
          list-style: none;
          margin: var(--ddd-spacing-4) 0 0;
          padding: 0;
        }
        .your-turn ul.more li {
          margin: 0 0 var(--ddd-spacing-2);
          padding: 0;
        }
        .your-turn ul.more a {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          min-height: 32px;
        }
        .your-turn ul.more simple-icon-lite {
          --simple-icon-width: 18px;
          --simple-icon-height: 18px;
        }
        /* on the light ground the yellow fill needs an ink edge to read as a button */
        .your-turn .btn.primary {
          color: var(--ddd-theme-default-coalyGray);
          border-color: var(--psu-ink);
        }
        .your-turn .btn.primary:hover,
        .your-turn .btn.primary:focus-visible {
          box-shadow: 4px 4px 0 var(--psu-brand);
        }

        /* goals: plain bullets, the plan's own reference after each */
        .path {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-3);
          list-style: none;
          margin: 0 0 var(--ddd-spacing-4);
          padding: 0;
          counter-reset: none;
        }
        .path li {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          margin: 0;
          padding: 0;
        }
        .path li + li::before {
          content: "→";
          font-size: 24px;
          font-weight: var(--ddd-font-weight-bold);
          color: var(--psu-brand);
        }
        .path a {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          min-height: 44px;
          padding: 0 var(--ddd-spacing-4) 0 var(--ddd-spacing-2);
          border: var(--ddd-border-size-md) solid var(--psu-ink);
          border-radius: var(--ddd-radius-rounded);
          background-color: var(--psu-surface);
          color: var(--psu-ink);
          font-family: var(--ddd-font-navigation);
          font-size: 17px;
          text-decoration: none;
        }
        .path a:hover,
        .path a:focus-visible {
          box-shadow: 4px 4px 0 var(--psu-brand);
        }
        .path .step {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: var(--ddd-theme-default-beaverBlue);
          color: var(--ddd-theme-default-white);
          font-size: 15px;
        }
        .goal-block {
          scroll-margin-top: var(--ddd-spacing-4);
        }
        h4 {
          margin: 0 0 var(--ddd-spacing-2);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-xs);
          line-height: 1.25;
        }
        .goal ul {
          list-style: disc;
          padding-left: 1.2em;
        }
        .goal li {
          display: list-item;
        }
        .ref {
          font-weight: var(--ddd-font-weight-regular, 400);
          font-size: 0.85em;
          white-space: nowrap;
        }

        /* we are... */
        .we-are {
          max-width: 900px;
          margin: 0 0 var(--ddd-spacing-2);
          font-family: var(--ddd-font-navigation);
          font-size: clamp(22px, 3vw, 32px);
          font-weight: var(--ddd-font-weight-bold);
          line-height: 1.25;
        }
        ul.contact {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
          gap: var(--ddd-spacing-3);
          list-style: none;
          margin: 0 0 var(--ddd-spacing-8);
          padding: 0;
        }
        ul.contact li {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-1);
          margin: 0;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border: var(--ddd-border-size-md) solid var(--psu-ink);
          border-radius: var(--ddd-radius-md);
          background-color: var(--psu-surface);
        }
        ul.contact .who {
          font-size: 15px;
        }
        ul.contact a {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          font-size: 18px;
          overflow-wrap: anywhere;
        }
        @media (max-width: 900px) {
          .students-video {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .hours {
            grid-template-columns: 1fr;
            gap: var(--ddd-spacing-2);
            padding: var(--ddd-spacing-4);
          }
        }
      `,
    ];
  }

  _netCards() {
    const ids = HAX_NETWORK.order.filter((id) => id !== "try");
    return html`<ul class="net">
      <li class="here">
        <a href="#top" @click="${this._navClick}">
          <span class="tile"><img src="${img("images/psu-shield.png")}" alt="" width="106" height="126" /></span>
          <strong>HAX at Penn State</strong>
          <span class="host">hax.psu.edu · you are here</span>
          <span class="purpose">Log in with your Penn State account and build. Hosted, supported and governed by Penn State.</span>
        </a>
      </li>
      ${ids.map((id) => {
        const p = HAX_NETWORK.properties[id];
        return html`<li style="--prop: var(--ddd-theme-default-${p.color})">
          <a class="glyph-host" href="${p.url}">
            <span class="tile">${haxNetworkGlyph(id)}</span>
            <strong>${p.label}</strong>
            <span class="host">${p.url.replace("https://", "").replace(/\/$/, "")}</span>
            <span class="purpose">${p.purpose}</span>
          </a>
        </li>`;
      })}
    </ul>`;
  }

  render() {
    return html`
      <a class="skip-link" href="#main" @click="${this._navClick}">Skip to main content</a>
      <psu-network-bar hide="try">
        <span
          slot="pre"
          class="psu-place ${this._place}"
          @keydown="${this._placeKey}"
          @mouseleave="${() => {
            if (this._place === "away") this._place = "";
          }}"
        >
          <button
            class="psu-here"
            type="button"
            aria-expanded="${this._place === "open" ? "true" : "false"}"
            aria-controls="psu-card"
            @click="${() => {
              this._place = this._place === "open" ? "" : "open";
            }}"
          >
            <img src="${img("images/psu-shield.png")}" alt="" width="106" height="126" />
            <span class="word">Penn State</span>
            <span class="sr-only">: HAX @ PSU, you are here</span>
          </button>
          <span class="psu-card" id="psu-card">
            <span class="head"><strong>HAX @ PSU</strong><span class="host">hax.psu.edu</span></span>
            <span>Penn State's HAX service. Log in with your Penn State account and build.</span>
            <span class="you">You are here</span>
            <a href="https://www.psu.edu/">psu.edu, Penn State's homepage <simple-icon-lite icon="hax:admin-external"></simple-icon-lite></a>
          </span>
        </span>
      </psu-network-bar>
      <header class="site">
        <a class="mark" href="https://www.psu.edu" title="Penn State">
          <img src="${img("images/Penn-State-Mark.png")}" alt="Penn State" width="400" height="126" />
        </a>
        <nav aria-label="Main">
          <ul>
            ${NAV.map(([h, l]) => html`<li><a href="${h}" @click="${this._navClick}">${l}</a></li>`)}
            <li><a class="login" href="/login.php">Log in</a></li>
          </ul>
        </nav>
      </header>
      <main id="main">
        <div class="hero" id="top" style="--hero-image: url('${img("images/lion-statue.webp")}')">
          <div class="hero-inner">
            <p class="eyebrow">
              <span class="ft-mark" aria-hidden="true">${futureTraveler("now")}</span>
              HAX at Penn State
            </p>
            <h1>
              <span class="line">Create <future-terminal-text glitch class="create">WEBSITES</future-terminal-text></span>
              <span class="line">with HAX</span>
            </h1>
            <p class="lede">
              Penn State's open web publishing platform. Free for every student,
              faculty and staff member, accessible by default, and the content
              is always yours to keep.
            </p>
            <div class="ctas">
              <a class="btn primary" href="/login.php">
                <simple-icon-lite icon="icons:account-circle"></simple-icon-lite>
                Log in with Penn State
              </a>
              <a class="btn ghost" href="#lab" @click="${this._navClick}">Students: join HAX Lab</a>
            </div>
          </div>
        </div>

        ${this.stats
          ? html`<div class="stats">
              <div class="wrap">
                <hax-stat-strip>
                  <hax-stat separator="," end="${this.stats.site_count}" label="sites built at Penn State" story="stories/71e80837"></hax-stat>
                  <hax-stat separator="," end="${this.stats.user_count}" label="people creating with HAX" story="stories/71e80837"></hax-stat>
                  <hax-stat separator="," end="${this.stats.total_pages}" label="pages of content" story="stories/71e80837"></hax-stat>
                  <hax-stat end="640" suffix="+" label="open web components, made here" story="stories/294e1f18"></hax-stat>
                </hax-stat-strip>
              </div>
            </div>`
          : nothing}

        <section class="soft" id="network">
          <div class="wrap">
            <p class="eyebrow">The HAX network</p>
            <h2><span class="bar"></span>One door into everything HAX</h2>
            <p class="intro">
              hax.psu.edu is where Penn State builds. The rest of the HAX network
              is open to everyone: why HAX, the brain behind it, tutorials, every
              block, and the art that started it all.
            </p>
            ${this._netCards()}
          </div>
          <psu-peek side="right" preset="hockey" seed="peek-one"></psu-peek>
        </section>

        <section id="lab">
          <div class="wrap">
            <p class="eyebrow">HAX Lab</p>
            <h2><span class="bar"></span>Don't just use it. Build it.</h2>
            <p class="intro">
              HAX Lab is where students and contributors build HAX itself, through
              courses, independent studies, internships and clubs. What you make
              ships to hundreds of real sites, with your name on it.
            </p>
            <hax-cast>
              ${WAYS.map(
                (w) => html`<hax-cast-member
                  name="${w.name}"
                  preset="${w.preset}"
                  seed="${w.seed}"
                  color="${w.color}"
                  link="${w.link}"
                  label="${w.label}"
                ><p>${w.text}</p></hax-cast-member>`,
              )}
            </hax-cast>
            <div class="hours">
              <div class="when">Mon · Wed · Fri<br />Noon to 4 p.m. ET</div>
              <div>
                <p><strong>Open office hours, online.</strong> Drop in with a question, an idea or a bug and leave with something shipped.</p>
                <p>Want to come in person? Ask in the Discord.</p>
                <a href="${DISCORD}">Join the HAX Discord</a>
              </div>
            </div>
          </div>
        </section>

        <section class="soft" id="students">
          <div class="wrap">
            <p class="eyebrow">Student success</p>
            <h2><span class="bar"></span>Students who shipped it</h2>
            <p class="intro">
              Each character below is drawn from the student's own name, the
              same way HAX draws you when you log in.
            </p>
            <hax-cast>
              ${STUDENTS.map(
                (s) => html`<hax-cast-member
                  name="${s.name}"
                  seed="${s.seed}"
                  color="${s.color}"
                  link="${CLOUD}${s.story}"
                  label="See the story"
                ><p>${s.text}</p></hax-cast-member>`,
              )}
            </hax-cast>
            <div class="students-video">
              <div class="videos">
                <video-player
                  source="https://www.youtube.com/watch?v=Db3PnqPAFjw"
                  media-title="HAX Lab student story"
                ></video-player>
                <video-player
                  source="https://www.youtube.com/watch?v=q8mbsiiwMCE"
                  media-title="HAX Lab student story, part two"
                ></video-player>
              </div>
              <div class="your-turn">
                <h3>What they did, and what you can do</h3>
                <p>
                  Jimmy, Zach and Winston started where you are: a class, an
                  office hours visit, a question. Each one shipped something
                  real that people use every day, and took that experience
                  into their careers.
                </p>
                <p><strong>Your turn.</strong> Bring an idea, a bug or just curiosity to open office hours, and leave with something shipped.</p>
                <div class="row">
                  <a class="btn primary" href="${DISCORD}">Join the HAX Discord</a>
                </div>
                <div class="row">
                  <hax-story-link story="stories/1cc711b1" about="From HAX Lab to industry" named></hax-story-link>
                </div>
                <ul class="more">
                  <li><a href="https://haxtheweb.org/community">More student stories on haxtheweb.org <simple-icon-lite icon="hax:admin-external"></simple-icon-lite></a></li>
                  <li><a href="https://haxtheweb.org/community">How HAX Lab keeps HAX going: the SIIP pipeline <simple-icon-lite icon="hax:admin-external"></simple-icon-lite></a></li>
                </ul>
              </div>
            </div>
          </div>
          <psu-peek side="left" preset="mascot" seed="peek-two"></psu-peek>
        </section>

        <section id="voices">
          <div class="wrap">
            <p class="eyebrow">In their own words</p>
            <h2><span class="bar"></span>Voices</h2>
            <p class="intro">Students, faculty and the units that run on HAX. Hover or focus a card to meet their character.</p>
            <psu-voices .people="${VOICES}"></psu-voices>
          </div>
        </section>

        <section class="soft" id="units">
          <div class="wrap">
            <p class="eyebrow">Built across Penn State</p>
            <h2><span class="bar"></span>The colleges and units behind HAX</h2>
            <p class="intro">
              HAX is a collaboration across Penn State, steered by a Core Product
              Development team that meets monthly.
            </p>
            <div class="grid">
              ${UNITS.map(
                (u) => html`<div class="card unit">
                  <h3><a href="${u[3]}">${u[0]}</a></h3>
                  <p>${u[1]}</p>
                  ${u[2] ? html`<hax-story-link story="${u[2]}" about="${u[0]}" compact></hax-story-link>` : nothing}
                </div>`,
              )}
            </div>
            <div class="row">
              <hax-story-link story="penn-state" about="HAX at Penn State" named></hax-story-link>
              <a href="mailto:bmr1@psu.edu">Bring HAX to your unit: Bill Rose, Product Owner (bmr1@psu.edu)</a>
            </div>
          </div>
          <psu-peek side="right" preset="band" seed="peek-three"></psu-peek>
        </section>

        <section id="examples">
          <div class="wrap">
            <p class="eyebrow">Examples</p>
            <h2><span class="bar"></span>Made with HAX at Penn State</h2>
            <ul class="examples">
              ${examples.map(
                (e) => html`<li>
                  <a href="${e.url}">
                    <span class="t"><strong>${e.title}</strong><span>${e.type}</span></span>
                    <simple-icon-lite icon="icons:open-in-new"></simple-icon-lite>
                  </a>
                </li>`,
              )}
            </ul>
            <div class="row">
              <hax-story-link story="hax-psu-edu" about="Every hax.psu.edu course, by college" named></hax-story-link>
              <hax-story-link site="web" story="showcase" about="The showcase on haxtheweb.org" named></hax-story-link>
            </div>
          </div>
        </section>

        <section class="soft" id="goals">
          <div class="wrap">
            <p class="eyebrow">Institutional goals</p>
            <h2><span class="bar"></span>From the college, to the Commonwealth, to the planet</h2>
            <p class="intro">
              HAX starts with the goals of the College of Arts and Architecture.
              Meeting them builds skills, partnerships and open tools that reach
              far past campus, into every corner of Pennsylvania. And because we
              build the technology the right way, the same work helps build a
              better planet. Every claim links to its evidence on hax.cloud.
            </p>
            <ol class="path">
              <li><a href="#goals-college" @click="${this._navClick}"><span class="step" aria-hidden="true">1</span>The college</a></li>
              <li><a href="#goals-psu" @click="${this._navClick}"><span class="step" aria-hidden="true">2</span>The Commonwealth</a></li>
              <li><a href="#goals-planet" @click="${this._navClick}"><span class="step" aria-hidden="true">3</span>The planet</a></li>
            </ol>

            <div class="goal-block" id="goals-college">
              <h3>College of Arts and Architecture Strategic Plan 2030</h3>
              <p>HAX meets 14 of the plan's objectives, across all five of its goals.</p>
              <div class="grid">
                ${AA_GOALS.map(
                  (g) => html`<div class="card goal">
                    <h4>${g.name}</h4>
                    <ul>
                      ${g.subs.map((x) => html`<li>${x[1]} <span class="ref">(${x[0]})</span></li>`)}
                    </ul>
                    <hax-story-link story="${g.story}" about="${g.name}" compact></hax-story-link>
                  </div>`,
                )}
              </div>
              <div class="row">
                <hax-story-link story="tours/a-and-a-strategic-plan-2030-how-hax-meets-a-and-a-s-plan" about="Tour: how HAX meets A&A's plan" named></hax-story-link>
                <a href="https://arts.psu.edu/about/aa-strategic-plan-2030">Read the A&A Strategic Plan 2030</a>
              </div>
            </div>

            <div class="goal-block" id="goals-psu">
              <h3>Meeting the college's goals improves the Commonwealth</h3>
              <p>
                What HAX does for the college carries into Penn State's
                strategic plan and its land-grant promise to Pennsylvania.
              </p>
              <div class="grid">
                ${PSU_PRIORITIES.map(
                  (x) => html`<div class="card goal">
                    <h4>${x.name}</h4>
                    <p>${x.text}</p>
                    <hax-story-link story="${x.story}" about="${x.name}" compact></hax-story-link>
                  </div>`,
                )}
              </div>
              <div class="row">
                <hax-story-link story="penn-state/strategic-plan" about="How HAX meets Penn State's plan" named></hax-story-link>
                <a href="https://strategicplan.psu.edu/">Read Penn State's strategic plan</a>
              </div>
            </div>

            <div class="goal-block" id="goals-planet">
              <h3>Building technology the right way builds a better planet</h3>
              <p>
                Accessible, open and efficient by design, HAX meets 7 of the 17
                UN Sustainable Development Goals. We only list the goals we have
                evidence for.
              </p>
              <div class="sdgs">
                ${SDGS.map(
                  (x) => html`<div class="sdg">
                    <un-sdg goal="${x[0]}"></un-sdg>
                    <div>
                      <h4>${x[1]} <span class="ref">(Goal ${x[0]})</span></h4>
                      <p>${x[3]}</p>
                      <hax-story-link story="${x[2]}" about="${x[1]}" compact></hax-story-link>
                    </div>
                  </div>`,
                )}
              </div>
              <div class="row">
                <hax-story-link story="un-sdgs" about="The UN goals HAX meets" named></hax-story-link>
              </div>
            </div>
          </div>
          <psu-peek side="left" preset="graduate" seed="peek-four"></psu-peek>
        </section>

        <section id="faq">
          <div class="wrap">
            <p class="eyebrow">FAQ</p>
            <h2><span class="bar"></span>Questions</h2>
            <details>
              <summary>Who can use hax.psu.edu?</summary>
              <div>
                <p>Anyone with a Penn State account: <a href="/login.php">log in</a> and start building. HAX itself is free and open source, so anyone outside Penn State can get it from <a href="https://haxtheweb.org/">haxtheweb.org</a>.</p>
              </div>
            </details>
            <details>
              <summary>How are decisions made?</summary>
              <div>
                <p>By the people who use it: students, faculty and staff who take or build courses with HAX. The Core Product Development team meets monthly and is open to any group contributing development, design or other skills. To join, contact <a href="mailto:bmr1@psu.edu">Bill Rose, Product Owner</a> (bmr1@psu.edu).</p>
              </div>
            </details>
            <details>
              <summary>Why was HAX created?</summary>
              <div>
                <p>A university Request for Information sought a custom instructional content management system. The requirements went far beyond what any vendor offered and no vendor answered the request for proposal, so Penn State built a new kind of solution.</p>
                <hax-story-link story="history" about="Where HAX came from" named></hax-story-link>
              </div>
            </details>
            <details>
              <summary>Privacy and policy</summary>
              <div>
                <p>Penn State IT does not monitor websites and does not assume responsibility for published content; authors are responsible for their own sites. Use of this service is governed by <a href="https://security.psu.edu/awareness/psu-policies/">Penn State policies and guidelines</a>, including the <a href="https://policy.psu.edu/policies/ad54">IT Web Services Policy</a>. All pages must comply with <a href="https://policies.psu.edu/policies/ad69">Accessibility Standards, Policy AD69</a>.</p>
              </div>
            </details>
          </div>
        </section>

        <section class="soft" id="game-day" aria-labelledby="game-day-h">
          <div class="wrap">
            <h2 id="game-day-h"><span class="bar"></span>We are…</h2>
            <p class="we-are">
              …making the web bright, accessible, open, fast, portable,
              remixable and fun again.
            </p>
            <p class="intro">Help make the web fun with us.</p>
            <ul class="contact">
              <li>
                <span class="who">Bill Rose, Product Owner</span>
                <a href="mailto:bmr1@psu.edu">bmr1@psu.edu</a>
              </li>
              <li>
                <span class="who">The HAX team</span>
                <a href="mailto:hax@psu.edu">hax@psu.edu</a>
              </li>
              <li>
                <span class="who">Chat with us</span>
                <a href="${DISCORD}">HAX Discord</a>
              </li>
              <li>
                <span class="who">Follow along</span>
                <a href="https://www.linkedin.com/company/haxtheweb/">HAX on LinkedIn</a>
              </li>
            </ul>
            <psu-game-day></psu-game-day>
          </div>
        </section>
      </main>
      <footer>
        <div class="footer-inner">
          <a href="https://www.psu.edu" title="Penn State">
            <img loading="lazy" src="${img("images/Penn-State-Mark.png")}" alt="Penn State" width="400" height="126" />
          </a>
          <div>
            <ul>
              <li><a href="https://www.psu.edu/web-privacy-statement">Privacy Statement</a></li>
              <li><a href="https://policy.psu.edu/policies/ad85">Non Discrimination</a></li>
              <li><a href="https://www.psu.edu/accessibilitystatement">Accessibility</a></li>
              <li><a href="https://policy.psu.edu/policies/hr11">Equal Opportunity</a></li>
              <li><a href="https://www.psu.edu/legal-statements">Legal Statements</a></li>
            </ul>
            <ul>
              <li><a href="https://www.psu.edu/copyright-information/index.html">The Pennsylvania State University © ${this.year}</a></li>
              <li><a href="/login.php">Log in</a></li>
              <li><a href="https://haxtheweb.org/">Part of the HAX network</a></li>
            </ul>
          </div>
        </div>
      </footer>
      <psu-traveler></psu-traveler>
    `;
  }
}
globalThis.customElements.define(HaxPsu.tag, HaxPsu);
