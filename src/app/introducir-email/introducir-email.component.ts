import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-introducir-email',
  templateUrl: './introducir-email.component.html',
  styleUrls: ['./introducir-email.component.scss'],
})
export class IntroducirEmailComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
