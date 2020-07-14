import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedingMachinesPage } from './feeding-machines.page';

describe('FeedingMachinesPage', () => {
  let component: FeedingMachinesPage;
  let fixture: ComponentFixture<FeedingMachinesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingMachinesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingMachinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
