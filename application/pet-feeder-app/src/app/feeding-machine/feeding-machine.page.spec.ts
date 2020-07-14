import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedingMachinePage } from './feeding-machine.page';

describe('FeedingMachinePage', () => {
  let component: FeedingMachinePage;
  let fixture: ComponentFixture<FeedingMachinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingMachinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingMachinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
