import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IPagePageRoutingModule } from './i-page-routing.module';

import { IPagePage } from './i-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IPagePageRoutingModule
  ],
  declarations: [IPagePage]
})
export class IPagePageModule {}
