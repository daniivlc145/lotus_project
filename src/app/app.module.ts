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
import { profileUserComponent } from './profile-user/profile-user.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StringComparison } from './string-comparison/string-comparison.service';
import {MatInputModule} from '@angular/material/input';
import { mapaCalorComponent } from './mapa-calor/mapa-calor.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { profileOrgComponent } from './profile-org/profile-org.component';
import { SugerenciaComponent } from './sugerencia/sugerencia.component';
import { PopinfoOneComponent } from './popinfo-one/popinfo-one.component';
import {PopinfoTwoComponent} from './popinfo-two/popinfo-two.component';
import { ConfigComponent } from './config/config.component';
import { NuevaIncidenciaMAPComponent } from './nueva-incidencia-map/nueva-incidencia-map.component';
import {PoplogOutComponent} from './poplog-out/poplog-out.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { StatsComponent } from './stats/stats.component';
import { VistaIncOrgComponent } from './vista-inc-org/vista-inc-org.component';

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
    profileUserComponent,
    mapaCalorComponent,
    AboutUsComponent,
    mapaCalorComponent,
    PopinfoOneComponent,
    profileOrgComponent,
    PopinfoTwoComponent,
    SugerenciaComponent,
    ConfigComponent,
    NuevaIncidenciaMAPComponent,
    PoplogOutComponent,
    EditarPerfilComponent,
    StatsComponent,
    VistaIncOrgComponent
  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule, 
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
  ], 
  exports:[
    PopinfoOneComponent,
    PopinfoTwoComponent,
    PoplogOutComponent
  ],
  providers: [
    provideAnimationsAsync(),
    StringComparison,
  ], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 
  constructor() {}
}

