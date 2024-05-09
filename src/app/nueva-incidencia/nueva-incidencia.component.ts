import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PopoverController } from '@ionic/angular';
import { insertInquiry } from './nueva-incidencia.functions';
import { CameraService } from 'src/services/camera.service';
import { PhotoPopoverComponent } from '../photo-popover/photo-popover.component';
import { Photo } from '@capacitor/camera';


@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],

})
export class NuevaIncidenciaComponent{
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;
  @ViewChild('tipo') tipoRef!: ElementRef;
  @ViewChild('descrip') descripRef!: ElementRef;
    myControl = new FormControl('');
    calles: string[] = [];
    filteredOptions: string[] = [];
    photo!: Photo
    
  
    constructor(private stringComparison: StringComparison, private router: Router,private popoverCntrl: PopoverController, private cameraService: CameraService) {
      this.cargarCallesDeValencia();
    }
    
    dropdownOpen: boolean = false;
  selectedOption: string = 'RECLAMACIÓN/INFORME';

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

    async showPop() {
      const calleSeleccionada = this.input.nativeElement.value;
      const tipoIncidencia = this.selectedOption;
      const contenidoPopover = `¿Desea registrar la incidencia en ${calleSeleccionada} como ${tipoIncidencia}?`;
      const popover = await this.popoverCntrl.create({
      
        component: PopinfoTwoComponent,
        backdropDismiss: false,
        componentProps: {
          title: 'Nueva incidencia',
          content: contenidoPopover
        }
      });
      await popover.present();
    
      popover.onWillDismiss().then(async (detail) => {
        if (detail.data && detail.data.action === 'accept') {
          console.log('popover ONE');
          try {
            await this.guardarIncidencia();
          } catch (error) {
            console.error('Error al guardar la incidencia:', error);
          }
        }
      });
    }

    async obtenerContenidoElementos(): Promise<{ tipo: string, descrip: string }> {
      // Obtener el contenido de texto del elemento tipo
      var tipo = this.selectedOption;
      tipo=this.traducirTipoInquiry(tipo); // Llamada al método de traducción
      
  
      // Obtener el contenido de texto del elemento descrip
      const descrip = this.descripRef.nativeElement.value;
      console.log(descrip);
      
      return { tipo, descrip };
    }
    
    // Método para traducir tipos de inquiry
    private traducirTipoInquiry(tipo: string): string {
      switch (tipo.toUpperCase()) {
        case 'CONTENEDOR LLENO':
          return 'contenedor_lleno';
        case 'CONSULTA':
          return 'query';
        case 'RECLAMACIÓN/INFORME':
          return 'reclamation';
        case 'PETICIÓN':
          return 'suggestion';
        default:
          return tipo; 
      }
    }
    
    async guardarIncidencia() {
      try {
        // Obtener el valor de ubi
        const ubi = this.input.nativeElement.value;
    
        // Obtener los valores de tipo, descrip
        const { tipo, descrip } = await this.obtenerContenidoElementos();
    
        // Llamar a insertInquiry con los valores obtenidos
        await insertInquiry(descrip, tipo, null, ubi, "");
        console.log(descrip);
        console.log(tipo);
        console.log(ubi);
    
        const popoverone = await this.popoverCntrl.create({
          component: PopinfoOneComponent,
          backdropDismiss: false,
          componentProps: {
            title: '¡Incidencia notificada!',
            content: 'Gracias por ayudarnos a hacer un mundo más limpio y mejor'
          }
        });
        await popoverone.present();
    
        popoverone.onWillDismiss().then(() => {
          console.log('Navegando a: /ruta-deseada');
          this.router.navigateByUrl('/map');
        });
      } catch (error) {
        console.error('Error al guardar la incidencia:', error);
        // Maneja el error de manera adecuada
      }
      this.router.navigateByUrl('/map');
    }

    async takePhotoFromCamera() {
      this.photo = await this.cameraService.takePhoto();
      const popover = await this.popoverCntrl.create({
        component: PhotoPopoverComponent,
        componentProps: {
          photo: this.photo
        },
        translucent: true
      });
    
      // Muestra el Popover
      return await popover.present();
    }
    
    
    
  }

  