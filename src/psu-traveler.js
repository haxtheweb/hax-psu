/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * `psu-traveler`: the HAX Future Traveler, travelling down the page with you.
 * Press him and he jumps to another era (the real eras from
 * hax-network-bar/lib/hax-future-traveler.js), with a speech bubble saying
 * where he went and what HAX is for.
 */
import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import {
  HAX_TRAVELER_ERAS,
  futureTraveler,
  HaxFutureTravelerStyles,
} from "@haxtheweb/hax-network-bar/lib/hax-future-traveler.js";

// each stop teaches one of HAX's 7 pillars (wording from haxtheweb.org/pillars)
const PILLARS = [
  {
    name: "free and open",
    line: "Every era runs on shared standards, like a printing press anyone can use. HAX is built on open web standards instead of a proprietary framework, so what you make keeps working.",
  },
  {
    name: "sustainable",
    line: "A good book is still readable a hundred years later. Your HAX site is plain HTML files you own, with no subscription standing between you and your work.",
  },
  {
    name: "accessible",
    line: "A great idea only matters if everyone can reach it. HAX meets accessibility standards by default, with an interface in over 100 languages.",
  },
  {
    name: "efficient",
    line: "Pages load only what they need, so they stay fast on any connection. The less time we spend waiting, the more time we spend dreaming the future together.",
  },
  {
    name: "platform agnostic",
    line: "Bring content in from Word, PDFs or old sites, and run it on PHP, Node, the desktop app or no server at all.",
  },
  {
    name: "remixable",
    line: "Every page is made of blocks you can rearrange and reuse. I'm remixable too: every era of me is drawn by the HAX art movement, because HAX is art as much as it is code.",
  },
  {
    name: "extensible",
    line: "Every block is a web component, so new ones follow the same rules as the ones we ship, and they keep working wherever the web goes.",
  },
];

