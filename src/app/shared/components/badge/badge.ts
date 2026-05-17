import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant =
  | 'default'
  | 'verified'
  | 'pending'
  | 'rejected'
  | 'public'
  | 'private'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

@Component({
  selector: 'app-badge',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge.html',
  styleUrl: './badge.css',
  host: {
    '[class]': '"badge badge--" + variant()',
  },
})
export class Badge {
  readonly variant = input<BadgeVariant>('default');
}

