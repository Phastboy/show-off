import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type BtnSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[appBtn], a[appBtn]',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './btn.html',
  styleUrl: './btn.css',
  host: {
    '[class]': '"btn btn--" + variant() + " btn--" + size()',
    '[class.btn--loading]': 'loading()',
    '[attr.disabled]': 'loading() || null',
    '[attr.aria-busy]': 'loading()',
  },
})
export class Btn {
  readonly variant = input<BtnVariant>('primary');
  readonly size = input<BtnSize>('md');
  readonly loading = input(false);
}

