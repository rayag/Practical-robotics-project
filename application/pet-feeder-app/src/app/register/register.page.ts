import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User;

  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userServ.register(this.user).subscribe(
      (response) => {
        this.router.navigate(['tabs']);
      },
      (error) => console.log("error")
    )
  }

}
