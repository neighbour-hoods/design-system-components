import { css, CSSResult, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { NHComponent } from './ancestors/base';
import { sharedStyles } from "./sharedStyles";

@customElement("nh-tab-button")
export class NHTabButton extends NHComponent {
  @property()
  label!: string;
  @property()
  selected: boolean = false;
  @property()
  disabled: boolean = false;
  @property()
  fixed: boolean = false;
  @property()
  theme: string = "dark";
  @property()
  size: string = "md";

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        class="btn${classMap({
          active: this.selected,
          fixed: this.fixed,
          disabled: this.disabled,
          [this.theme]: !!this.theme,
          [this.size]: !!this.size
        })}"
      >
        ${this.label}
      </button>
    `;
  }

  static styles: CSSResult[] = [
    // super.styles as CSSResult,
    css`
    ${unsafeCSS(sharedStyles)}
    button {
        color: #D9D9D9;
        background-color: var(--nh-theme-bg-subtle);
        padding: calc(1px * var(--nh-spacing-md)) calc(1px * var(--nh-spacing-xl));
        height: 52px;
        position: relative;
        
        border: 0;
        border-radius: calc(1px * var(--nh-radii-lg));
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        font-family: var(--nh-font-families-menu);
        letter-spacing: var(--nh-letter-spacing-buttons);
      }
      button:focus {
      }
      button:hover {
        background-color: var(--nh-theme-bg-neutral);
        color: var(--nh-theme-accent-emphasis);
      }

      /* Tab hover effect */
      button:not(.fixed):hover::after,
      button:not(.fixed):active::after {
        position: absolute;
        background-color: var(--nh-theme-bg-neutral);
        bottom: calc(-1px * var(--nh-spacing-sm));
        left: 0px;
        content: '';
        width: 100%;
        height: calc(1px * var(--nh-spacing-sm));
      }
      
      button.fixed {
        color: var(--nh-theme-fg-default);
        background-color: var(--nh-theme-bg-neutral);
        border: 4px solid --nh-colors-eggplant-800;
        border-radius: calc(1px * var(--nh-radii-md));
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
      button:active::after,
      button:active::part(base) {
        background-color: var(--nh-theme-bg-surface);
      }
      button:active {
        background-color: var(--nh-theme-bg-surface);
      }

      button.disabled {
        color: var(--nh-theme-fg-on-disabled);
        background-color: var(--nh-theme-fg-disabled);
      }
      button.sm {
        line-height: var(--nh-line-heights-headlines-default);
        font-weight: 600;
        font-size: calc(1px * var(--nh-font-size-sm));
      }
      button.md, button.stretch {
        line-height: var(--nh-line-heights-headlines-default);
        font-weight: 600;
        font-size: calc(1px * var(--nh-font-size-md));
      }
      button.lg {
        line-height: var(--nh-line-heights-body-default);
        font-weight: 600;
        font-size: calc(1px * var(--nh-font-size-lg));
      }
    `,
  ];
}
