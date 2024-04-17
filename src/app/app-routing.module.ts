import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TutorialWelcComponent } from './tutorial/tutorial-welc/tutorial-welc.component'; 

import { TutorialAbtComponent } from './tutorial/tutorial-abt/tutorial-abt.component';

import { TutorialLastComponent } from './tutorial/tutorial-last/tutorial-last.component';

import { MapComponent } from './map/map.component';

import { InfoRecComponent } from './info-rec/info-rec.component';

import { loginComponent } from './login/login.component';

const routes: Routes = [

  {path:'tutorial-welc', component:TutorialWelcComponent},

  {path: 'tutorial-abt', component: TutorialAbtComponent },

  {path: 'tutorial-last', component:TutorialLastComponent},

  {path: 'map', component:MapComponent},

  {path:'Info-rec', component:InfoRecComponent},

  {path: 'login', component:loginComponent},

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
