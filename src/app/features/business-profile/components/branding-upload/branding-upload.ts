import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BusinessProfileService } from '../../services/business-profile';
import type { BusinessProfile } from '../../models/business-profile.models';

@Component({
  selector: 'app-branding-upload',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './branding-upload.html',
  styleUrl: './branding-upload.css',
})
export class BrandingUpload {
  readonly profile = input.required<BusinessProfile>();

  private readonly service = inject(BusinessProfileService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly uploadingLogo = signal(false);
  protected readonly uploadingBanner = signal(false);

  protected pickLogo() {
    if (!this.isBrowser) return;
    this.pick((file) => {
      this.uploadingLogo.set(true);
      this.service.uploadLogo(this.profile().id, file).subscribe({
        next: () => this.uploadingLogo.set(false),
        error: () => this.uploadingLogo.set(false),
      });
    });
  }

  protected pickBanner() {
    if (!this.isBrowser) return;
    this.pick((file) => {
      this.uploadingBanner.set(true);
      this.service.uploadBanner(this.profile().id, file).subscribe({
        next: () => this.uploadingBanner.set(false),
        error: () => this.uploadingBanner.set(false),
      });
    });
  }

  private pick(onFile: (file: File) => void) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp,image/gif';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) onFile(file);
    };
    input.click();
  }
}

