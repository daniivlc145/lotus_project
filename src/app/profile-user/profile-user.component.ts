import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';

@Component({
    selector: 'app-profile-user',
    templateUrl: './profile-user.component.html',
    styleUrls: ['./profile-user.component.scss'],
    
  })
  export class profileUserComponent  implements OnInit {

  
    constructor(private router: Router,private popoverCntrl: PopoverController) { }
  
    ngOnInit() {
    }


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
  
    async logOut(){
      const popover = await this.popoverCntrl.create({
        component: PopinfoTwoComponent,
        backdropDismiss:false,
        componentProps: {
          title: 'Cerrar sesión',
          content: '¿Estás seguro de que quieres cerrar sesión?'
        }
      });
      await popover.present();
  
      popover.onWillDismiss().then(async (detail) => {
        if (detail.data && detail.data.action === 'accept') {
          this.router.navigateByUrl('/login');
      } });
          
      
    }
      
  }
