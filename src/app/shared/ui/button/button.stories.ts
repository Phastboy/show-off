import { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'UI/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [loading]="loading">Projected CTA Content</app-button>`,
  }),
};

export const Loading: Story = {
  render: (args) => ({
    props: { ...args, loading: true },
    template: `<app-button variant="primary" [loading]="loading">Processing</app-button>`,
  }),
};
