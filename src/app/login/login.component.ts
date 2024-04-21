import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { signInUser } from './login.functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class loginComponent  implements OnInit {

  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor
  errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  ngOnInit() {}
  async signIn() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try{
      await signInUser(email,password);
      console.log('goToLoginPage() called');
      this.router.navigate(['/map']); 
    }catch(error){
      console.error('ERROR CAPTURADO:', (error as Error).message)
      this.errorMessage = (error as Error).message; // Actualiza el mensaje de error
    }
  }
}
