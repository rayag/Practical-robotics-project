import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedingMachineFormPage } from './feeding-machine-form.page';

describe('FeedingMachineFormPage', () => {
  let component: FeedingMachineFormPage;
  let fixture: ComponentFixture<FeedingMachineFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedingMachineFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedingMachineFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
