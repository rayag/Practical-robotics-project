import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { Plugins, CameraSource, CameraResultType } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user-service.service';

const { Camera } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  photo: any;

  constructor(private authService: AuthenticationService,
    private http: HttpClient,
    private userServ: UserService,
    private sanitizer: DomSanitizer) {
    authService.currentUser.subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.loadAvatar();
  }
  
  async selectPhoto() {
    const ab = await this.getPhoto(CameraSource.Photos);
    await this.uploadAll(ab)

  }

  private async getPhoto(source: CameraSource) {
    const image = await Plugins.Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: false,
      source: source
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
    return image.webPath;
  }

  public loadAvatar() {
    this.userServ.getPhoto(this.user).subscribe(
      (response) => {
        let unsafeImageUrl = URL.createObjectURL(response);
        this.photo = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      }
    )
  }

  private async uploadAll(webPath: string) {
    console.log(webPath)
    const blob = await fetch(webPath).then(r => r.blob());

    const formData = new FormData();
    formData.append('file', blob, `photo-${this.user.id}.jpg`);
    this.http.post<boolean>(`user/upload/${this.user.id}`, formData)
      .pipe(
        catchError(e => this.handleError(e)),
        finalize(() => console.log("fdsf"))
      )
      .subscribe(ok => this.showToast(ok));
  }

  private handleError(error) {
    console.log(error)
    return error;
  }

  private showToast(ok) {
    console.log(ok)
  }
}
