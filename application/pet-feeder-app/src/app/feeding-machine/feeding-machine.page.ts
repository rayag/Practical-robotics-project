import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedingMachine } from '../models/feeding-machine.model';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-feeding-machine',
  templateUrl: './feeding-machine.page.html',
  styleUrls: ['./feeding-machine.page.scss'],
})
export class FeedingMachinePage implements OnInit {
  id: any;
  feedingMachine: FeedingMachine;
  message: string = null;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
        this.feedingMachine = JSON.parse(localStorage.getItem('feedingMachines'))
          .find(item => item.id == this.id);
      }
    });
  }

  ngOnInit() {
  }

  onClickFeed(): void {
    this.userService.move(this.feedingMachine).subscribe(
      (response) => {
        setTimeout(() => {
            this.message = "Successfully feeded animal.";
           }, 1000);
        this.message = null;
      }
    )
  }

  public onClickVideo(): void {
    let extras = {
      state: {
        ip: this.feedingMachine.ip,
        port: this.feedingMachine.videoPort
      }
    }
    console.log("onClickVideo")
    this.router.navigate(['video-stream'], extras);
  }

}
