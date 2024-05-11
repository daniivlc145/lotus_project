import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent  implements OnInit {

  isFlipped: boolean = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
  returnUrl!: string;
  back() {
  if (this.returnUrl) {
    this.router.navigateByUrl(this.returnUrl);
  } else {
    console.log('No hay una URL de retorno registrada.');
  }
}
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.route.queryParams.subscribe(params => {
    this.returnUrl = params['returnUrl'];    
    console.log(this.returnUrl);
  })
  }

  goToDani(){
    const url = 'https://www.linkedin.com/in/daniel-ibanez-lopez/';
    Browser.open({ url: url });
  }

  goToLaura(){
    const url = 'https://www.linkedin.com/in/laura-ill%C3%A1n-ferr%C3%A1ndez-66a56b210/';
    Browser.open({ url: url });
  }

  goToLato(){
    const url = 'https://www.linkedin.com/in/javilato/';
    Browser.open({ url: url });
  }
  

}
