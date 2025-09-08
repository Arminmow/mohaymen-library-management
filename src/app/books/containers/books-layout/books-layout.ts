import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-books-layout',
  standalone: false,
  templateUrl: './books-layout.html',
  styleUrl: './books-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksLayout {}
