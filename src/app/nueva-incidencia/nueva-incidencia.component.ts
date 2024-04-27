import { Component, ElementRef, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { DialogTwoComponent } from '../dialog-two/dialog-two.component';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],

})
export class NuevaIncidenciaComponent {
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;
    myControl = new FormControl('');
    calles: string[] = [];
    filteredOptions: string[] = [];
  
    constructor(private stringComparison: StringComparison, private router: Router,private popoverCntrl: PopoverController) {
      this.cargarCallesDeValencia();
    }
    
    dropdownOpen: boolean = false;
  selectedOption: string = 'CONTENEDOR LLENO';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

    cargarCallesDeValencia() {
      const filePath = '../assets/CdVOUT.txt';
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          const lines = data.split('\n'); // Dividir el texto en líneas
          this.calles = lines.map(line => line.trim()); // Si necesitas quitar espacios en blanco alrededor de cada línea, puedes hacerlo aquí
          
         
        })
        .catch(error => console.error('Error al cargar las calles de Valencia:', error));
    }    
    
    filter(): void {
      const filterValue = this.input.nativeElement.value.toLowerCase();
      

      
      const similarWords = StringComparison.recommendSimilarWords(filterValue, this.calles);
      
      
      
      this.filteredOptions = similarWords.slice(0, 4); // Mostrar solo las 4 más similares
    }
    
    

    onInputChange(event: Event): void {
      const inputValue = this.removeAccents((event.target as HTMLInputElement).value.toLowerCase());
      // Filtrar las opciones basadas en el valor de entrada
      this.filteredOptions = this.calles.filter(calle =>
        this.removeAccents(calle.toLowerCase()).includes(inputValue)
      ).slice(0, 4); // Mostrar solo las 4 primeras opciones
    }
    
    removeAccents(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    
    
    
    goToHomePage() {
      this.router.navigate(['/map']); // Cambia 'map' por la ruta de tu página de inicio de sesión
    }

    goToInfoPage() {
  
      this.router.navigate(['/info-rec']);
    }
  
    goToNuevaIncPage() {
  
      window.location.reload();
    }
  
    goToMisPage() {
  
      this.router.navigate(['/misI']);
    }
  

  
    goToProfPage(){
  
      this.router.navigate(['/profUser']);
  
    }

    async showPop(){
      const popover = await this.popoverCntrl.create({
        component: PopinfoTwoComponent,
        backdropDismiss:false,
        componentProps: {
          title: 'Nueva incidencia',
          content: '¿Desea registrar la incidencia tal en la ubicación tal?'
        }
      });
      await popover.present();
  
      popover.onWillDismiss().then(async (detail) => {
        if (detail.data && detail.data.action === 'accept') {
          console.log('popover ONE')
          const popoverone = await this.popoverCntrl.create({
            component: PopinfoOneComponent,
            backdropDismiss:false,
            componentProps: {
              title: '¡Incidencia notificada!',
              content: 'Gracias por ayudarnos a hacer un mundo más limpio y mejor'
            }
          });
          await popoverone.present();
          return popoverone.onWillDismiss().then(() => {
            console.log('Navegando a: /ruta-deseada');
            this.router.navigateByUrl('/map');
          });
        }
      });
      
    }
  }

  