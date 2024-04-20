import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],
})

export class NuevaIncidenciaComponent  implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {}

  goToHomePage() {
    console.log('goToHomePage() called');
    this.router.navigate(['/map']);
  }

}
