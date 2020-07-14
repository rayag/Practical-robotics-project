import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedingMachinePage } from './feeding-machine.page';

const routes: Routes = [
  {
    path: '',
    component: FeedingMachinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedingMachinePageRoutingModule {}
