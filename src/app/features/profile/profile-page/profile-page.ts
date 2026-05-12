import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { LucideUser, LucideMail, LucidePhone, LucideMapPin, LucideCamera } from '@lucide/angular';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProfileService],
  imports: [LucideUser, LucideMail, LucidePhone, LucideMapPin, LucideCamera],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  readonly vm = inject(ProfileService);

  ngOnInit() {
    this.vm.loadProfile();
  }
}
