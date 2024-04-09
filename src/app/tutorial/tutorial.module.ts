import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialWelcComponent } from './tutorial-welc/tutorial-welc.component';
import { TutorialAbtComponent } from './tutorial-abt/tutorial-abt.component';
import { TutorialLastComponent } from './tutorial-last/tutorial-last.component';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    TutorialWelcComponent,
    TutorialAbtComponent,
    TutorialLastComponent
  ],
  imports: [
    CommonModule,
    TutorialRoutingModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class TutorialModule { }
