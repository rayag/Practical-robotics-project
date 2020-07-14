import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public currentUser: User;

  constructor(private authServ: AuthenticationService) {
    authServ.currentUser.subscribe(data => this.currentUser = data);
  }

}
