import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { FeedingMachine } from '../models/feeding-machine.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`users`);
  }

  register(user: User) {
    return this.http.post('register', JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json'
      }});
  }

  move(fm: FeedingMachine) {
    return this.http.get<any>(`fm/move/${fm.id}`);
  }

  getPhoto(user: User) {
    return this.http.get(`user/photo/${user.id}`, {responseType: 'blob'});
  }
}
