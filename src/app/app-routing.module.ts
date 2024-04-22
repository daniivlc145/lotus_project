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

import { DialogOneComponent } from './dialog-one/dialog-one.component';


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

  {path: 'autocomplete', component: AutocompleteComponent},

  {path: 'dialogOne', component:DialogOneComponent},

  {
    path: '',
    redirectTo: 'tutorial-welc',
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
