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

  goToDaniIn(){
    const url = 'https://www.linkedin.com/in/daniel-ibanez-lopez/';
    Browser.open({ url: url });
  }
  goToDaniGit(){
    const url = '  https://github.com/daniivlc145 ';
    Browser.open({ url: url });
  }

  goToLauraIn(){
    const url = 'https://www.linkedin.com/in/laura-ill%C3%A1n-ferr%C3%A1ndez-66a56b210/';
    Browser.open({ url: url });
  }
  goToLauraGit(){
    const url = ' https://github.com/lyf4accs ';
    Browser.open({ url: url });
  }

  goToLatoIn(){
    const url = 'https://www.linkedin.com/in/javilato/';
    Browser.open({ url: url });
  }
  goToLatoGit(){
    const url = ' https://github.com/javilatorre ';
    Browser.open({ url: url });
  }

  goToMaxIn(){
    const url = '  https://www.linkedin.com/in/max-kaidanov-solomatin-aa5553308/';
    Browser.open({ url: url });
  }
  goToMaxGit(){
    const url = ' https://github.com/lmaximan ';
    Browser.open({ url: url });
  }
  
  goToJuliaIn(){
    const url = '  https://www.linkedin.com/in/julia-mart%C3%ADnez-requeni-a041b1259/ ';
    Browser.open({ url: url });
  }
  goToJuliaGit(){
    const url = ' https://www.github.com/Taekomr ';
    Browser.open({ url: url });
  }
  

  goToCarlosIn(){
    const url = '   ';
    Browser.open({ url: url });
  }
  goToCarlosGit(){
    const url = ' https://github.com/Cebe5 ';
    Browser.open({ url: url });
  }

}
