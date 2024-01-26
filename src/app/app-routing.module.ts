import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookComponent } from './componenti/book/book.component';
import { SearchBarComponent } from './componenti/search-bar/search-bar.component';

const routes: Routes = [
  {
    path: 'book/:id',
    component: BookComponent,
  },
  { path: '', component: SearchBarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
