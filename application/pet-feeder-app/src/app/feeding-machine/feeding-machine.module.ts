import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedingMachinePageRoutingModule } from './feeding-machine-routing.module';

import { FeedingMachinePage } from './feeding-machine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedingMachinePageRoutingModule
  ],
  declarations: [FeedingMachinePage]
})
export class FeedingMachinePageModule {}
