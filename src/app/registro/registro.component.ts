import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { signUpUser } from './registro.functions';
import {MatDialog} from '@angular/material/dialog'
import { DialogOneComponent } from '../dialog-one/dialog-one.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) { } // Inyecta el servicio Router en el constructor
  errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  oculto :boolean = false;
  ngOnInit() {}

  llamada(): void{
    this.signUp().then(() => this.openDialog)
  }

  async signUp(): Promise<void> {
    const email = (document.getElementById('correo') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const fullName = (document.getElementById('nombre') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('telefono') as HTMLInputElement).value;
    const rep = (document.getElementById('rep') as HTMLInputElement).value;
    try{
      if(this.camposVacios(email,password)){throw new Error('Rellena todos los campos')}
      if(this.validarNombre(fullName)){throw new Error('Escribe un nombre válido')}
      if(this.validarTelefono(phoneNumber)){throw new Error('Teléfono incorrecto. Escribe solo dígitos')}
      if(this.validarCorreoElectronico(email)){throw new Error('Email incorrecto. Escribe un email válido')}
      if(this.validarContrasena(password,rep)){throw new Error('Las contraseñas no coinciden')}
      if(this.validarLongitudContrasena(password)){throw new Error('La contrasña debe tener 8-16 caracteres')}
      
      console.log("Intento Registrar")
      await signUpUser(email,password,fullName,phoneNumber);
      console.log('goToLoginPage() called');
      this.openDialog();
    }catch(error){
      console.error('ERROR CAPTURADO:', (error as Error).message)
      this.errorMessage = (error as Error).message; // Actualiza el mensaje de error
    }
  }
  openDialog():void{
    console.log('abre')
    const dialog = this.dialog.open(DialogOneComponent, {
      data:{
        title:'Validación del correo',
        content:'Acabamos de enviarte un correo electrónico para que verifiques la dirección propuesta. Una vez hecho esto, podrás acceder a la aplicación.',
        route: '/login'
      }
    })
  }
  validarCorreoElectronico(correo: string): boolean {
    console.log("validando email")
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !expresionRegular.test(correo);
  }
  camposVacios(email: string, password: string): boolean {
  console.log("validando email")
  return email.trim() === '' || password.trim() === '';
  }
  validarNombre(texto: string): boolean {
    const contieneDigitos = /\d/.test(texto);
    const masDe100Caracteres = texto.length > 100;
    return contieneDigitos || masDe100Caracteres;
  }
  
  validarTelefono(texto: string): boolean {
    const soloDigitos = /^\d+$/.test(texto);
    return !soloDigitos;
  }
  validarContrasena(password: string, rep: string): boolean {
    const contrasenaInvalida = password === rep;
    return !contrasenaInvalida;
  }
  validarLongitudContrasena(password: string): boolean {
    const longitudValida = password.length >= 8 && password.length <= 16;
    return !longitudValida;
  }
}
