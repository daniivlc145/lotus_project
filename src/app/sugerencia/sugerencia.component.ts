import { Component, OnInit } from '@angular/core';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../email.service';
import { getMail } from './sugerencia.functions';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.scss'],
})
export class SugerenciaComponent  implements OnInit {

  returnUrl!: string;
  back() {
    if (this.returnUrl) {
      this.router.navigate([this.returnUrl]);
    } else {
      console.log('No hay una URL de retorno registrada.');
    }
  }

  emailContent: string = '';

  async sendEmail(emailContent: string) {
    const subject = 'Correo desde mi aplicación';
    const body = emailContent;
    const email = await getMail();
    this.showPop();
    const correo = {
        
      from: email,
      to: ['lotuscodeproj@gmail.com'],
        subject: subject,
        body: body

    };

    this.emailService.enviarCorreo(correo).subscribe(
        response => console.log(response),
        error => console.error(error)
    );
}



  constructor(private router: Router, private popovercntrl: PopoverController, private route: ActivatedRoute, private http: HttpClient, private emailService: EmailService) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.route.queryParams.subscribe(params => {
    this.returnUrl = params['returnUrl'];    
    console.log(this.returnUrl);
    })
  }


  async showPop(){
    const popover = await this.popovercntrl.create({
      component: PopinfoOneComponent,
      mode:'ios',
      backdropDismiss:false,
      componentProps: {
        title: '¡Sugerencia enviada!',
        content: 'Hemos recibido tu sugerencia. Nos pondremos con ella lo antes posible. ¡Gracias!'
      }
    });
    setTimeout(async () => {
      await popover.present();
    }, 100);

    return popover.onWillDismiss().then(() => {
      console.log('Navegando a: /ruta-deseada');
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
