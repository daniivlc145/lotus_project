import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaIncOrgComponent } from './vista-inc-org.component';

describe('VistaIncOrgComponent', () => {
  let component: VistaIncOrgComponent;
  let fixture: ComponentFixture<VistaIncOrgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaIncOrgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaIncOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
