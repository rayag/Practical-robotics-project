import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FeedingMachinePage } from '../feeding-machine/feeding-machine.page';
import { FeedingMachine } from '../models/feeding-machine.model';
import { environment } from '../../environments/environment';
import { FeedingMachinesPageModule } from '../feeding-machines/feeding-machines.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    login(email: string, password: string) {
      return this.http.post<any>('user/authenticate', {
        email: email,
        password: password,
        fbtoken: localStorage.getItem('fbtoken')
      }).pipe(
        map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
    }


    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('feedingMachines');
        this.currentUserSubject.next(null);
    }
}
