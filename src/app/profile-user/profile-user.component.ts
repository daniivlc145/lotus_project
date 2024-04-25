import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-user',
    templateUrl: './profile-user.component.html',
    styleUrls: ['./profile-user.component.scss'],
    
  })
  export class profileUserComponent  implements OnInit {
  
    constructor(private router: Router) { }
  
    ngOnInit() {
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

         
    goToAbtPage(){

      this.router.navigate(['/abt']);
    }
  


    
      
  }