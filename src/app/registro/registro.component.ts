import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { signUpUser } from './registro.functions';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  constructor(private router: Router) { } // Inyecta el servicio Router en el constructor
  errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  oculto :boolean = false;
  ngOnInit() {}
  async signUp() {
    const email = (document.getElementById('correo') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const fullName = (document.getElementById('nombre') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('telefono') as HTMLInputElement).value;
    const rep = (document.getElementById('rep') as HTMLInputElement).value;
    try{
      console.log("LLAMADA HTML");
      await signUpUser(email,password,fullName,phoneNumber,rep);
      console.log('goToLoginPage() called');
      this.router.navigate(['/login']); 
    }catch(error){
      console.error('ERROR CAPTURADO:', (error as Error).message)
      this.errorMessage = (error as Error).message; // Actualiza el mensaje de error
    }
  }
}
