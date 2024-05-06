import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent  implements OnInit {

  errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  constructor(private router: Router) { }
  email = "";
  numero = "";
  password = "";
  repeatpassword = "";

  ngOnInit() {}


  goToConfigPage() {
  
    this.router.navigate(['/config']);
  }
  
  goToInfoPage() {

    this.router.navigate(['/info-rec']);
  }

  goToNuevaIncPage() {

    this.router.navigate(['/newI']);
  }

  goToMisPage() {

    this.router.navigate(['/misI']);
  }

  goToMapPage() {

      this.router.navigate(['/map']);
  }

  goToProfPage(){

    window.location.reload();
    
    
  }

  goToSugPage(){

    this.router.navigate(['/sug']);

  }

       
  goToAbtPage(){

    this.router.navigate(['/abt']);
  }

  isSecondTextboxActive = true;

  onFirstTextboxChange() {
    this.isSecondTextboxActive = this.password === "";
  }
  saveChanges(){
    console.log('guardar')
    try {
      if (areAllTextBoxesEmpty(this.email,this.password,this.numero)) {
        throw new Error('Rellena al menos un campo');
      }
      if (this.numero.trim()!= "") {
        if (validarTelefono(this.numero)) {
          throw new Error('Teléfono incorrecto. Escribe solo dígitos');
        }
        // cambiar teléfono
      }
      if (this.email.trim()!= "") {
        if (validarCorreoElectronico(this.email)) {
          throw new Error('Email incorrecto. Escribe un email válido');
        }
        // cambiar email
      }
      if (this.password.trim()!= "") {
        if (validarContrasena(this.password, this.repeatpassword)) {
          throw new Error('Las contraseñas no coinciden');
        }
        if (validarLongitudContrasena(this.password)) {
          throw new Error('La contrasña debe tener 8-16 caracteres');
        }
      }
    }catch(error){
      console.error('ERROR CAPTURADO:', (error as Error).message)
      this.errorMessage = (error as Error).message; // Actualiza el mensaje de error
  }
  
  }
}
function validarCorreoElectronico(correo: string): boolean {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !expresionRegular.test(correo);
}

function validarTelefono(texto: string): boolean {
  const soloDigitos = /^\d+$/.test(texto);
  return !soloDigitos;
}

function validarContrasena(password: string, rep: string): boolean {
  const contrasenaInvalida = password === rep;
  return !contrasenaInvalida;
}
function validarLongitudContrasena(password: string): boolean {
  const longitudValida = password.length >= 8 && password.length <= 16;
  return !longitudValida;
}

function areAllTextBoxesEmpty(email:string, password: string, number: string): boolean {
  console.log('campos vacíos')
  return email.trim() === "" &&
         number.trim() === "" &&
         password.trim() === ""
}


