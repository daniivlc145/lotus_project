import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forgotPassword } from './introducir-email.functions';
import { existsEmail } from './introducir-email.functions';
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
    await  existsEmail(email).then((existeBool) =>
      {
        if(existeBool){
          this.openDialog();
          forgotPassword(email);
        }
        else this.errorMessage = 'El correo no está registrado'

      }
    )

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