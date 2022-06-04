import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCoPageRoutingModule } from './user-co-routing.module';

import { UserCoPage } from './user-co.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCoPageRoutingModule
  ],
  declarations: [UserCoPage]
})
export class UserCoPageModule {}