export class PsuTraveler extends DDD {
  static get tag() {
    return "psu-traveler";
  }
  static get properties() {
    return {
      ...super.properties,
      era: { type: Number, state: true },
      open: { type: Boolean, reflect: true },
      shown: { type: Boolean, reflect: true },
      _tear: { type: Boolean, state: true },
    };
  }
  constructor() {
    super();
    this.era = 0;
    this.open = false;
    this.shown = false;
    this._tear = false;
    this._onScroll = () => {
      // he joins once the visitor starts down the page
      this.shown = globalThis.scrollY > 400;
    };
  }
  connectedCallback() {
    super.connectedCallback();
    globalThis.addEventListener("scroll", this._onScroll, { passive: true });
    // first check waits a frame so reading scrollY doesn't force layout mid-render
    globalThis.requestAnimationFrame(() => this._onScroll());
  }
  disconnectedCallback() {
    globalThis.removeEventListener("scroll", this._onScroll);
    super.disconnectedCallback();
  }
  _travel() {
    if (!this.open) {
      this.open = true;
      return;
    }
    this.era = (this.era + 1) % HAX_TRAVELER_ERAS.length;
    this._tear = true;
    setTimeout(() => {
      this._tear = false;
    }, 300);
  }
  _close() {
    this.open = false;
    const b = this.shadowRoot.querySelector("button.me");
    if (b) b.focus();
  }
  static get styles() {
    return [
      super.styles,
      HaxFutureTravelerStyles,
      css`
        :host {
          position: fixed;
          right: var(--ddd-spacing-4);
          bottom: var(--ddd-spacing-4);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: var(--ddd-spacing-2);
          pointer-events: none;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.3s ease-out, transform 0.3s ease-out;
          visibility: hidden;
        }
        :host([shown]) {
          opacity: 1;
          transform: none;
          visibility: visible;
        }
        :host([shown]) > * {
          pointer-events: auto;
        }
        .bubble {
          position: relative;
          box-sizing: border-box;
          width: min(340px, calc(100vw - 32px));
          padding: var(--ddd-spacing-4) var(--ddd-spacing-4) var(--ddd-spacing-3);
          border: var(--ddd-border-size-md) solid var(--ddd-theme-default-coalyGray);
          border-radius: var(--ddd-radius-lg);
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          box-shadow: 6px 6px 0 var(--ddd-theme-default-beaverBlue);
        }
        .bubble[hidden] {
          display: none;
        }
        .bubble::after {
          content: "";
          position: absolute;
          right: 28px;
          bottom: -14px;
          width: 22px;
          height: 22px;
          background-color: var(--ddd-theme-default-white);
          border-right: var(--ddd-border-size-md) solid var(--ddd-theme-default-coalyGray);
          border-bottom: var(--ddd-border-size-md) solid var(--ddd-theme-default-coalyGray);
          transform: rotate(45deg);
        }
        .bubble strong {
          display: block;
          margin: 0 36px var(--ddd-spacing-1) 0;
          font-family: var(--ddd-font-navigation);
          font-size: 18px;
        }
        .bubble p {
          margin: 0 0 var(--ddd-spacing-2);
          font-size: 16px;
          line-height: 1.5;
        }
        .bubble a {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          color: var(--ddd-theme-default-link);
          font-weight: var(--ddd-font-weight-bold);
        }
        .bubble .pillar {
          font-weight: var(--ddd-font-weight-bold);
        }
        .bubble .links {
          display: flex;
          flex-wrap: wrap;
          gap: 0 var(--ddd-spacing-4);
        }
        .bubble .hint {
          font-size: 14px;
          color: var(--ddd-theme-default-slateGray);
        }
        .close {
          position: absolute;
          top: var(--ddd-spacing-2);
          right: var(--ddd-spacing-2);
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 50%;
          background-color: transparent;
          color: var(--ddd-theme-default-coalyGray);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }
        .close:hover,
        .close:focus-visible {
          background-color: var(--ddd-theme-default-limestoneLight);
          outline: var(--ddd-border-size-sm) solid var(--ddd-theme-default-beaverBlue);
        }
        button.me {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          padding: 0;
          border: var(--ddd-border-size-md) solid var(--ddd-theme-default-white);
          border-radius: 50%;
          background-color: var(--ddd-theme-default-nittanyNavy);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          --future-traveler-size: 52px;
        }
        button.me:hover,
        button.me:focus-visible {
          outline: 3px solid var(--ddd-theme-default-keystoneYellow);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: no-preference) {
          :host([shown]) button.me {
            animation: bob 3s ease-in-out infinite;
          }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @media (max-width: 600px) {
          :host {
            right: var(--ddd-spacing-2);
            bottom: var(--ddd-spacing-2);
          }
          button.me {
            width: 56px;
            height: 56px;
            --future-traveler-size: 40px;
          }
          .bubble::after {
            right: 20px;
          }
        }
      `,
    ];
  }
  render() {
    const e = HAX_TRAVELER_ERAS[this.era];
    const first = this.era === 0;
    const p = PILLARS[(this.era + PILLARS.length - 1) % PILLARS.length];
    return html`
      <div class="bubble" ?hidden="${!this.open}" role="status" aria-live="polite">
        <button class="close" type="button" aria-label="Close" @click="${this._close}">×</button>
        ${first
          ? html`<strong>I'm the HAX Future Traveler.</strong>
              <p>
                HAX brings the best ideas forward with us. It's built on web
                standards, so what you make works for good, timeless like a
                book on a shelf. Press me and I'll show you where those ideas
                come from.
              </p>`
          : html`<strong>Off to the ${e.label}!</strong>
              <p>${p.line}</p>
              <p class="pillar">That's ${p.name}, one of HAX's 7 pillars.</p>
              <p class="hint">Stop ${this.era} of ${HAX_TRAVELER_ERAS.length - 1}. Press me to keep travelling.</p>`}
        <span class="links">
          <a href="https://haxtheweb.org/pillars">The 7 pillars</a>
          <a href="https://art.hax.cloud/">Every era on HAX Art</a>
        </span>
      </div>
      <button
        class="me ft-host ${this._tear ? "ft-glitch" : ""}"
        type="button"
        aria-expanded="${this.open ? "true" : "false"}"
        aria-label="${this.open ? `Future Traveler, now in the ${e.label}. travel to the next era` : "Talk to the HAX Future Traveler"}"
        @click="${this._travel}"
      >
        ${futureTraveler(e.id)}
      </button>
    `;
  }
}
globalThis.customElements.define(PsuTraveler.tag, PsuTraveler);
