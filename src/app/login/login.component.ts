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
  ngOnInit() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    emailInput.addEventListener('input', () => {
      this.applyFontStyle(emailInput);
    });
    passwordInput.addEventListener('input', () => {
      this.applyFontStyle(passwordInput);
    });
  
  
  }



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

  applyFontStyle(inputElement: HTMLInputElement) {
    const inputValue = inputElement.value;
  
    // Aplicar estilos de fuente dependiendo del tipo de carácter ingresado
    let font = '';
  
    for (let char of inputValue) {  
      
      if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
        font = "'Handwriting', sans-serif"; // Fuente para números y símbolos
        break;
      }
      if (/[a-zA-Z]/.test(char)) {
        font = "'Laura Regular', sans-serif"; // Fuente para letras
        break;
      } 
      
    
    }
  
    inputElement.style.fontFamily = font;
  }
  swapStyles() {
    
    const userbutton = document.getElementById('signinbutton');
    const orgbutton = document.getElementById('signupbutton');
    console.log(userbutton)
 if (userbutton && orgbutton) {
    if (userbutton.classList.contains('signin')) {
      userbutton.classList.remove('signin');
      userbutton.classList.add('signup');
      orgbutton.classList.remove('signup');
      orgbutton.classList.add('signin');
    } else {
      userbutton.classList.remove('signup');
      userbutton.classList.add('signin');
      orgbutton.classList.remove('signin');
      orgbutton.classList.add('signup');
    }
 }
  }

}
  
