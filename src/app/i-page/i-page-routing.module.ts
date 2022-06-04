import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IPagePage } from './i-page.page';

const routes: Routes = [
  {
    path: '',
    component: IPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IPagePageRoutingModule {}
