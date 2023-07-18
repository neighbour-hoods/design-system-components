import './card';
import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

interface CardProps {
  title: string;
  heading: string;
}

const meta: Meta<CardProps> = {
  title: 'NHComponentShoelace/Card',
  component: 'nh-card',
  argTypes: {
    title: { control: 'text' },
    heading: { control: 'text' },
  },
  render:  (args) => html`<nh-card .title=${args.title} .heading=${args.heading}>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mi massa, auctor vitae viverra et, consequat vulputate felis. Integer congue leo quis urna vestibulum varius. Duis vehicula ligula id leo.</p>
  </nh-card>`,
};

export default meta;

type Story = StoryObj<CardProps>;

export const Primary: Story = {
  args: {
    title: 'Primary Title',
    heading: 'Primary Heading',
  },
};
export const NoHeading: Story = {
  args: {
    title: 'Welcome to Neighbourhoods',
    heading: '',
  },
};
export const NoTitle: Story = {
  args: {
    title: '',
    heading: 'Primary Heading',
  },
};