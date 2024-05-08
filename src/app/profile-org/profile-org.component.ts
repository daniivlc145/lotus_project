import { Component,  OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getFullName } from './profile-org.functions';
import { PoplogOutComponent } from '../poplog-out/poplog-out.component';
import { PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-profile-org',
    templateUrl: './profile-org.component.html',
    styleUrls: ['./profile-org.component.scss'],
    
  })
  export class profileOrgComponent  implements OnInit {


    @ViewChild('nombre') nombreRef!: ElementRef<HTMLInputElement>;
    constructor(private router: Router, private popovercntrl :PopoverController) { }
  
    async ngOnInit() {
      const fullName = await getFullName();
      this.nombreRef.nativeElement.textContent = fullName;
      console.log(fullName);
    }
    
      goToMapPage() {
    
        this.router.navigate(['/mapCalor']);
        
      }
      
      goToAbtPage(){

        const currentUrl = this.router.url; 
        console.log(currentUrl)// Obtén la URL actual
        this.router.navigate(['/abt'], { queryParams: { returnUrl: currentUrl } });
      }

      goToSugPage(){

        const currentUrl = this.router.url; 
        console.log(currentUrl)// Obtén la URL actual
        this.router.navigate(['/sug'], { queryParams: { returnUrl: currentUrl } });
      }

      goToIncPage(){

        this.router.navigate(['/incOrg']);

      }
     
      
      goToProfPage(){
      
        this.router.navigate(['/profOrg']);
      
      }
      
      goToStatsPage(){
        this.router.navigate(['/stats']);
      }
      
      goToEditPage() {
        const currentUrl = this.router.url; 
        console.log(currentUrl)// Obtén la URL actual
        this.router.navigate(['/editarPerfil'], { queryParams: { returnUrl: currentUrl } });
        }
      
        async logOut(){
          const popover = await this.popovercntrl.create({
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