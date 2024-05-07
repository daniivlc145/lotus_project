import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PoplogOutComponent } from '../poplog-out/poplog-out.component';
import { getFullName } from './profile-user.functions';

@Component({
    selector: 'app-profile-user',
    templateUrl: './profile-user.component.html',
    styleUrls: ['./profile-user.component.scss'],
    
  })
  export class profileUserComponent  implements OnInit {

    @ViewChild('nombre') nombreRef!: ElementRef<HTMLInputElement>;
  
    constructor(private router: Router,private popoverCntrl: PopoverController) { }
  
   async ngOnInit() {
      const fullName = await getFullName();
      this.nombreRef.nativeElement.textContent = fullName;
      console.log(fullName);
    }

    goToEditPage() {
      this.router.navigate(['/editarPerfil']);
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
        component: PoplogOutComponent,
        backdropDismiss:false,
        componentProps: {
          title: 'Cerrar sesión',
          content: '¿Estás seguro de que quieres cerrar sesión?'
        },
      });
      await popover.present();
      const frogSad = document.getElementById('frogSad');
      if (frogSad) { // Verifica si frogSad no es null antes de acceder a sus propiedades
        if (frogSad.style.display === 'none') {
            frogSad.style.display = 'block';
        } 
      }
  
      popover.onWillDismiss().then(async (detail) => {
        if (frogSad) {frogSad.style.display = 'none';}
        if (detail.data && detail.data.action === 'accept') {
          this.router.navigateByUrl('/login');
      } });
          
      
    }
      
  }
