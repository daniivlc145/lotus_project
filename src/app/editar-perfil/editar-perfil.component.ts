import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}


  goToConfigPage() {
  
    this.router.navigate(['/config']);
  }
  
  goToInfoPage() {

    this.router.navigate(['/info-rec']);
  }

  goToNuevaIncPage() {

    this.router.navigate(['/newI']);
  }

  goToMisPage() {

    this.router.navigate(['/misI']);
  }

  goToMapPage() {

      this.router.navigate(['/map']);
  }

  goToProfPage(){

    window.location.reload();
    
    
  }

  goToSugPage(){

    this.router.navigate(['/sug']);

  }

       
  goToAbtPage(){

    this.router.navigate(['/abt']);
  }
}