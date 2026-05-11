import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user';
import {
  AvatarUpload,
  AvatarUploadResult,
} from '../../../shared/components/avatar-upload/avatar-upload';
import type { UserProfile } from '../../../core/models/api.models';

@Component({
  selector: 'app-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AvatarUpload],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly serverError = signal<string | null>(null);
  readonly successMsg = signal<string | null>(null);
  readonly profile = signal<UserProfile | null>(null);

  // pending avatar from upload — applied on save
  private pendingAvatar: { url: string; id: string } | null = null;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: [''],
  });

  constructor() {
    this.userService.getProfile().subscribe({
      next: (p) => {
        this.profile.set(p);
        this.form.patchValue({
          name: p.name ?? '',
          phoneNumber: p.phoneNumber ?? '',
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.serverError.set('Could not load profile.');
      },
    });
  }

  onAvatarUploaded(result: AvatarUploadResult) {
    this.pendingAvatar = result;
  }

  onAvatarError(msg: string) {
    this.serverError.set(msg);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.serverError.set(null);
    this.successMsg.set(null);

    const dto = {
      ...this.form.getRawValue(),
      ...(this.pendingAvatar
        ? { avatarUrl: this.pendingAvatar.url, avatarId: this.pendingAvatar.id }
        : {}),
    };

    this.userService.updateProfile(dto).subscribe({
      next: (updated) => {
        this.profile.set(updated);
        this.pendingAvatar = null;
        this.saving.set(false);
        this.successMsg.set('Profile updated.');
        setTimeout(() => this.successMsg.set(null), 3000);
      },
      error: () => {
        this.saving.set(false);
        this.serverError.set('Failed to save. Please try again.');
      },
    });
  }
}
