import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forgotPassword } from './introducir-email.functions';
import { existsEmail } from './introducir-email.functions';
import { PopoverController } from '@ionic/angular';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';


@Component({
  selector: 'app-introducir-email',
  templateUrl: './introducir-email.component.html',
  styleUrls: ['./introducir-email.component.scss'],
})
export class IntroducirEmailComponent  implements OnInit {

errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  returnUrl!: string;
  constructor(private router: Router,private route: ActivatedRoute,public popovercntrl: PopoverController) { }

  ngOnInit() {
    
    console.log(this.route.snapshot.queryParams);
    this.route.queryParams.subscribe(params => {
    this.returnUrl = params['returnUrl'];    
    console.log(this.returnUrl);
  })
}
  
  
  back() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      console.log('No hay una URL de retorno registrada.');
    }
  }
  async sendEmail(){
    console.log('send email')
    const email = (document.getElementById('email') as HTMLInputElement).value
    if(camposVacios(email)){this.errorMessage = 'Rellena el campo obligatoriamente';return}
    if(validarCorreoElectronico(email)){this.errorMessage = 'Introduce un correo válido';return}
    await  existsEmail(email).then(async (existeBool) =>
      {
        if(existeBool){
          try{  
            await forgotPassword(email);
            this.showPop();

          }catch{
             this.errorMessage = 'Error al enviar el correo'
          }
        }
        else this.errorMessage = 'El correo no está registrado'

      }
    )

  }
  async showPop(){
    const popover = await this.popovercntrl.create({
      component: PopinfoOneComponent,
      backdropDismiss:false,
      componentProps: {
        title: 'Recuperar contraseña',
        content: 'Te hemos enviado un correo electrónico para que puedas cambiar tu contraseña, ¡revísalo cuanto antes!'
      }
    });
    await popover.present();

    return popover.onWillDismiss().then(() => {
      console.log('Navegando a: /ruta-deseada');
      this.router.navigateByUrl('/login');
    });
  }
}
function validarCorreoElectronico(correo: string): boolean {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !expresionRegular.test(correo);
}

function camposVacios(email: string): boolean {
  return email.trim() === '';
}