import ResourceAssessmentTray, { AssessmentWidgetConfig, AssessmentWidgetTrayConfig } from "./resource-assessment-tray";
import { html } from "lit";
import { property } from "lit/decorators.js";
import type { Meta, StoryObj } from "@storybook/web-components";
import { CreateAssessmentWidget } from "./create-assessment-widget";
import { DisplayAssessmentWidget } from "./display-assessment-widget";
import { Assessment, RangeValueFloat } from "@neighbourhoods/client";
import { EntryHash, EntryHashB64, encodeHashToBase64 } from "@holochain/client";
import { NHComponent } from "../ancestors/base";
import { spreadProps } from "@open-wc/lit-helpers";
import NHAssessmentContainer from "./assessment-container";

class TestRoot extends NHComponent {
  static elementDefinitions = {
    'assessment-container': NHAssessmentContainer,
    'resource-assessment-tray': ResourceAssessmentTray,
  }

  render() {
    return html`<resource-assessment-tray
                  assessmentWidgetTrayConfig=${this.assessmentWidgetTrayConfig}
                  resourceEh=${this.resourceEh}
                  resourceDefEh=${this.resourceDefEh}
                  outputAssessments=${this.outputAssessments}
                >
                </resource-assessment-tray>`
  }
}

customElements.define('assessment-tray--test-root', TestRoot)
customElements.define('assessment-container', NHAssessmentContainer)

class ImportanceAssessmentWidget extends CreateAssessmentWidget {
  @property()
  emoji!: string;

  render() {
    return html`<div @click=${() => this.dispatchCreateAssessment({
        value: { Float: 1 },
        dimension_eh: this.dimensionEh,
        resource_eh: this.resourceEh,
        resource_def_eh: this.resourceDefEh,
        maybe_input_dataset: null,
      })} class="create-assessment-div">
        <assessment-container .assessmentValue=${(this.latestAssessment!.value as RangeValueFloat).Float} .iconImg=${this.emoji}></assessment-container>
    </div>`;
  }
}
class ThumbsUpEmoji extends ImportanceAssessmentWidget {
  emoji = "👍"
}
class HeartEmoji extends ImportanceAssessmentWidget {
  emoji = "❤️"
}
class StarEmoji extends ImportanceAssessmentWidget {
  emoji = "⭐"
}
class TickEmoji extends ImportanceAssessmentWidget {
  emoji = "✅"
}

class TotalImportanceWidget extends DisplayAssessmentWidget {
  render() {
    return html`<div class="display-assessment-div">${(this.assessment!.value as RangeValueFloat).Float}</div>`;
  }
}

const inputDimensionEh = (Uint8Array.from([1, 2, 3, 4]));
const inputDimensionEh1 = (Uint8Array.from([1, 23, 3, 4]));
const inputDimensionEh2 = (Uint8Array.from([1, 2, 34, 4]));
const inputDimensionEh3 = (Uint8Array.from([1, 2, 3, 45]));
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
      component: TickEmoji
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
assessmentWidgetTrayConfig.set(encodeHashToBase64(inputDimensionEh1), {
  inputAssessmentWidget: {
    dimensionEh: inputDimensionEh,
    widget: {
      name: 'likes-assessment-widget',
      range: { Float: { min: 0, max: 1 } },
      component: HeartEmoji
    },
  },
  outputAssessmentWidget: {
    dimensionEh: outputDimensionEh,
    widget: {
      name: 'total-likes-widget',
      range: { Float: { min: 0, max: 1000 } },
      component: TotalImportanceWidget
    }
  },
});
assessmentWidgetTrayConfig.set(encodeHashToBase64(inputDimensionEh2), {
  inputAssessmentWidget: {
    dimensionEh: inputDimensionEh,
    widget: {
      name: 'stars-assessment-widget',
      range: { Float: { min: 0, max: 1 } },
      component: StarEmoji
    },
  },
  outputAssessmentWidget: {
    dimensionEh: outputDimensionEh,
    widget: {
      name: 'total-stars-widget',
      range: { Float: { min: 0, max: 1000 } },
      component: TotalImportanceWidget
    }
  },
});
assessmentWidgetTrayConfig.set(encodeHashToBase64(inputDimensionEh3), {
  inputAssessmentWidget: {
    dimensionEh: inputDimensionEh,
    widget: {
      name: 'thumbs-up-assessment-widget',
      range: { Float: { min: 0, max: 1 } },
      component: ThumbsUpEmoji
    },
  },
  outputAssessmentWidget: {
    dimensionEh: outputDimensionEh,
    widget: {
      name: 'total-thumbs-up-widget',
      range: { Float: { min: 0, max: 1000 } },
      component: TotalImportanceWidget
    }
  },
});
customElements.define('importance-assessment-widget', TickEmoji);
customElements.define('thumbs-up-assessment-widget', ThumbsUpEmoji);
customElements.define('likes-assessment-widget', HeartEmoji);
customElements.define('stars-assessment-widget', StarEmoji);
customElements.define('total-thumbs-up-widget', TotalImportanceWidget);
// customElements.define('total-likes-widget', TotalImportanceWidget);
// customElements.define('total-importance-widget', TotalImportanceWidget);
// customElements.define('total-stars-widget', TotalImportanceWidget);

export interface ResourceAssessmentTrayProps {
  assessmentWidgetTrayConfig: AssessmentWidgetTrayConfig
  resourceEh: EntryHash
  resourceDefEh: EntryHash
  outputAssessments: Map<EntryHashB64, Assessment>
}

const meta: Meta<ResourceAssessmentTrayProps> = {
  title: "NHComponent/Widgets/ResourceAssessmentTray",
  component: "assessment-tray--test-root",
  argTypes: {
  },
  parameters: { 
    backgrounds: { default: 'surface' },
  },
  render: (args) => html`<assessment-tray--test-root ${spreadProps(args)} />`,
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
