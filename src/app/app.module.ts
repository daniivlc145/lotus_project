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
import { NuevaIncidenciaComponent } from './nueva-incidencia/nueva-incidencia.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContrasenaOlvidadaComponent } from './contrasena-olvidada/contrasena-olvidada.component';
import { MisIncidenciasComponent } from './mis-incidencias/mis-incidencias.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IntroducirEmailComponent } from './introducir-email/introducir-email.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animation } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule}  from '@angular/material/dialog'
import { DialogOneComponent } from './dialog-one/dialog-one.component';
import { DialogTwoComponent } from './dialog-two/dialog-two.component';
import { profileUserComponent } from './profile-user/profile-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StringComparison } from './string-comparison/string-comparison.service';
import {MatInputModule} from '@angular/material/input';
import { mapaCalorComponent } from './mapa-calor/mapa-calor.component';
import { profileOrgComponent } from './profile-org/profile-org.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TutorialWelcComponent, // Agrega el componente TutorialWelcComponent a las declaraciones
    TutorialAbtComponent,
    TutorialLastComponent,
    InfoRecComponent,
    loginComponent,
    RegistroComponent, 
    NuevaIncidenciaComponent,
    ContrasenaOlvidadaComponent,
    MisIncidenciasComponent,
    IntroducirEmailComponent,
    DialogOneComponent,
    DialogTwoComponent,
    profileUserComponent,
    mapaCalorComponent,
    profileOrgComponent
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule, 
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
  ], 
  providers: [
    provideAnimationsAsync(),
    StringComparison,
  ], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

