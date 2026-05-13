import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from './profile.service';
import { ProfileView } from '../components/profile-view/profile-view';
import { ProfileEditForm, ProfileEditValue } from '../components/profile-edit-form/profile-edit-form';

@Component({
  selector: 'app-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
  imports: [ProfileView, ProfileEditForm],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  readonly vm = inject(ProfileService);
  readonly isEditing = signal(false);

  ngOnInit() {
    this.vm.load().subscribe();
  }

  onEditRequested() {
    this.isEditing.set(true);
  }

  onSaved(value: ProfileEditValue) {
    this.vm.save(value.name, value.avatarFile).subscribe({
      next: () => this.isEditing.set(false),
    });
  }

  onCancelled() {
    this.isEditing.set(false);
  }
}
