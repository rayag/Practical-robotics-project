import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedingMachinesPage } from './feeding-machines.page';

const routes: Routes = [
  {
    path: '',
    component: FeedingMachinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedingMachinesPageRoutingModule {}
