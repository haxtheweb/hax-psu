/**
 * Copyright 2026 The Pennsylvania State University
 * @license Apache-2.0, see LICENSE for full text.
 *
 * hax-network-bar as hax.psu.edu uses it.
 * Proposes two additions to the real element (not in webcomponents yet):
 *  - `hide`: property ids the bar leaves out. hax.psu.edu leaves out "try",
 *    which also drops the "In your browser" Install tab.
 *  - a host place: a site that is a door into the network rather than one of
 *    its properties puts its own lit mark first (slot="pre"), at every width.
 * Everything else is the real hax-network-bar.
 */
import { css } from "lit";
import {
  HaxNetworkBar,
  HAX_INSTALL_METHODS,
} from "@haxtheweb/hax-network-bar/hax-network-bar.js";
import { HAX_NETWORK } from "@haxtheweb/hax-network-bar/lib/hax-network.js";

export class PsuNetworkBar extends HaxNetworkBar {
  static get tag() {
    return "psu-network-bar";
  }
  static get properties() {
    return {
      ...super.properties,
      hide: { type: String },
    };
  }
  constructor() {
    super();
    this.hide = "";
  }
  static get styles() {
    return [
      super.styles,
      css`
        ::slotted([slot="pre"]) {
          order: -1;
        }
        @media (max-width: 1279px) {
          :host(:not([compact]):not([demo])) slot[name="pre"] {
            display: contents;
          }
        }
      `,
    ];
  }
  render() {
    const order = HAX_NETWORK.order;
    const hidden = (this.hide || "").split(/\s+/).filter((x) => x);
    HAX_NETWORK.order = order.filter((id) => !hidden.includes(id));
    const ways = HAX_INSTALL_METHODS.slice();
    if (hidden.includes("try")) {
      const i = HAX_INSTALL_METHODS.findIndex((m) => m.id === "browser");
      if (i > -1) HAX_INSTALL_METHODS.splice(i, 1);
    }
    try {
      return super.render();
    } finally {
      HAX_NETWORK.order = order;
      HAX_INSTALL_METHODS.splice(0, HAX_INSTALL_METHODS.length, ...ways);
    }
  }
}
globalThis.customElements.define(PsuNetworkBar.tag, PsuNetworkBar);
