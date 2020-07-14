import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoStreamPage } from './video-stream.page';

describe('VideoStreamPage', () => {
  let component: VideoStreamPage;
  let fixture: ComponentFixture<VideoStreamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoStreamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoStreamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
