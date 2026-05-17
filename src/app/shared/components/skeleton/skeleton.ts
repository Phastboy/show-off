import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type SkeletonVariant = 'line' | 'block' | 'circle';

@Component({
  selector: 'app-skeleton',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css',
  host: {
    '[class]': '"skeleton skeleton--" + variant()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    'aria-hidden': 'true',
  },
})
export class Skeleton {
  readonly variant = input<SkeletonVariant>('line');
  readonly width = input<string | null>(null);
  readonly height = input<string | null>(null);
}

