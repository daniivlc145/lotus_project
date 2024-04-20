import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],
})

export class NuevaIncidenciaComponent  implements OnInit {
  dropdownVisible = false;
  constructor(private router: Router) { this.selectedOption = '';}

  ngOnInit() {}

  goToHomePage() {
    console.log('goToHomePage() called');
    this.router.navigate(['/map']);
  }

  selectedOption: string;
    options = [
        { value: 'cLlleno', label: 'CONTENEDOR LLENO' },
        { value: 'refInf', label: 'RECLAMACIÓN/INFORME' },
        { value: 'pet', label: 'PETICIÓN' },
        { value: 'preg', label: 'PREGUNTA' }
    ];

    selectOption(option: string) {
      this.selectedOption = option;
    }

}
