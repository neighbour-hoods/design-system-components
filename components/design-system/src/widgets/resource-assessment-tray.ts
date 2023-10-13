import { CSSResult, LitElement, css, html } from "lit"
import { html as staticHtml, unsafeStatic } from "lit/static-html.js"
import { property } from "lit/decorators.js";
import { EntryHash, EntryHashB64, encodeHashToBase64 } from "@holochain/client"
import { Assessment, RangeKind } from "@neighbourhoods/client";
import { CreateAssessmentWidget } from "./create-assessment-widget";
import { DisplayAssessmentWidget } from "./display-assessment-widget";
import { NHComponent } from "components/design-system/dist";

export interface WidgetBundle<WidgetComponent extends LitElement> {
  name: string,
  range: RangeKind,
  component: new () => WidgetComponent,
}

export interface AssessmentWidgetConfig {
  inputAssessmentWidget: {
    dimensionEh: EntryHash,
    widget: WidgetBundle<CreateAssessmentWidget>,
  },
  outputAssessmentWidget: {
    dimensionEh: EntryHash,
    widget: WidgetBundle<DisplayAssessmentWidget>,
  },
}

export type AssessmentWidgetTrayConfig = Map<EntryHashB64, AssessmentWidgetConfig>

export default class NHResourceAssessmentTray extends NHComponent {
  @property()
  assessmentWidgetTrayConfig!: AssessmentWidgetTrayConfig

  @property()
  resourceEh!: EntryHash

  @property()
  resourceDefEh!: EntryHash

  @property()
  outputAssessments!: Map<EntryHashB64, Assessment>

  registry?: CustomElementRegistry

  override createRenderRoot() {
    this.registry = new CustomElementRegistry()

    const renderRoot = this.attachShadow({
      mode: 'open',
      customElements: this.registry,
    });

    return renderRoot;
  }

  registerScopedComponents() {
    this.assessmentWidgetTrayConfig.forEach(({inputAssessmentWidget, outputAssessmentWidget}) => {
      this.registry!.define(inputAssessmentWidget.widget.name, inputAssessmentWidget.widget.component);
    })
  }

  render() {
    this.registerScopedComponents();

    const widgets = staticHtml`
      ${
        Array.from(this.assessmentWidgetTrayConfig.values()).map(({inputAssessmentWidget, outputAssessmentWidget}) => {
          const outputHtml = staticHtml`
              <${unsafeStatic(inputAssessmentWidget.widget.name)}
                .${unsafeStatic('dimensionEh')}=${inputAssessmentWidget.dimensionEh}
                .${unsafeStatic('resourceEh')}=${this.resourceEh}
                .${unsafeStatic('resourceDefEh')}=${this.resourceDefEh}
                .${unsafeStatic('latestAssessment')}=${this.outputAssessments.get(encodeHashToBase64(outputAssessmentWidget.dimensionEh))}
              ></${unsafeStatic(inputAssessmentWidget.widget.name)}>
              `
              // <${unsafeStatic(outputAssessmentWidget.widget.name)}
              //   .${unsafeStatic('assessment')}=${this.outputAssessments.get(encodeHashToBase64(outputAssessmentWidget.dimensionEh))}
              // ></${unsafeStatic(outputAssessmentWidget.widget.name)}>
          return outputHtml
        })
      }
    `
    return html`
      <style>
        slot[name="widgets"] {
          display: flex;
          background: var(--nh-theme-bg-detail);
          overflow-x: auto
        }

        .assessment-widget-menu {
          margin: auto 4px;
          cursor: pointer;
        }
        
        .assessment-widget {
          background-color: var(--nh-theme-bg-surface);
          padding: 4px;
          border: 1px solid var(--nh-theme-accent-default);
          border-radius: var(--border-r-tiny);
          display: flex;
          width: min-content;
          max-width: 100%;
          overflow: hidden;
        }
        
        .assessment-container {
          height: 40px;
          display: flex;
        }

        .menu-dot {
          width: 5px;
          height: 5px;
          margin: 4px;
          border-radius: var(--border-r-tiny);
          background-color: var(--nh-theme-accent-default);
        }
      </style>

      <div class="assessment-widget">
        <div class="assessment-container">
          <slot name="widgets">${widgets}</slot>
        </div>
        <nav class="assessment-widget-menu">
          <div class="menu-dot"></div>
          <div class="menu-dot"></div>
          <div class="menu-dot"></div>
        </nav>
      </div>
    `
  }

  static styles = [
    // super.styles as CSSResult,
    css`
      slot[name="widgets"] {
        display: flex;
        background: var(--nh-theme-bg-detail);
        overflow-x: auto
      }

      .assessment-widget-menu {
        margin: auto 4px;
        cursor: pointer;
      }
      
      .assessment-widget {
        background-color: var(--nh-theme-bg-surface);
        padding: 4px;
        border: 1px solid var(--nh-theme-accent-default);
        border-radius: var(--border-r-tiny);
        display: flex;
        width: min-content;
        max-width: 100%;
        overflow: hidden;
      }
      
      .assessment-container {
        height: 40px;
        display: flex;
      }

      .menu-dot {
        width: 5px;
        height: 5px;
        margin: 4px;
        border-radius: var(--border-r-tiny);
        background-color: var(--nh-theme-accent-default);
      }
    `,
  ];
}