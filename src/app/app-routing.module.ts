import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialWelcComponent } from './tutorial/tutorial-welc/tutorial-welc.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/tutorial-welc', pathMatch: 'full' }, // Redirige a /tutorial-welc por defecto
  { path: 'tutorial-welc', component:TutorialWelcComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
