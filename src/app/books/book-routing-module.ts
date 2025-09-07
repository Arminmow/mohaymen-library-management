import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksLayout } from './containers/books-layout/books-layout';

const routes: Routes = [
  {
    path: '',
    component: BooksLayout
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
