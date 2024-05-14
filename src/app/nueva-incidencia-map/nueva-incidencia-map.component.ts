
import { AfterViewInit, Component, ElementRef,Renderer2, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PopoverController } from '@ionic/angular';
import { insertInquiry, modifyLevel } from './nueva-incidencia-map.functions';
import { MapComponent } from '../map/map.component';
import { MediatorService } from '../mediator.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgZone } from '@angular/core';
import { CameraService } from 'src/services/camera.service';
import { PhotoPopoverComponent } from '../photo-popover/photo-popover.component';
import { Photo } from '@capacitor/camera';


@Component({
  selector: 'app-nueva-incidencia-map',
  templateUrl: './nueva-incidencia-map.component.html',
  styleUrls: ['./nueva-incidencia-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NuevaIncidenciaMAPComponent implements AfterViewInit{
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;
  @ViewChild('tipo') tipoRef!: ElementRef;
  @ViewChild('descrip') descripRef!: ElementRef;
  @ViewChild('reportButton') reportButtonRef !: ElementRef;
    myControl = new FormControl('');
    calles: string[] = [];
    filteredOptions: string[] = [];
    coords:string='';
    full:string='El contenedor está lleno.';
    containerID : number  = 0;
    containerType : string = "";
    photo!: Photo
  
    constructor(private stringComparison: StringComparison, private ngZone: NgZone, private router: Router, private popoverCntrl: PopoverController, private mediatorService: MediatorService, private renderer: Renderer2, private elementRef: ElementRef, private cameraService: CameraService) {
      this.cargarCallesDeValencia();
      
    }

  dropdownOpen: boolean = false;
  selectedOption: string = 'CONTENEDOR LLENO';
    
  ngAfterViewInit(): void {
    this.setCoordsToInput();
    this.setContainerID();
    this.setContainerType();
    this.descripRef.nativeElement.disabled = true;
    this.descripRef.nativeElement.value = this.full;
    this.reportButtonRef.nativeElement.disabled = false;
    this.updateButtonState();
  }

  setContainerType() : void{
    this.containerType = this.mediatorService.markerContainerType || ""
  }
  setContainerID() : void{
    this.containerID = this.mediatorService.markerContainerID || 0
  }
  setCoordsToInput(): void {
    this.ngZone.runOutsideAngular(() => {
      this.coords = this.mediatorService.coords;
      // No es necesario verificar la referencia input aquí
      this.input.nativeElement.value = this.coords;
    });
  }
 
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

 selectOption(option: string) {
    this.selectedOption = option;
    if (this.selectedOption === 'CONTENEDOR LLENO') {
      this.descripRef.nativeElement.disabled = true;
      this.descripRef.nativeElement.value = this.full;
      this.updateButtonState();      
    } else {
      this.descripRef.nativeElement.disabled = false;
      this.descripRef.nativeElement.value = '';
      console.log(this.descripRef)
      this.updateButtonState();
    }
  }
  
  updateButtonState() {
    const ubicacion = this.input.nativeElement.value;
    console.log(ubicacion);
    const descripcion = this.descripRef.nativeElement.value;
    console.log(descripcion);
    if (ubicacion.trim()!= '' && descripcion.trim()!= '') {
      this.reportButtonRef.nativeElement.disabled = false;
    } else {
      this.reportButtonRef.nativeElement.disabled = true;
    }
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
      this.updateButtonState();
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
      
      this.router.navigate(['/newI']);
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
        mode:'ios',
        backdropDismiss: false,
        componentProps: {
          title: 'Nueva incidencia',
          content: contenidoPopover
        }
      });
      setTimeout(async () => {
        await popover.present();
      }, 100);
    
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
    
    async obtenerContenidoElementos(): Promise<{ tipo: string, ubi: string, descrip: string }> {
      // Obtener el contenido de texto del elemento tipo
      var tipo = this.selectedOption;
      tipo=this.traducirTipoInquiry(tipo); // Llamada al método de traducción
      
      // Obtener el contenido de texto del elemento ubi
      const ubi = this.mediatorService.coords;
      
      // Obtener el contenido de texto del elemento descrip
      const descrip = this.descripRef.nativeElement.value;
      console.log(descrip);
      
      return { tipo, ubi, descrip };
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
        // Obtener los valores de tipo, ubi y descrip
        const { tipo, ubi, descrip } = await this.obtenerContenidoElementos();
        const photoUpload= this.photo
        console.log(descrip);
        console.log(tipo);
        console.log(ubi);
        // Llamar a insertInquiry con los valores obtenidos
        if (tipo == "contenedor_lleno"){
            console.log("Contenedor lleno con identificador: ", this.containerID)
            modifyLevel(this.containerID, this.containerType, true)
        }
        //else (Para que no se guarde en la base de datos las inquirie de Consulta Llena)
        await insertInquiry(descrip, tipo, this.containerID, ubi, this.containerType, photoUpload);
    
        const popoverone = await this.popoverCntrl.create({
          component: PopinfoOneComponent,
          backdropDismiss: false,
          mode:'ios',
          componentProps: {
            title: '¡Incidencia notificada!',
            content: 'Gracias por ayudarnos a hacer un mundo más limpio y mejor'
          }
        });
        setTimeout(async () => {
          await popoverone.present();
        }, 100);

        popoverone.onWillDismiss().then(() => {
          console.log('Navegando a: /ruta-deseada');
          this.router.navigateByUrl('/map');
        });
      } catch (error) {
        console.error('Error al guardar la incidencia:', error);
        // Maneja el error de manera adecuada
      }
    }

    async takePhotoFromCamera() {
      this.photo = await this.cameraService.takePhoto();
      const popover = await this.popoverCntrl.create({
        component: PhotoPopoverComponent,
        mode:'ios',
        componentProps: {
          photo: this.photo
        },
        translucent: true
      });
    
      // Muestra el Popover
      return await popover.present();
    }
    
  }

  
