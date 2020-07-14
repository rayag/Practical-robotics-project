import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FeedingMachine } from '../../models/feeding-machine.model';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  @Input() feedingMachines : FeedingMachine[];

  constructor() { 
  }

  ngOnInit() {}

}
