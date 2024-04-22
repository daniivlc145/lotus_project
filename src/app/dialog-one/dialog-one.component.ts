import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-one',
  templateUrl: './dialog-one.component.html',
  styleUrls: ['./dialog-one.component.scss'],
})
export class DialogOneComponent  implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogOneComponent>, @Inject(MAT_DIALOG_DATA)public data: any, private router: Router) { }

  ngOnInit() {}

  onClickOK(){
    this.dialogRef.close();
    this.router.navigate([this.data.route]); 
  }
}
