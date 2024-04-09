import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialWelcComponent } from './tutorial-welc/tutorial-welc.component';
import { TutorialAbtComponent } from './tutorial-abt/tutorial-abt.component';
import { TutorialLastComponent } from './tutorial-last/tutorial-last.component';

const routes: Routes = [
  { path: 'welcome', component: TutorialWelcComponent },
  { path: 'about', component: TutorialAbtComponent },
  { path: 'last', component: TutorialLastComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialRoutingModule { }