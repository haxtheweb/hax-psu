/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * `psu-peek`: a big rpg-character peeking up from the bottom corner of a
 * section as you scroll past. Press it and it tucks back in, then pops up
 * again later as someone new. It sits in the section's own bottom padding,
 * so it never takes space of its own or covers content.
 */
import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";

const FORMS = ["hockey", "football", "mascot", "band", "graduate", "scientist", "artist", "knight", "wizard", "astronaut", "chef", "future-traveler"];

export class PsuPeek extends DDD {
  static get tag() {
    return "psu-peek";
  }
  static get properties() {
    return {
      ...super.properties,
      side: { type: String, reflect: true },
      preset: { type: String },
      seed: { type: String },
      _in: { type: Boolean, reflect: true, attribute: "in" },
      _tucked: { type: Boolean, reflect: true, attribute: "tucked" },
    };
  }
  constructor() {
    super();
    this.side = "right";
    this.preset = "hockey";
    this.seed = "peek";
    this._in = false;
    this._tucked = false;
  }
  firstUpdated() {
    if (!("IntersectionObserver" in globalThis)) {
      this._in = true;
      return;
    }
    this._io = new IntersectionObserver(
      (entries) => {
        this._in = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.9 },
    );
    this._io.observe(this);
  }
  disconnectedCallback() {
    if (this._io) this._io.disconnect();
    clearTimeout(this._back);
    super.disconnectedCallback();
  }
  _tuck() {
    if (this._tucked) return;
    this._tucked = true;
    // back in a little while, as someone else
    this._back = setTimeout(() => {
      this.preset = FORMS[(FORMS.indexOf(this.preset) + 5) % FORMS.length];
      this._tucked = false;
    }, 3500);
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: absolute;
          bottom: 0;
          width: 120px;
          height: var(--psu-peek-height, 64px);
          overflow: hidden;
          pointer-events: none;
        }
        /* clear of the Future Traveler, who floats in the bottom right corner */
        :host([side="right"]) {
          right: calc(max(var(--ddd-spacing-4), 4vw) + 96px);
        }
        :host([side="left"]) {
          left: max(var(--ddd-spacing-4), 4vw);
        }
        button {
          position: absolute;
          top: 0;
          left: 0;
          width: 120px;
          height: 150px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          transform: translateY(100%);
          visibility: hidden;
          transition:
            transform 0.45s ease-in,
            visibility 0s 0.45s;
        }
        :host([side="left"]) rpg-character {
          transform: scaleX(-1);
        }
        :host([in]:not([tucked])) button {
          transform: translateY(6px);
          visibility: visible;
          transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        button:focus-visible {
          outline: var(--ddd-border-size-md) solid var(--ddd-theme-default-keystoneYellow);
          outline-offset: -4px;
        }
        rpg-character {
          display: block;
        }
        @media (prefers-reduced-motion: reduce) {
          button,
          :host([in]:not([tucked])) button {
            transition: none;
          }
        }
        @media (max-width: 600px) {
          :host {
            width: 84px;
            height: var(--psu-peek-height-small, 40px);
          }
          button {
            width: 84px;
            height: 105px;
          }
          rpg-character {
            width: 84px;
            height: 105px;
          }
        }
      `,
    ];
  }
  render() {
    return html`
      <button
        type="button"
        aria-label="A character is peeking in. Press to send it back."
        @click="${this._tuck}"
      >
        <rpg-character
          preset="${this.preset}"
          seed="${this.seed}"
          height="150"
          width="120"
          aria-hidden="true"
        ></rpg-character>
      </button>
    `;
  }
}
globalThis.customElements.define(PsuPeek.tag, PsuPeek);
