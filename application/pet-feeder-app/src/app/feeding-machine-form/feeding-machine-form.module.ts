import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedingMachineFormPageRoutingModule } from './feeding-machine-form-routing.module';

import { FeedingMachineFormPage } from './feeding-machine-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedingMachineFormPageRoutingModule
  ],
  declarations: [FeedingMachineFormPage]
})
export class FeedingMachineFormPageModule {}
