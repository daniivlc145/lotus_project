import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Photo } from '@capacitor/camera'; // Importa la interfaz Photo

@Component({
  selector: 'app-photo-popover',
  templateUrl: './photo-popover.component.html',
  styleUrls: ['./photo-popover.component.scss'],
})
export class PhotoPopoverComponent implements OnInit {

  @Input() photo: Photo | undefined; // Cambia el tipo de entrada a Photo
  @Output() acceptClicked = new EventEmitter<void>();

  constructor(private popoverCntrl: PopoverController) { }

  ngOnInit() {}

  uploadPhoto() {
    this.acceptClicked.emit();
    this.popoverCntrl.dismiss({ action: 'accept' });
  }

  closePopover() {
    this.popoverCntrl.dismiss();
  }

}
