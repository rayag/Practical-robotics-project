import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FeedingMachine } from '../models/feeding-machine.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedingMachinesService {
  public feedingMachinesSubject: BehaviorSubject<FeedingMachine[]>;
  public feedingMachinesObservable: Observable<FeedingMachine[]>;

  constructor(private http: HttpClient) {
      this.feedingMachinesSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(environment.feedingMachines)));
      this.feedingMachinesObservable = this.feedingMachinesSubject.asObservable();
  }

  public get feedingMachines(): FeedingMachine[] {
    return this.feedingMachinesSubject.value;
  }

  public set feedingMachines(data) {
    localStorage.setItem(environment.feedingMachines, JSON.stringify(data));
    this.feedingMachinesSubject.next(data);
  }

  public loadPets(id: any) {
    if (id != null) {
      return this.http.get<any>(`user/feedingmachines/${id}`).pipe(
        map(data => {
          localStorage.setItem(environment.feedingMachines, JSON.stringify(data));
          this.feedingMachinesSubject.next(data);
          return data;
        })
      );
    }
  }

  public delete(id: number) {
    let currentFeedingMachines = this.feedingMachines;
    this.feedingMachines = currentFeedingMachines.filter(item => item.id !== id);
    return this.http.delete<any>(`fm/${id}`);
  }

  private addFeedingMachineToStorage(fm: FeedingMachine) {
    let currentFeedingMachines = JSON.parse(localStorage.getItem(environment.feedingMachines));
    if (currentFeedingMachines) 
      currentFeedingMachines.push(fm);
    else 
      currentFeedingMachines = [fm];

    this.feedingMachinesSubject.next(currentFeedingMachines);
    localStorage.setItem(environment.feedingMachines, JSON.stringify(currentFeedingMachines));
  }

  private updateFeedingMachinesInStorage(fm: FeedingMachine) {
    let currentFeedingMachines = JSON.parse(localStorage.getItem(environment.feedingMachines));
    let current = currentFeedingMachines.find(item => item.id == fm.id);
    current.name = fm.name;
    current.ip = fm.ip;

    this.feedingMachinesSubject.next(currentFeedingMachines);
    localStorage.setItem(environment.feedingMachines, JSON.stringify(currentFeedingMachines));
  }

  public addFeedingMachine(fm: FeedingMachine, id: number) {
    this.http.post(`user/add_feeding_machine/${id}`, JSON.stringify(fm), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.addFeedingMachineToStorage(<FeedingMachine>response);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  public updateFeedingMachine(fm: FeedingMachine) {
    this.http.post(`fm/update`, JSON.stringify(fm), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      (response) => {
        this.updateFeedingMachinesInStorage(fm);     
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
