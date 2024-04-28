
import { AfterViewInit, Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { PopinfoOneComponent } from '../popinfo-one/popinfo-one.component';
import { PopinfoTwoComponent } from '../popinfo-two/popinfo-two.component';
import { PopoverController } from '@ionic/angular';
import { insertInquiry } from '../nueva-incidencia/nueva-incidencia.functions';
import { MapComponent } from '../map/map.component';
import { MediatorService } from '../mediator.service';


@Component({
  selector: 'app-nueva-incidencia-map',
  templateUrl: './nueva-incidencia-map.component.html',
  styleUrls: ['./nueva-incidencia-map.component.scss'],
})
export class NuevaIncidenciaMAPComponent implements OnInit{
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;
  @ViewChild('tipo') tipoRef!: ElementRef;
  @ViewChild('descrip') descripRef!: ElementRef;
    myControl = new FormControl('');
    calles: string[] = [];
    filteredOptions: string[] = [];
    coords:string='';
  
    constructor(private stringComparison: StringComparison, private router: Router,private popoverCntrl: PopoverController, private mediatorService:MediatorService) {
      this.cargarCallesDeValencia();
      
    }

    dropdownOpen: boolean = false;
  selectedOption: string = 'CONTENEDOR LLENO';

  ngOnInit(): void {
    this.setCoordsToInput();
    console.log(this.mediatorService.markerContainerID);
  }

  setCoordsToInput(): void {
    // Obtener el valor de la variable coords del servicio Mediator
    this.coords = this.mediatorService.coords;
    // Verificar si la referencia input está definida antes de acceder a nativeElement
    if (this.input) {
      this.input.nativeElement.value = this.coords;
    }
  }
 
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
      
      this.router.navigate(['/newI']);
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
          console.log('popover ONE');
          try {
            //await this.guardarIncidencia();
            console.log('Incidencia guardada con éxito');
            const popoverone = await this.popoverCntrl.create({
              component: PopinfoOneComponent,
              backdropDismiss:false,
              componentProps: {
                title: '¡Incidencia notificada!',
                content: 'Gracias por ayudarnos a hacer un mundo más limpio y mejor'
              }
            });
            await popoverone.present();
          } catch (error) {
            console.error('Error al guardar la incidencia:', error);
          }
        }
      });
    }
    async obtenerContenidoElementos(): Promise<{ tipo: string, ubi: string, descrip: string }> {
      // Obtener el contenido de texto del elemento tipo
      const tipo = this.tipoRef.nativeElement.textContent;
    
      // Obtener el contenido de texto del elemento ubi
      const ubi = this.mapComponent.coords;
    
      // Obtener el contenido de texto del elemento descrip
      const descrip = this.descripRef.nativeElement.textContent;
    
      return { tipo, ubi, descrip };
    }
    
   /* async guardarIncidencia() {
      try {
        // Obtener los valores de tipo, ubi y descrip
        const { tipo, ubi, descrip } = await this.obtenerContenidoElementos();
    
        // Llamar a insertInquiry con los valores obtenidos
        await insertInquiry(descrip, tipo, null, ubi, "");
    
        // Muestra un mensaje o navega a otra página después de guardar la incidencia
        await this.showPop();
      } catch (error) {
        console.error('Error al guardar la incidencia:', error);
        // Maneja el error de manera adecuada
      }
      this.router.navigateByUrl('/map');
    }*/
  }

  
