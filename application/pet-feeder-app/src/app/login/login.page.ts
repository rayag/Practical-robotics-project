import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = new User;
  error: boolean = false;
  errorMsg: string;
  errorConnectingServer: string = "Error connecting to server.";
  errorLogin: string = "Wrong username/password.";

  constructor(private authServ: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authServ.login(this.user.email, this.user.password).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['tabs']);
          this.error = false;
          this.errorMsg = "";
        } else {
          this.error = true;
          this.errorMsg = this.errorLogin;
        }
      },
      (error) => {
        this.error = true;
        this.errorMsg = this.errorConnectingServer;
        console.log("Unable to login")
      }
    )
  }
}
