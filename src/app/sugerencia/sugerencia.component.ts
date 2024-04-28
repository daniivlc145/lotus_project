import { Component, OnInit } from '@angular/core';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sugerencia',
  templateUrl: './sugerencia.component.html',
  styleUrls: ['./sugerencia.component.scss'],
})
export class SugerenciaComponent  implements OnInit {

  constructor(private router: Router, private popovercntrl: PopoverController) { }

  ngOnInit() {}


  async showPop(){
    const popover = await this.popovercntrl.create({
      component: PopinfoOneComponent,
      backdropDismiss:false,
      componentProps: {
        title: '¡Sugerencia enviada!',
        content: 'Hemos recibido tu sugerencia. Nos pondremos con ella lo antes posible. ¡Gracias!'
      }
    });
    await popover.present();

    return popover.onWillDismiss().then(() => {
      console.log('Navegando a: /ruta-deseada');
      this.router.navigateByUrl('/profUser');
    });
  }
}
