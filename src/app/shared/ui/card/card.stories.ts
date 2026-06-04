import { Meta, StoryObj } from '@storybook/angular';
import { Card } from './card';

const meta: Meta<Card> = {
  title: 'UI/Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Sets the internal padding space size of the card content container.',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Sets the intensity level of the card box-shadow layer.',
    },
    border: {
      control: 'boolean',
      description: 'Toggles the outer line boundary border contour of the card.',
    },
    hoverEffect: {
      control: 'boolean',
      description: 'Enables micro-interaction hover scaling and deeper shadow transitions.',
    },
  },
};

export default meta;
type Story = StoryObj<Card>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-card [border]="border" [padding]="padding" [hoverEffect]="hoverEffect" [shadow]="shadow">
        <div card-header>
          <h3 class="text-sm font-bold text-white">Projected Card Title</h3>
          <p class="text-[11px] text-zinc-400 mt-0.5">Sub-text from the calling scope</p>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          The main card text content goes here. The header and footer lines of this card
          have been projected into separate content zones, and will instantly dismiss if empty.
        </p>
        <div card-footer class="flex items-center justify-end gap-2 text-xs">
          <span class="text-zinc-500 font-mono">Reference #9102-A</span>
        </div>
      </app-card>
    `,
  }),
};

export const InteractiveHover: Story = {
  render: (args) => ({
    props: { ...args, hoverEffect: true, shadow: 'md' },
    template: `
      <app-card [border]="border" [padding]="padding" [hoverEffect]="hoverEffect" [shadow]="shadow">
        <div card-header class="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
          ✨ ACTIVE OPPORTUNITY
        </div>
        <p class="text-xs text-zinc-200">
          Tap or hover this card container to view the micro-animation lift effect. This visual transition helps indicate clickability to users.
        </p>
      </app-card>
    `,
  }),
};

export const FlatTransparent: Story = {
  render: (args) => ({
    props: { ...args, border: false, shadow: 'none', padding: 'sm' },
    template: `
      <app-card [border]="border" [padding]="padding" [hoverEffect]="hoverEffect" [shadow]="shadow">
        <h4 class="text-xs font-bold text-zinc-200 mb-1">Flat Container</h4>
        <p class="text-xs text-zinc-400">
          Using zero borders and flat shadows renders this container completely flush with the parent viewport, useful for inline list arrays.
        </p>
      </app-card>
    `,
  }),
};
