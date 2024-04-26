import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-org',
    templateUrl: './profile-org.component.html',
    styleUrls: ['./profile-org.component.scss'],
    
  })
  export class profileOrgComponent  implements OnInit {
  
    constructor(private router: Router) { }
  
    ngOnInit() {
    }


    
    
      goToMapPage() {
    
        this.router.navigate(['/mapCalor']);
        
      }
      
      goToAbtPage(){

        this.router.navigate(['/abt']);
      }

      goToSugPage(){

        this.router.navigate(['/sug']);

      }
    
      
  }