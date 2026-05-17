import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  output,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  Overlay,
  OverlayRef,
  OverlayConfig,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

export type DrawerPosition = 'right' | 'bottom';

@Component({
  selector: 'app-drawer',
  imports: [A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer implements OnInit, OnDestroy {
  readonly open = model(false);
  readonly position = input<DrawerPosition>('right');
  readonly title = input<string | null>(null);
  readonly closed = output<void>();

  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  ngOnInit() {
    if (!this.isBrowser) return;
    this.createOverlay();
  }

  ngOnDestroy() {
    this.overlayRef?.dispose();
  }

  private createOverlay() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'drawer-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: true,
    });

    this.overlayRef = this.overlay.create(config);

    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe((e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  attach(tpl: TemplateRef<unknown>) {
    if (!this.overlayRef || !this.isBrowser) return;

    this.portal = new TemplatePortal(tpl, this.vcr);
    this.overlayRef.attach(this.portal);
    this.open.set(true);

    // Animate in after attach
    requestAnimationFrame(() => {
      this.overlayRef?.overlayElement.classList.add('drawer--open');
    });
  }

  close() {
    if (!this.overlayRef) return;

    this.overlayRef.overlayElement.classList.remove('drawer--open');

    setTimeout(() => {
      this.overlayRef?.detach();
      this.open.set(false);
      this.closed.emit();
    }, 300);
  }
}

