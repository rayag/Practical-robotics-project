import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedingMachineFormPage } from './feeding-machine-form.page';

const routes: Routes = [
  {
    path: '',
    component: FeedingMachineFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedingMachineFormPageRoutingModule {}
