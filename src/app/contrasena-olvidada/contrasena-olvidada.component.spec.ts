import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContrasenaOlvidadaComponent } from './contrasena-olvidada.component';

describe('ContrasenaOlvidadaComponent', () => {
  let component: ContrasenaOlvidadaComponent;
  let fixture: ComponentFixture<ContrasenaOlvidadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenaOlvidadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContrasenaOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
