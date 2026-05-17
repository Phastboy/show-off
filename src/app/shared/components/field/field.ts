import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
} from '@angular/core';

@Component({
  selector: 'app-field',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './field.html',
  styleUrl: './field.css',
  host: { class: 'field' },
})
export class Field {
  readonly label = input<string>();
  readonly required = input(false);
  readonly error = input<string | null>(null);
  readonly hint = input<string | null>(null);
}

