import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCoPage } from './user-co.page';

const routes: Routes = [
  {
    path: '',
    component: UserCoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCoPageRoutingModule {}
