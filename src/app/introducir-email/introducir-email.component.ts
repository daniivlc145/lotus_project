import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { supabaseClient } from 'src/supabase_client';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';
import {MatDialog} from '@angular/material/dialog'


@Component({
  selector: 'app-introducir-email',
  templateUrl: './introducir-email.component.html',
  styleUrls: ['./introducir-email.component.scss'],
})
export class IntroducirEmailComponent  implements OnInit {
errorMessage: string | null = null; // Esta es la propiedad que mencionaste

  constructor(private router: Router,public dialog: MatDialog) { }

  ngOnInit() {}

  async sendEmail(){
    console.log('send email')
    const email = (document.getElementById('email') as HTMLInputElement).value
    if(camposVacios(email)){this.errorMessage = 'Rellena el campo obligatoriamente';return}
    if(validarCorreoElectronico(email)){this.errorMessage = 'Introduce un correo válido';return}
    const {data, error} = await supabaseClient.auth.getUser(email) //usar SignInWithPasswordlessCredentials pero me daba error
    if (error) {
      this.errorMessage = 'El correo no está registrado' // Actualiza el mensaje de error
    }
    else{
      this.openDialog();
    }

  }
  openDialog():void{
    console.log('abre')
    const dialog = this.dialog.open(DialogOneComponent, {
      data:{
        title:'Recuperar contraseña',
        content:'Acabamos de enviarte un correo electrónico para que puedas cambiar tu contraseña anterior',
        route: '/login'
      }
    })
  }

}

function validarCorreoElectronico(correo: string): boolean {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !expresionRegular.test(correo);
}

function camposVacios(email: string): boolean {
  return email.trim() === '';
}