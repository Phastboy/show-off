import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.models';

export interface ProfileEditValue {
  name: string;
  avatarFile: File | null; // null = no change
}

@Component({
  selector: 'app-profile-edit-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-edit-form.html',
  styleUrl: './profile-edit-form.css',
})
export class ProfileEditForm {
  private readonly fb = inject(FormBuilder);

  user = input.required<User>();
  saving = input<boolean>(false);

  saved = output<ProfileEditValue>();
  cancelled = output<void>();

  readonly avatarPreview = signal<string | null>(null);
  private pendingAvatarFile: File | null = null;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit() {
    this.form.patchValue({ name: this.user().name });
  }

  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;

    this.pendingAvatarFile = file;

    const reader = new FileReader();
    reader.onload = (e) => this.avatarPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  get displayAvatar() {
    return this.avatarPreview() ?? this.user().avatarUrl;
  }

  get nameInvalid() {
    const c = this.form.controls.name;
    return c.invalid && c.touched;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saved.emit({
      name: this.form.getRawValue().name,
      avatarFile: this.pendingAvatarFile,
    });
  }

  cancel() {
    this.cancelled.emit();
  }
}
