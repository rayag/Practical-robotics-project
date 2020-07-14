import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedingMachinesPageRoutingModule } from './feeding-machines-routing.module';

import { FeedingMachinesPage } from './feeding-machines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedingMachinesPageRoutingModule
  ],
  declarations: [FeedingMachinesPage]
})
export class FeedingMachinesPageModule {}
