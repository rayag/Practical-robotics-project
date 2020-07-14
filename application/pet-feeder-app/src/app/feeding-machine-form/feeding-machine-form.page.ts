import { Component, OnInit } from '@angular/core';
import { FeedingMachine } from '../models/feeding-machine.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedingMachinesService } from '../services/feeding-machines.service';

@Component({
  selector: 'app-feeding-machine-form',
  templateUrl: './feeding-machine-form.page.html',
  styleUrls: ['./feeding-machine-form.page.scss'],
})
export class FeedingMachineFormPage implements OnInit {
  feedingMachine: FeedingMachine = new FeedingMachine;
  isEdit: boolean = false;

  constructor(private fmServ: FeedingMachinesService, 
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.feedingMachine = this.router.getCurrentNavigation().extras.state.feedingMachine;
        this.isEdit = true;
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.isEdit) {
      this.fmServ.updateFeedingMachine(this.feedingMachine);
    } else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.fmServ.addFeedingMachine(this.feedingMachine, currentUser ? currentUser.id : null);
    }
    this.router.navigate(['tabs/fms']);
  }

}
