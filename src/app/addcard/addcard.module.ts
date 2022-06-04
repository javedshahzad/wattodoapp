import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcardPageRoutingModule } from './addcard-routing.module';

import { AddcardPage } from './addcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcardPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddcardPage]
})
export class AddcardPageModule {}
