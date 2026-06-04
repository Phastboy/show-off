import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<'primary' | 'secondary' | 'outline' | 'text'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);

  onClick = output<Event>();

  handleClick(event: Event) {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit(event);
    }
  }
}
