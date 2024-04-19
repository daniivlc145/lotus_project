import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router

@Component({
  selector: 'app-tutorial-last',
  templateUrl: './tutorial-last.component.html',
  styleUrls: ['./tutorial-last.component.scss'],
})
export class TutorialLastComponent implements OnInit {

  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor

  ngOnInit() {}

  goToLoginPage() {
    console.log('goToLoginPage() called');
    this.router.navigate(['/login']); // Cambia 'login' por la ruta de tu página de inicio de sesión
  }
  
}
