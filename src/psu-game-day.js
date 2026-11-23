/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * `psu-game-day`: the Penn State lineup, played by rpg-characters, with four
 * game-day modes and the story of where the characters came from.
 * Every character is the real rpg-character.
 */
import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "@haxtheweb/hax-marketing-theme/lib/hax-story-link.js";

const LINEUP = [
  { label: "Game day", preset: "football", seed: "beaver-stadium" },
  { label: "On the ice", preset: "hockey", seed: "pegula" },
  { label: "The Lion", preset: "mascot", item: "flag", flag: "PSU", seed: "shrine" },
  { label: "Blue Band", preset: "band", seed: "blue-band" },
  { label: "Commencement", preset: "graduate", item: "flag", flag: "WE", seed: "nittany" },
];

const MODES = [
  { id: "march", label: "We are! March on", say: "The whole lineup marches in place." },
  { id: "hockey", label: "Hockey Valley", say: "Everyone laces up and takes the ice." },
  { id: "football", label: "Hold the Line", say: "Everyone suits up and plays catch." },
  { id: "glory", label: "For the Glory of Old State", say: "Arms up, side by side, swaying like the student section." },
];

function reduced() {
  return Boolean(
    globalThis.matchMedia &&
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

export class PsuGameDay extends DDD {
  static get tag() {
    return "psu-game-day";
  }
  static get properties() {
    return {
      ...super.properties,
      mode: { type: String, reflect: true },
      origin: { type: Boolean, reflect: true },
      _holder: { type: Number, state: true },
    };
  }
  constructor() {
    super();
    this.mode = "";
    this.origin = false;
    this._holder = 0;
    this._timer = null;
    this._flight = null;
  }
  disconnectedCallback() {
    this._stopCatch();
    super.disconnectedCallback();
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --gd-ink: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
        }
        .field {
          position: relative;
          border-radius: var(--ddd-radius-lg);
          overflow: hidden;
          border: var(--ddd-border-size-md) solid var(--gd-ink);
          background-image: repeating-linear-gradient(
            90deg,
            var(--ddd-theme-default-beaverBlue) 0 80px,
            #1a3870 80px 160px
          );
        }
        :host([mode="hockey"]) .field {
          background-image:
            linear-gradient(90deg, transparent 49.6%, #c8102e 49.6% 50.4%, transparent 50.4%),
            linear-gradient(180deg, #f4f8fb 0%, #dbe7f0 100%);
        }
        :host([mode="football"]) .field {
          background-image: repeating-linear-gradient(
            90deg,
            #2e7d32 0 76px,
            #ffffff 76px 80px,
            #388e3c 80px 156px,
            #ffffff 156px 160px
          );
        }
        ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: flex-end;
          gap: var(--ddd-spacing-2);
          list-style: none;
          margin: 0;
          padding: var(--ddd-spacing-6) var(--ddd-spacing-4) var(--ddd-spacing-2);
          min-height: 190px;
        }
        :host([mode="glory"]) ul {
          justify-content: center;
          gap: 0;
        }
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0;
          padding: 0;
          transform-origin: 50% 100%;
        }
        :host([mode="glory"]) li {
          margin: 0 -10px;
        }
        .tag {
          margin: var(--ddd-spacing-1) 0 var(--ddd-spacing-3);
          padding: var(--ddd-spacing-1) var(--ddd-spacing-2);
          border-radius: var(--ddd-radius-xs);
          background-color: var(--ddd-theme-default-nittanyNavy);
          color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
          font-size: 14px;
          font-weight: var(--ddd-font-weight-bold);
          white-space: nowrap;
        }
        .ball {
          position: absolute;
          left: 0;
          top: 0;
          width: 30px;
          height: 18px;
          pointer-events: none;
          display: none;
        }
        :host([mode="football"]) .ball {
          display: block;
        }
        @media (prefers-reduced-motion: no-preference) {
          :host([mode="march"]) li {
            animation: march 0.5s ease-in-out infinite alternate;
          }
          :host([mode="march"]) li:nth-child(even) {
            animation-delay: 0.25s;
          }
          :host([mode="hockey"]) li {
            animation: skate 2.4s ease-in-out infinite alternate;
          }
          :host([mode="hockey"]) li:nth-child(even) {
            animation-direction: alternate-reverse;
          }
          :host([mode="glory"]) li {
            animation: sway 2.6s ease-in-out infinite alternate;
          }
        }
        @keyframes march {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        @keyframes skate {
          from { transform: translateX(-28px) rotate(-4deg); }
          to { transform: translateX(28px) rotate(4deg); }
        }
        @keyframes sway {
          from { transform: rotate(-7deg); }
          to { transform: rotate(7deg); }
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-2);
          margin-top: var(--ddd-spacing-4);
        }
        button {
          min-height: 44px;
          padding: 0 var(--ddd-spacing-4);
          border: var(--ddd-border-size-md) solid var(--gd-ink);
          border-radius: var(--ddd-radius-sm);
          background-color: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-potentialMidnight));
          color: var(--gd-ink);
          font-family: var(--ddd-font-navigation);
          font-size: 16px;
          font-weight: var(--ddd-font-weight-bold);
          cursor: pointer;
        }
        button:hover,
        button:focus-visible {
          background-color: var(--ddd-theme-default-keystoneYellow);
          color: var(--ddd-theme-default-coalyGray);
          outline: var(--ddd-border-size-md) solid var(--ddd-theme-default-beaverBlue);
          outline-offset: 2px;
        }
        button[aria-pressed="true"],
        button[aria-expanded="true"] {
          background-color: var(--ddd-theme-default-beaverBlue);
          border-color: var(--gd-ink);
          color: var(--ddd-theme-default-white);
        }
        button[aria-pressed="true"]::before {
          content: "▶ ";
        }
        .status {
          min-height: 1.5em;
          margin: var(--ddd-spacing-2) 0 0;
          font-size: 16px;
        }
        .origin {
          margin-top: var(--ddd-spacing-4);
          padding: var(--ddd-spacing-5);
          border: var(--ddd-border-size-md) solid var(--gd-ink);
          border-radius: var(--ddd-radius-lg);
          background-color: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-potentialMidnight));
        }
        .origin[hidden] {
          display: none;
        }
        .origin h3 {
          margin: 0 0 var(--ddd-spacing-2);
          font-family: var(--ddd-font-navigation);
          font-size: var(--ddd-font-size-s);
        }
        .origin p {
          margin: 0 0 var(--ddd-spacing-3);
          font-size: 17px;
          line-height: 1.6;
        }
        .origin blockquote {
          margin: 0 0 var(--ddd-spacing-3);
          padding-left: var(--ddd-spacing-4);
          border-left: 6px solid var(--ddd-theme-default-keystoneYellow);
          font-size: 18px;
          font-style: italic;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-3);
          align-items: center;
        }
        .links a {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          color: light-dark(var(--ddd-theme-default-link), var(--ddd-theme-default-linkLight));
          font-weight: var(--ddd-font-weight-bold);
        }
        @media (max-width: 600px) {
          ul {
            padding: var(--ddd-spacing-4) var(--ddd-spacing-2) var(--ddd-spacing-1);
          }
          rpg-character {
            height: 106px;
            width: 85px;
          }
          button {
            flex: 1 1 100%;
          }
        }
      `,
    ];
  }

  _set(id) {
    this.mode = this.mode === id ? "" : id;
    this._stopCatch();
    if (this.mode === "football") {
      this._holder = 0;
      this.updateComplete.then(() => this._startCatch());
    }
  }

  _stopCatch() {
    clearTimeout(this._timer);
    this._timer = null;
    if (this._flight) {
      this._flight.cancel();
      this._flight = null;
    }
  }

  _spot(i) {
    const field = this.shadowRoot.querySelector(".field").getBoundingClientRect();
    const who = this.shadowRoot.querySelectorAll("rpg-character")[i].getBoundingClientRect();
    return { x: who.left - field.left + who.width * 0.7, y: who.top - field.top + who.height * 0.55 };
  }

  // the ball sits with whoever holds it, then flies in an arc to the next one
  _startCatch() {
    const ball = this.shadowRoot.querySelector(".ball");
    const n = LINEUP.length;
    const place = () => {
      const p = this._spot(this._holder);
      ball.style.transform = `translate(${p.x - 15}px, ${p.y - 9}px)`;
    };
    place();
    if (reduced()) return;
    const throwIt = () => {
      if (this.mode !== "football") return;
      const from = this._spot(this._holder);
      // every other player, so the ball crosses the whole field and everyone gets it
      const next = (this._holder + 2) % n;
      const to = this._spot(next);
      const peak = Math.min(from.y, to.y) - 90;
      this._holder = -1;
      const frames = [];
      for (let t = 0; t <= 1.0001; t += 0.1) {
        const x = from.x + (to.x - from.x) * t;
        const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * peak + t * t * to.y;
        frames.push({ transform: `translate(${x - 15}px, ${y - 9}px) rotate(${t * 540}deg)` });
      }
      this._flight = ball.animate(frames, { duration: 900, easing: "linear", fill: "forwards" });
      this._flight.onfinish = () => {
        this._holder = next;
        this._timer = setTimeout(throwIt, 900);
      };
    };
    this._timer = setTimeout(throwIt, 700);
  }

  _gear(c, i) {
    // the mode dresses everyone alike; each keeps their own face and build
    if (this.mode === "hockey") return { preset: "hockey", item: "", pose: "", flag: "" };
    if (this.mode === "football") {
      // whoever does not have the ball raises a hand for it; a raised hand holds nothing
      return { preset: "football", item: "", pose: this._holder === i ? "" : "wave", flag: "" };
    }
    if (this.mode === "glory") return { preset: c.preset, item: c.item || "", pose: "cheer", flag: c.flag || "" };
    return { preset: c.preset, item: c.item || "", pose: "", flag: c.flag || "" };
  }

  render() {
    const m = MODES.find((x) => x.id === this.mode);
    return html`
      <div class="field">
        <ul aria-label="Penn State, played by HAX characters">
          ${LINEUP.map((c, i) => {
            const g = this._gear(c, i);
            return html`<li>
              <rpg-character
                preset="${g.preset}"
                seed="${c.seed}"
                item="${g.item}"
                pose="${g.pose}"
                flag-text="${g.flag}"
                height="142"
                width="113"
                ?walking="${this.mode === "march" || this.mode === "hockey"}"
                aria-hidden="true"
              ></rpg-character>
              <span class="tag">${c.label}</span>
            </li>`;
          })}
        </ul>
        <svg class="ball" viewBox="0 0 30 18" aria-hidden="true">
          <ellipse cx="15" cy="9" rx="14" ry="8" fill="#7b4a1e" stroke="#3d2410" stroke-width="1.5"></ellipse>
          <path d="M9 9h12M12 7v4M15 7v4M18 7v4" stroke="#ffffff" stroke-width="1.4"></path>
        </svg>
      </div>
      <div class="controls" role="group" aria-label="Game day">
        ${MODES.map(
          (x) => html`<button
            type="button"
            aria-pressed="${this.mode === x.id ? "true" : "false"}"
            @click="${() => this._set(x.id)}"
          >${x.label}</button>`,
        )}
        <button
          type="button"
          aria-expanded="${this.origin ? "true" : "false"}"
          aria-controls="origin"
          @click="${() => {
            this.origin = !this.origin;
          }}"
        >Where these characters come from</button>
      </div>
      <p class="status" role="status">${m ? m.say : ""}</p>
      <div class="origin" id="origin" ?hidden="${!this.origin}">
        <h3>Made by students, for everyone</h3>
        <blockquote>"Let's make web development feel like playing a video game."</blockquote>
        <p>
          That was the design challenge. Arts and Architecture and IST students
          answered it together with an 8-bit world that turned building a
          website into something closer to a game. Every person who logs in to
          HAX gets their own character, drawn from their name, so you can tell
          the tools from the site you are making at a glance.
        </p>
        <div class="links">
          <hax-story-link story="stories/0c04e5cf" about="The rpg-character, an IST 256 project" named></hax-story-link>
          <hax-story-link story="stories/ee450a19" about="Jimmy Kane, who led the team" named></hax-story-link>
          <a href="https://rpg.art.hax.cloud">Make your own with RPG me</a>
          <a href="https://haxtheweb.org/community">Everyone who built HAX, as characters</a>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(PsuGameDay.tag, PsuGameDay);
