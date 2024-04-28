import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaIncidenciaMAPComponent } from './nueva-incidencia-map.component';

describe('NuevaIncidenciaMAPComponent', () => {
  let component: NuevaIncidenciaMAPComponent;
  let fixture: ComponentFixture<NuevaIncidenciaMAPComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaIncidenciaMAPComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaIncidenciaMAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
