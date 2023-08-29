import { css, CSSResult, html } from "lit";
import {property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { NHComponentShoelace } from "./ancestors/base";
import { NHButtonGroup } from "./button-group";

export class NHCard extends NHComponentShoelace {
  @property()
  title!: string;
  @property()
  heading!: string;
  @property()
  hasContextMenu: boolean = false;
  @property()
  hasPrimaryAction: boolean = false;
  @property()
  theme: string = "dark";
  @property()
  textSize: string = "md";
  @property()
  footerAlign: "l" | "r" | "c" = "c";

  @state()
  contextMenuVisible: boolean = false;
  toggleContextMenu () {
    
    this.contextMenuVisible = !this.contextMenuVisible;
    (this.renderRoot.querySelector(".context-menu") as HTMLElement).dataset.open = 'true';
  }
  @query(".context-menu-dots")
  _contextMenu : any;

  render() {
    return html`
      <div
        class="container${classMap({
          light: this.theme == "light",
          dark: this.theme == "dark",
          'text-sm': this.textSize == "sm",
          'footer-left': this.footerAlign === 'l',
          'footer-right': this.footerAlign === 'r',
          'footer-center': this.footerAlign === 'c',
        })}"
      >
        ${this.hasContextMenu
          ? html`<div class="context-menu" data-open=${this.contextMenuVisible} placement="top-right">
                  <nav class="context-menu-dots" @click=${() => {this.toggleContextMenu()}} >
                    <div class="menu-dot"></div>
                    <div class="menu-dot"></div>
                    <div class="menu-dot"></div>
                  </nav>
                  <nh-menu @mouseleave=${() => {this.toggleContextMenu()}} .itemLabels=${["", "", ""]} .itemComponentProps=${{ size: "icon", iconImageB64: "" }} .direction=${"horizontal"}>
                    <slot slot="menu-items" name="context-menu"></slot>
                  </nh-menu>
                </div>`
          : html``}
        <slot name="header">
          ${this.title ? html`<h2 class="title">${this.title}</h2>` : html``}
          ${this.heading ? html`<h1>${this.heading}</h1>` : html``}
        </slot>
        <div
          class="content${classMap({
            noheading: !this.heading,
          })}"
        >
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }
  static get elementDefinitions() {
    return {
      'nh-menu': NHButtonGroup,
    };
  }


  static styles: CSSResult[] = [
    super.styles as CSSResult,
    css`

    /* Layout */
    :root {
      display: flex;
    }
    
    .container {
      max-width: 45vw;
      min-width: 264px;
      color: var(--nh-theme-fg-default);
      border-radius: calc(1px * var(--nh-radii-xl));
      padding: calc(1px * var(--nh-spacing-xl));
      position: relative;
    }
    .container.light {
      background-color: var(--nh-theme-bg-element);
    }
    .container.dark {
      background-color: var(--nh-theme-bg-surface);
    }
    :host(.nested-card) .container {
      background-color: var(--nh-theme-bg-surface);
      min-width: calc(264px - calc(2px * var(--nh-spacing-3xl)));
    }
    :host(.responsive) .container {
      max-width: initial;
      min-width: initial;
      display:flex;
      width: fit-content;
      box-sizing: border-box;
      padding: 15%;
    }
    :host(.transparent) .container {
      background-color: transparent;
    }
    
    /* Headings */
    
    h1,
    *::slotted(*) {
      margin: 0;
      font-family: var(--nh-font-families-menu);
    }
    h1 {
      font-weight: var(--nh-font-weights-body-regular);
      margin-bottom: calc(1px * var(--nh-spacing-xl));
    }
    h2.title {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      margin-top: 0;
      margin-left: 3px;

      font-size: calc(1px * var(--nh-font-size-sm));
      letter-spacing: calc(2 * var(--nh-letter-spacing-buttons)); 
      font-family: var(--nh-font-families-headlines);
      text-transform: uppercase;
      line-height: calc(var(--nh-line-heights-headlines-lg));
    }
    .text-sm h1 {
      font-size: calc(1px * var(--nh-font-size-lg));
      margin-bottom: calc(1px * var(--nh-spacing-sm));
      line-height: var(--nh-line-heights-headlines-default);
      font-weight: 500;
    }
    
    /* Content */
    
    .text-sm ::slotted(*) {
      color: var(--nh-menu-subtitle);
      line-height: var(--nh-line-heights-headlines-default);
      font-weight: var(--nh-font-weights-body-regular);
      font-size: calc(1px * var(--nh-font-size-sm));
    }
    .content.noheading {
      padding: 0;
    }

    /* Context Menu */
    
    .dots-context-menu {
      position: absolute;
      display: flex;
      top: calc(1px * var(--nh-spacing-xl));
      right: calc(1px * var(--nh-spacing-xl));
      height: 7px;
    }
    .menu-dot {
      width: 5px;
      height: 5px;
      margin: 2px;
      border-radius: 100%;
      background: var(--nh-menu-subtitle);
    }
    
    /* Footer */
    
    ::slotted([slot=footer]) {
      margin: auto 0;
      padding-top: calc(1px * var(--nh-spacing-lg));
      display: flex;
    }
    .footer-left ::slotted([slot=footer]) {
      justify-content: flex-start;
    }
    .footer-center ::slotted([slot=footer]) {
      justify-content: center;
    }
    .footer-right ::slotted([slot=footer]) {
      justify-content: flex-end;
    }
  `,
];
}