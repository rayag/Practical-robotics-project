import { Component, OnInit } from '@angular/core';
import { FeedingMachine } from '../models/feeding-machine.model';
import { Router } from '@angular/router';
import { FeedingMachinesService } from '../services/feeding-machines.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feeding-machines',
  templateUrl: './feeding-machines.page.html',
  styleUrls: ['./feeding-machines.page.scss'],
})
export class FeedingMachinesPage implements OnInit {
  feedingMachines: FeedingMachine[];

  constructor(private router: Router, private fmServ: FeedingMachinesService, 
    private authServ: AuthenticationService,
    private alertController: AlertController) { }
    private deleteClicked: boolean = false;

  ngOnInit() {
    this.loadPets();
  }

  private loadPets() {
    let currentUser = this.authServ.currentUserValue;
    this.fmServ.loadPets(currentUser ? currentUser.id : null).subscribe(
      (response) => {
        console.log("successfully loaded pets")
      },
      (error) => {
        console.log("error loading pets")
      }
    )
    this.fmServ.feedingMachinesSubject.subscribe((nextValue) => {
      this.feedingMachines = nextValue;
    });
  }

  async onClick(event: any) {
    let extras = {
      state: {
        id: event
      }
    };
    this.router.navigate(['feeding-machine'], extras);
  }

  public deleteFeedingMachine(id: number) {
    console.log("1")
    this.deleteClicked = true;
    this.fmServ.delete(id).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  async presentDeleteConfirm(fm: FeedingMachine) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm deletion',
      message: `Do you really want to delete ${fm.name} ?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          cssClass: 'primary',
          handler: () => {
            this.deleteFeedingMachine(fm.id);
          }
        }
      ]
    });

    await alert.present();
  }

  onClickEdit(fm: FeedingMachine) {
    let extras = {
      state: {
        feedingMachine: fm 
      }
    };
    this.router.navigate(['fm-form'], extras);
  }

  onClickAdd() {
    this.router.navigate(['fm-form']);
  }

}
