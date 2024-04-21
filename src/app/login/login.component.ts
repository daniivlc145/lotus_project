import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { signInUser } from './login.functions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class loginComponent  implements OnInit {

  constructor( private router: Router) { } // Inyecta el servicio Router en el constructor



  ngOnInit() {}



   signIn() {
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
     
    signInUser(email, password);
      
      
    this.router.navigate(['/map']);


    
}
    
  
  


}
