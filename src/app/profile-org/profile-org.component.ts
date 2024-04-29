import { Component,  OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getFullName } from './profile-org.functions';

@Component({
    selector: 'app-profile-org',
    templateUrl: './profile-org.component.html',
    styleUrls: ['./profile-org.component.scss'],
    
  })
  export class profileOrgComponent  implements OnInit {
    @ViewChild('nombre') nombreRef!: ElementRef<HTMLInputElement>;
    constructor(private router: Router) { }
  
    async ngOnInit() {
      const fullName = await getFullName();
      this.nombreRef.nativeElement.textContent = fullName;
      console.log(fullName);
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