import ResourceAssessmentTray, { AssessmentWidgetConfig, AssessmentWidgetTrayConfig } from "./resource-assessment-tray";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateAssessmentWidget } from "./create-assessment-widget";
import { DisplayAssessmentWidget } from "./display-assessment-widget";
import { Assessment, RangeValueFloat } from "@neighbourhoods/client";
import { EntryHash, EntryHashB64, encodeHashToBase64 } from "@holochain/client";

class ImportanceAssessmentWidget extends CreateAssessmentWidget {
  render() {
    return html`<div @click=${() => this.dispatchCreateAssessment({
        value: { Float: 1 },
        dimension_eh: this.dimensionEh,
        resource_eh: this.resourceEh,
        resource_def_eh: this.resourceDefEh,
        maybe_input_dataset: null,
      })} class="create-assessment-div">Click to create Assessment</div>`;
  }
}

class TotalImportanceWidget extends DisplayAssessmentWidget {
  render() {
    return html`<div class="display-assessment-div">${(this.assessment!.value as RangeValueFloat).Float}</div>`;
  }
}

const inputDimensionEh = (Uint8Array.from([1, 2, 3, 4]));
const outputDimensionEh = Uint8Array.from([1, 2, 3, 5]);
const resourceEh = Uint8Array.from([1, 2, 3, 6]);
const resourceDefEh = Uint8Array.from([1, 2, 3, 7]);
const outputAssessment: Assessment = {
  value: { Float: 1 },
  dimension_eh: outputDimensionEh,
  resource_eh: resourceEh,
  resource_def_eh: resourceDefEh,
  maybe_input_dataset: null,
  author: Uint8Array.from([1, 2, 3, 8]),
  timestamp: 1234,
};

const outputAssessments = new Map<EntryHashB64, Assessment>();
outputAssessments.set(encodeHashToBase64(outputDimensionEh), outputAssessment);
const assessmentWidgetTrayConfig = new Map<EntryHashB64, AssessmentWidgetConfig>();
assessmentWidgetTrayConfig.set(encodeHashToBase64(inputDimensionEh), {
  inputAssessmentWidget: {
    dimensionEh: inputDimensionEh,
    widget: {
      name: 'importance-assessment-widget',
      range: { Float: { min: 0, max: 1 } },
      component: ImportanceAssessmentWidget
    },
  },
  outputAssessmentWidget: {
    dimensionEh: outputDimensionEh,
    widget: {
      name: 'total-importance-widget',
      range: { Float: { min: 0, max: 1000 } },
      component: TotalImportanceWidget
    }
  },
});
customElements.define('resource-assessment-tray', ResourceAssessmentTray)
customElements.define('importance-assessment-widget', ImportanceAssessmentWidget);
customElements.define('total-importance-widget', TotalImportanceWidget);

export interface ResourceAssessmentTrayProps {
  assessmentWidgetTrayConfig: AssessmentWidgetTrayConfig
  resourceEh: EntryHash
  resourceDefEh: EntryHash
  outputAssessments: Map<EntryHashB64, Assessment>
}

const meta: Meta<ResourceAssessmentTrayProps> = {
  title: "NHComponent/Widgets/ResourceAssessmentTray",
  component: "resource-assessment-tray",
  argTypes: {
  },
  render: (args) => html`<resource-assessment-tray
    assessmentWidgetTrayConfig=${args.assessmentWidgetTrayConfig}
    resourceEh=${args.resourceEh}
    resourceDefEh=${args.resourceDefEh}
    outputAssessments=${args.outputAssessments}
  >
  </resource-assessment-tray>`,
};

export default meta;

type Story = StoryObj<ResourceAssessmentTrayProps>;

export const Default: Story = {
  args: {
    assessmentWidgetTrayConfig,
    resourceEh,
    resourceDefEh,
    outputAssessments,
  },
};
