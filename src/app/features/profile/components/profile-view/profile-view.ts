import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { User } from '../../../../core/models/user.models';

@Component({
  selector: 'app-profile-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LowerCasePipe],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
})
export class ProfileView {
  user = input.required<User>();
  editRequested = output<void>();
}
