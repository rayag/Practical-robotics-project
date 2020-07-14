import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { PushNotification, Plugins, PushNotificationToken } from '@capacitor/core'

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users: User[];
  apiurl = environment.apiUrl;
  token: any;

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(data);
    });

    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        PushNotifications.register();
      } else {

      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('setting fb token')
        localStorage.setItem('fbtoken', token.value);
    });
  }

  makeRequest() {
    console.log("Make request")
    this.userService.getAll().subscribe(data => {
      this.users = data;
      console.log(data);
    })
  }
}
