import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { updatePassword } from './contrasenaOlv.functions';

@Component({
  selector: 'app-contrasena-olvidada',
  templateUrl: './contrasena-olvidada.component.html',
  styleUrls: ['./contrasena-olvidada.component.scss'],
})
export class ContrasenaOlvidadaComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {}
  
  async onClickAceptar() {
    const newPass = (document.getElementById('new') as HTMLInputElement)?.value;
    const repPass = (document.getElementById('rep') as HTMLInputElement)?.value;

    if (newPass === repPass) {
      if (this.validarLongitudContrasena(newPass)) { // Verificar longitud de la contraseña
        try {
          await updatePassword(newPass);
          this.errorMessage = null; // Reinicia el mensaje de error si se actualiza la contraseña correctamente
          console.log("Contraseña actualizada correctamente");
          // Aquí puedes redirigir al usuario a la página de éxito o hacer cualquier otra acción necesaria
        } catch (error: any) {
          if (error.message.includes('coinciden')) {
            this.errorMessage = 'Las contraseñas no coinciden';
          } else {
            this.errorMessage = error.message;
          }
          console.error(this.errorMessage);
          // Aquí puedes manejar el error de alguna manera (por ejemplo, mostrar un mensaje al usuario)
        }
      } else {
        this.errorMessage = 'La contraseña debe tener entre 8 y 16 caracteres';
        console.error(this.errorMessage);
        // Aquí puedes mostrar un mensaje al usuario indicando que la contraseña no cumple con la longitud requerida
      }
    } else {
      this.errorMessage = "Las contraseñas no coinciden";
      console.error(this.errorMessage);
      // Aquí puedes mostrar un mensaje al usuario indicando que las contraseñas no coinciden
    }
  }

  validarLongitudContrasena(password: string): boolean {
    const longitudValida = password.length >= 8 && password.length <= 16;
    return longitudValida;
  }
}
