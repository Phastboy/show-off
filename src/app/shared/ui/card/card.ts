import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  border = input<boolean>(true);
  padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  hoverEffect = input<boolean>(false);
  shadow = input<'none' | 'sm' | 'md' | 'lg'>('sm');
}
