import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoStreamPage } from './video-stream.page';

const routes: Routes = [
  {
    path: '',
    component: VideoStreamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoStreamPageRoutingModule {}
