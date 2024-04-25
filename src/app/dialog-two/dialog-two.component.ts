import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-two',
  templateUrl: './dialog-two.component.html',
  styleUrls: ['./dialog-two.component.scss'],
})
export class DialogTwoComponent  implements OnInit {


  constructor(public dialogRef: MatDialogRef<DialogTwoComponent>, @Inject(MAT_DIALOG_DATA)public data: any, private router: Router) { }

  ngOnInit() {}

  onClickOK(){
    this.dialogRef.close(true);
    this.router.navigate([this.data.route]); 
  }

  onClickCancel() {
    this.dialogRef.close(false);
    }
}
