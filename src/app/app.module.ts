import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TutorialWelcComponent } from './tutorial/tutorial-welc/tutorial-welc.component'; // Importa el componente TutorialWelcComponent

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TutorialWelcComponent // Agrega el componente TutorialWelcComponent a las declaraciones
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ], 
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
