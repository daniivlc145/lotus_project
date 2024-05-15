import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PopoverController } from '@ionic/angular';
import { updateUserData } from './editar-perfil.functions';
import { getFullName } from '../profile-user/profile-user.functions';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
})
export class EditarPerfilComponent  implements OnInit {
@ViewChild('nombre') nombreRef!: ElementRef<HTMLInputElement>;
returnUrl!: string;
nametext ="NOMBRE COMPLETO";
photofrog ="../../assets/img/frogUser.png";
back() {
  if (this.returnUrl) {
    this.router.navigateByUrl(this.returnUrl);
  } else {
    console.log('No hay una URL de retorno registrada.');
  }
}
changePassword() {
  const currentUrl = this.router.url; 
  console.log(currentUrl)// Obtén la URL actual
  this.router.navigate(['/email'], { queryParams: { returnUrl: currentUrl } });
}

  errorMessage: string | null = null; // Esta es la propiedad que mencionaste
  constructor(private router: Router,private popoverCntrl: PopoverController,private route: ActivatedRoute) {}
  fullname = "";
  numero = "";

  async ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    this.route.queryParams.subscribe(params => {
    this.returnUrl = params['returnUrl'];    
    console.log(this.returnUrl);
  })
 console.log(this.nametext)
 const nameUser = await getFullName();
 this.nombreRef.nativeElement.textContent = nameUser;
}

goToProfPage(){
  this.router.navigate(['/profUser']);
}

  

  isSecondTextboxActive = true;

  
  saveChanges(){
    console.log('guardar')
    try {
      if (areAllTextBoxesEmpty(this.fullname,this.numero)) {throw new Error('Rellena al menos un campo'); }
      if(this.numero.trim() !== ""){
        if (validarTelefono(this.numero)) {throw new Error('Escribe solo 9 dígitos en el teléfono');}
      }
      if(this.fullname.trim() !== ""){
        if (validarnombrecompleto(this.fullname)) {throw new Error('Escribe un nombre sin digitos y sin más de 50 caracteres.');}
      }
      this.showPop();
      
    }catch(error){
      console.error('ERROR CAPTURADO:', (error as Error).message)
      this.errorMessage = (error as Error).message; // Actualiza el mensaje de error
  }
  
  }
  
  async showPop() {
    const popover = await this.popoverCntrl.create({
      component: PopinfoTwoComponent,
      mode:'ios',
      backdropDismiss: false,
      componentProps: {
        title: 'Guardar cambios',
        content: '¿Desea guardar los cambios realizados?'
      }
    });
    setTimeout(async () => {
      await popover.present();
    }, 100);
  
    popover.onWillDismiss().then(async (detail) => {
      if (detail.data && detail.data.action === 'accept') {
        try {
          await updateUserData(this.fullname,this.numero);
          this.goToProfPage()

        } catch (error) {
          console.error('Error al cambiar la info', error);
        }
      }
    });
  }


}
function validarnombrecompleto(texto: string): boolean {
  const contieneDigitos = /\d/.test(texto);
  const masDe100Caracteres = texto.length > 50;
  return contieneDigitos || masDe100Caracteres;
}

function validarTelefono(texto: string): boolean {
  const soloDigitos = /^\d+$/.test(texto);
  const masDe9Caracteres = texto.length != 9
  return !soloDigitos || masDe9Caracteres;
}



function areAllTextBoxesEmpty(email:string, number: string): boolean {
  console.log('campos vacíos')
  return email.trim() ==="" &&
         number.trim() === "" 
}




