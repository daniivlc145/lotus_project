import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TutorialWelcComponent } from './tutorial/tutorial-welc/tutorial-welc.component'; 

import { TutorialAbtComponent } from './tutorial/tutorial-abt/tutorial-abt.component';

import { TutorialLastComponent } from './tutorial/tutorial-last/tutorial-last.component';

import { MapComponent } from './map/map.component';

import { InfoRecComponent } from './info-rec/info-rec.component';

import { loginComponent } from './login/login.component';

import { RegistroComponent } from './registro/registro.component';

import { NuevaIncidenciaComponent }   from './nueva-incidencia/nueva-incidencia.component';

import { ContrasenaOlvidadaComponent } from './contrasena-olvidada/contrasena-olvidada.component';

import { StringComparisonComponent } from './string-comparison/string-comparison.component';

import { MisIncidenciasComponent } from './mis-incidencias/mis-incidencias.component';

import { IntroducirEmailComponent } from './introducir-email/introducir-email.component';

import { profileUserComponent } from './profile-user/profile-user.component';

import { mapaCalorComponent } from './mapa-calor/mapa-calor.component';

import { AboutUsComponent } from './about-us/about-us.component';

import { profileOrgComponent } from './profile-org/profile-org.component';

import { SugerenciaComponent } from './sugerencia/sugerencia.component';

import { ConfigComponent } from './config/config.component';

import { NuevaIncidenciaMAPComponent } from './nueva-incidencia-map/nueva-incidencia-map.component';

import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

import { StatsComponent } from './stats/stats.component';

import { VistaIncOrgComponent } from './vista-inc-org/vista-inc-org.component';

import { IntroLoadingComponent } from './intro-loading/intro-loading.component';


const routes: Routes = [

  {path:'tutorial-welc', component:TutorialWelcComponent},

  {path: 'tutorial-abt', component: TutorialAbtComponent },

  {path: 'tutorial-last', component:TutorialLastComponent},

  {path: 'map', component:MapComponent},

  {path:'info-rec', component:InfoRecComponent},

  {path: 'login', component:loginComponent},

  {path: 'reg', component:RegistroComponent},

  {path: 'newI', component:NuevaIncidenciaComponent},

  {path: 'contrasenaOlv', component: ContrasenaOlvidadaComponent},

  {path: 'string', component: StringComparisonComponent},

  {path: 'misI', component: MisIncidenciasComponent},

  {path: 'email', component:IntroducirEmailComponent},

  {path: 'profUser', component:profileUserComponent},

  {path: 'mapCalor', component:mapaCalorComponent},

  {path: 'abt', component:AboutUsComponent},

  {path: 'profOrg', component:profileOrgComponent},

  {path: 'sug', component:SugerenciaComponent},

  {path: 'config', component:ConfigComponent},

  {path: 'newImap', component: NuevaIncidenciaMAPComponent},

  {path:'editarPerfil', component: EditarPerfilComponent},

  {path: 'stats', component:StatsComponent},

  {path: 'incOrg', component:VistaIncOrgComponent},

  {path: 'load', component:IntroLoadingComponent},

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
