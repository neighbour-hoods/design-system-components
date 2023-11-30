import { literal } from 'lit/static-html.js';
import NHMenu from "./menu";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import { b64images } from '@neighbourhoods/design-system-styles';

customElements.define('nh-menu', NHMenu)

export interface MenuProps {
}

const meta: Meta<MenuProps> = {
  title: "NHComponent/Menu",
  component: "nh-menu",
  argTypes: {
  },
  render: (_args) => html`<nh-menu
  >
  </nh-menu>`,
};

export default meta;

type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
  },
};
export const HorizontalButtons: Story = {
  args: {
    direction: "horizontal",
    itemLabels: ["Posts", "Popular", "Recent", "Review"],
    itemComponentTag: literal`nh-button`,
    itemComponentProps: { variant: "primary", size: "lg" },
    fixedFirstItem: false,
    addItemButton: false,
    theme: "dark",
  },
};

export const VerticalButtons: Story = {
  args: {
    direction: "vertical",
    itemLabels: ["Posts", "Popular", "Recent", "Review"],
    itemComponentTag: literal`nh-button`,
    itemComponentProps: { variant: "primary", size: "stretch" },
    fixedFirstItem: false,
    addItemButton: false,
    theme: "dark",
  },
};

export const DashboardIconButtons: Story = {
  args: {
    direction: "horizontal",
    itemLabels: ["", ""],
    itemComponentTag: literal`nh-button`,
    itemComponentProps: {
      variant: "primary",
      iconImageB64: b64images.icons.refresh,
      size: "icon",
    },
    fixedFirstItem: false,
    addItemButton: false,
    theme: "dark",
  },
};
export const HorizontalIconButtons: Story = {
  args: {
    direction: "horizontal",
    itemLabels: ["Posts", "Popular", "Recent", "Review"],
    itemComponentTag: literal`nh-button`,
    itemComponentProps: {
      variant: "primary",
      iconImageB64: b64images.icons.refresh,
      size: "lg",
    },
    fixedFirstItem: false,
    addItemButton: false,
    theme: "dark",
  },
};
export const HorizontalTabButtons: Story = {
  args: {
    fixedFirstItem: true,
    direction: "horizontal",
    itemLabels: ["Posts", "Popular", "Recent", "Review"],
    itemComponentTag: literal`nh-tab-button`,
    itemComponentProps: { size: "lg" },
    addItemButton: true,
    theme: "dark",
  },
};
