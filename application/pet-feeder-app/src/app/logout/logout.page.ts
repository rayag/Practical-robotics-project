import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authServ.logout();
    this.router.navigate(['tabs']);
  }

  public cancel(): void {
    this.router.navigate(['tabs']);
  }

}
