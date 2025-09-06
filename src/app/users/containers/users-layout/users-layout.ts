import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-users-layout',
  standalone: false,
  templateUrl: './users-layout.html',
  styleUrl: './users-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersLayout {

}
