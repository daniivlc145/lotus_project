import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { yaNoNuevo } from './tutorial-last.functions';

@Component({
  selector: 'app-tutorial-last',
  templateUrl: './tutorial-last.component.html',
  styleUrls: ['./tutorial-last.component.scss'],
})
export class TutorialLastComponent implements OnInit {

  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor

  ngOnInit() {}

  goToMapPage() {
    yaNoNuevo(); // Llama a la función que actualiza el estado del usuario
    this.router.navigate(['/map']); // Cambia 'login' por la ruta de tu página de inicio de sesión
  }
  
}
