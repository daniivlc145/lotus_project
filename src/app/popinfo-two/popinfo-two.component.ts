import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo-two',
  templateUrl: './popinfo-two.component.html',
  styleUrls: ['./popinfo-two.component.scss'],
})
export class PopinfoTwoComponent  implements OnInit {

  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Output() acceptClicked = new EventEmitter<void>();
  constructor(private popoverCntrl: PopoverController){}
  ngOnInit() {}

  onClickOK(){
    this.acceptClicked.emit();
    this.popoverCntrl.dismiss({action: 'accept'});
  }

  onClickCancel(){
    this.popoverCntrl.dismiss();
  }

}
