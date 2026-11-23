/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * `psu-voices`: real people in their own words. Each card shows the person
 * (their own photo, or their initials) and turns into
 * their rpg-character on hover or focus.
 */
import { html, css } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "@haxtheweb/hax-marketing-theme/lib/hax-story-link.js";

export class PsuVoices extends DDD {
  static get tag() {
    return "psu-voices";
  }
  static get properties() {
    return {
      ...super.properties,
      people: { type: Array },
      _broken: { type: Object, state: true },
    };
  }
  constructor() {
    super();
    this.people = [];
    this._broken = {};
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          --v-ink: light-dark(var(--ddd-theme-default-coalyGray), var(--ddd-theme-default-white));
          --v-surface: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-potentialMidnight));
        }
        ul {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
          gap: var(--ddd-spacing-6);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: grid;
          grid-template-columns: 96px minmax(0, 1fr);
          gap: var(--ddd-spacing-4);
          align-items: start;
          margin: 0;
          padding: var(--ddd-spacing-5);
          border: var(--ddd-border-size-md) solid var(--v-ink);
          border-radius: var(--ddd-radius-lg);
          background-color: var(--v-surface);
          transition: box-shadow 0.15s ease-out, transform 0.15s ease-out;
        }
        li:hover,
        li:focus-within {
          transform: translateY(-3px);
          box-shadow: 6px 6px 0 var(--ddd-theme-default-beaverBlue);
        }
        .face {
          position: relative;
          width: 96px;
          height: 120px;
        }
        .face > * {
          position: absolute;
          inset: 0;
          transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }
        .face img,
        .face .mono {
          top: 12px;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          object-fit: cover;
        }
        .face .mono {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--ddd-theme-default-beaverBlue);
          color: var(--ddd-theme-default-white);
          font-family: var(--ddd-font-navigation);
          font-size: 34px;
          font-weight: var(--ddd-font-weight-bold);
        }
        .face rpg-character {
          opacity: 0;
          transform: scale(0.6);
        }
        li:hover .face rpg-character,
        li:focus-within .face rpg-character {
          opacity: 1;
          transform: none;
        }
        li:hover .face img,
        li:hover .face .mono,
        li:focus-within .face img,
        li:focus-within .face .mono {
          opacity: 0;
          transform: scale(0.6);
        }
        blockquote {
          margin: 0 0 var(--ddd-spacing-3);
          font-size: 19px;
          line-height: 1.45;
          font-weight: var(--ddd-font-weight-medium, 500);
        }
        .who {
          margin: 0 0 var(--ddd-spacing-3);
          font-size: 15px;
          line-height: 1.4;
        }
        .who strong {
          display: block;
          font-family: var(--ddd-font-navigation);
          font-size: 17px;
        }
        a.src {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          color: light-dark(var(--ddd-theme-default-link), var(--ddd-theme-default-linkLight));
          font-weight: var(--ddd-font-weight-bold);
        }
        @media (prefers-reduced-motion: reduce) {
          li,
          .face > * {
            transition: none;
          }
        }
        @media (max-width: 600px) {
          li {
            grid-template-columns: 72px minmax(0, 1fr);
            padding: var(--ddd-spacing-4);
          }
          .face {
            width: 72px;
            height: 90px;
          }
          .face img,
          .face .mono {
            top: 9px;
            width: 72px;
            height: 72px;
            font-size: 26px;
          }
          .face rpg-character {
            height: 90px;
            width: 72px;
          }
        }
      `,
    ];
  }
  _initials(name) {
    return name
      .replace(/^(Dr\.|Prof\.)\s+/, "")
      .split(/\s+/)
      .map((w) => w.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
  _photo(p) {
    // only a photo we host; no request goes to GitHub or anyone else
    return p.photo || "";
  }
  render() {
    return html`<ul>
      ${this.people.map((p) => {
        const src = this._photo(p);
        return html`<li>
          <div class="face" aria-hidden="true">
            ${src && !this._broken[p.name]
              ? html`<img
                  src="${src}"
                  alt=""
                  loading="lazy"
                  @error="${() => {
                    this._broken = { ...this._broken, [p.name]: true };
                  }}"
                />`
              : html`<span class="mono">${this._initials(p.name)}</span>`}
            <rpg-character seed="${p.github || p.name}" height="120" width="96"></rpg-character>
          </div>
          <div>
            <blockquote>"${p.quote}"</blockquote>
            <p class="who"><strong>${p.name}</strong> ${p.role}</p>
            ${p.story
              ? html`<hax-story-link story="${p.story}" about="${p.name}" compact></hax-story-link>`
              : html`<a class="src" href="${p.source}">${p.sourceLabel}</a>`}
          </div>
        </li>`;
      })}
    </ul>`;
  }
}
globalThis.customElements.define(PsuVoices.tag, PsuVoices);
