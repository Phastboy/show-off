import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LucideArrowLeft } from '@lucide/angular';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [RouterOutlet, LucideArrowLeft],
  templateUrl: './sub-page-shell.html',
  styleUrl: './sub-page-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubPageShell {
  private readonly location = inject(Location);
  private readonly route = inject(ActivatedRoute);

  // Deeply find the title from the active route data
  readonly pageTitle = computed(() => {
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data['title'] || '';
  });

  goBack(): void {
    this.location.back();
  }
}
