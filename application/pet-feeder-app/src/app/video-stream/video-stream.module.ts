import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoStreamPageRoutingModule } from './video-stream-routing.module';

import { VideoStreamPage } from './video-stream.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoStreamPageRoutingModule
  ],
  declarations: [VideoStreamPage]
})
export class VideoStreamPageModule {}
