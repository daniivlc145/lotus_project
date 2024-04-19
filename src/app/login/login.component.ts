import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class loginComponent  implements OnInit {

  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor

  ngOnInit() {}

  goToLoginPage() {
    console.log('goToLoginPage() called');
    this.router.navigate(['/map']); 
  
  

}
}
