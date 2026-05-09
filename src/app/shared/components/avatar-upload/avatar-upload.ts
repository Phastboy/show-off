import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { UserService } from '../../../core/services/user';

export interface AvatarUploadResult {
  url: string;
  id: string;
}

@Component({
  selector: 'app-avatar-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.css',
})
export class AvatarUpload {
  private readonly userService = inject(UserService);

  currentUrl = input<string | null>(null);

  uploaded = output<AvatarUploadResult>();
  error = output<string>();

  readonly uploading = signal(false);
  readonly preview = signal<string | null>(null);

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.error.emit('Only image files are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.error.emit('File must be under 5MB.');
      return;
    }

    // local preview
    const reader = new FileReader();
    reader.onload = (e) => this.preview.set(e.target?.result as string);
    reader.readAsDataURL(file);

    this.uploading.set(true);
    this.userService.uploadAvatar(file).subscribe({
      next: (res) => {
        this.uploading.set(false);
        this.uploaded.emit(res);
      },
      error: () => {
        this.uploading.set(false);
        this.preview.set(null);
        this.error.emit('Upload failed. Please try again.');
      },
    });
  }

  get displayUrl() {
    return this.preview() ?? this.currentUrl();
  }
}
