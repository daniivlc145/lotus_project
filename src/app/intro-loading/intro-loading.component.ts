import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router

@Component({
  selector: 'app-intro-loading',
  templateUrl: './intro-loading.component.html',
  styleUrls: ['./intro-loading.component.scss'],
})
export class IntroLoadingComponent  implements OnInit {

  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor

  ngOnInit() {
    setTimeout(()=> {
      this.router.navigate(['/login'])
    },3500)

  }
  
}
