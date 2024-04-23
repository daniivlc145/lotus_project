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


  // Variable para almacenar el último botón seleccionado
 lastSelectedButtonId: string | null = null;

 handleButtonClick(buttonId: string) {
  // Verificar si el botón actual es diferente al último seleccionado
  if (buttonId !== this.lastSelectedButtonId) {
      const otherButtonId = buttonId === 'userbutton' ? 'orgbutton' : 'userbutton';
      this.swapStyles(buttonId, otherButtonId);

      // Actualizar el último botón seleccionado
      this.lastSelectedButtonId = buttonId;

      // Obtener el div de registro
      const registroDiv = document.querySelector('.registro');

      if (buttonId === 'orgbutton') {
          registroDiv?.classList.add('hidden'); // Ocultar el div
      } else {
          registroDiv?.classList.remove('hidden'); // Mostrar el div
      }
  }
}


swapStyles(buttonId: string, otherbuttonId: string) {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  const button2 = document.getElementById(otherbuttonId) as HTMLButtonElement;

  // Obtener estilos del primer botón
  const computedStyle1 = window.getComputedStyle(button);
  const bgColor1 = computedStyle1.backgroundColor;
  const color1 = computedStyle1.color;
  const borderRadius1 = computedStyle1.borderRadius;
  const font = computedStyle1.fontWeight;

  // Obtener estilos del segundo botón
  const computedStyle2 = window.getComputedStyle(button2);
  const bgColor2 = computedStyle2.backgroundColor;
  const color2 = computedStyle2.color;
  const borderRadius2 = computedStyle2.borderRadius;
  const font2 = computedStyle2.fontWeight;

  // Intercambiar estilos del primer botón con el segundo botón
  button.style.backgroundColor = bgColor2;
  button.style.color = color2;
  button.style.borderRadius = borderRadius2;
  button.style.fontWeight = font2;

  // Intercambiar estilos del segundo botón con el primer botón
  button2.style.backgroundColor = bgColor1;
  button2.style.color = color1;
  button2.style.borderRadius = borderRadius1;
  button2.style.fontWeight = font;
}







}
  
