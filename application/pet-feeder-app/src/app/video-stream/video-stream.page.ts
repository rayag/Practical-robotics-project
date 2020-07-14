import { Component, OnInit } from '@angular/core';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.page.html',
  styleUrls: ['./video-stream.page.scss'],
})
export class VideoStreamPage implements OnInit {
  private _vidsource: string;

  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this._vidsource = `http://${state.ip}:${state.port}/stream.mjpg`;
      }
    });
  }

  public get streamSrc() {
    return this._vidsource;
  }

  ngOnInit() {
  }
}
