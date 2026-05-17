import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.html',
  styleUrl: './card.css',
  host: {
    '[class]': '"card card--pad-" + padding()',
    '[class.card--hoverable]': 'hoverable()',
  },
})
export class Card {
  readonly padding = input<CardPadding>('lg');
  readonly hoverable = input(false);
}

