import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TutorialWelcComponent } from './tutorial/tutorial-welc/tutorial-welc.component'; // Importa el componente TutorialWelcComponent
import { TutorialAbtComponent } from './tutorial/tutorial-abt/tutorial-abt.component';
import { TutorialLastComponent } from './tutorial/tutorial-last/tutorial-last.component';
import { InfoRecComponent } from './info-rec/info-rec.component';
import { loginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms'; // Asegúrate de que esta línea esté presente



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TutorialWelcComponent, // Agrega el componente TutorialWelcComponent a las declaraciones
    TutorialAbtComponent,
    TutorialLastComponent,
    InfoRecComponent,
    loginComponent,
    RegistroComponent
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule
  ], 
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

