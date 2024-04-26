import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo-one',
  templateUrl: './popinfo-one.component.html',
  styleUrls: ['./popinfo-one.component.scss'],
})
export class PopinfoOneComponent  implements OnInit {

  @Input() title: string | undefined;
  @Input() content: string | undefined;
  constructor(private popoverCntrl: PopoverController){}
  ngOnInit() {}

  onClickOK(){
    this.popoverCntrl.dismiss();
  }
}
