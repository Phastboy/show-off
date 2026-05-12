import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import {
  LucideUser,
  LucideMail,
  LucidePhone,
  LucideCamera,
  LucideSave,
  LucideX,
} from '@lucide/angular';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
  imports: [
    ReactiveFormsModule,
    LucideUser,
    LucideMail,
    LucidePhone,
    LucideCamera,
    LucideSave,
    LucideX,
  ],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly vm = inject(ProfileService);

  readonly isEditing = signal(false);

  readonly profileForm = this.fb.group({
    name: ['', [Validators.required]],
    phoneNumber: [''],
  });

  ngOnInit() {
    this.vm.loadProfile();
  }

  startEditing() {
    const current = this.vm.user();
    if (current) {
      this.profileForm.patchValue({
        name: current.name,
        phoneNumber: current.phoneNumber,
      });
      this.isEditing.set(true);
    }
  }

  cancel() {
    this.isEditing.set(false);
  }

  save() {
    if (this.profileForm.invalid) return;

    const payload = this.profileForm.getRawValue();
    this.vm.updateProfile(payload as any).subscribe(() => {
      this.isEditing.set(false);
    });
  }
}
