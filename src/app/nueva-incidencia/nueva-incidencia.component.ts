import { Component, ElementRef, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { DialogTwoComponent } from '../dialog-two/dialog-two.component';
import { DialogOneComponent } from '../dialog-one/dialog-one.component';


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
  
    constructor(private stringComparison: StringComparison, private router: Router,public dialog: MatDialog) {
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

    openDialog():void{
      console.log('abre')
      const dialogRef = this.dialog.open(DialogTwoComponent, {
        data:{
          title:'Registrar incidencia',
          content:'¿Deseas notificar el problema seleccionado?',
          route: '/newl'
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) { // Si se seleccionó "OK" en DialogTwoComponent
          await this.router.navigate(['/newI']);
          this.openDialogFeed(); // Abre DialogOneComponent
          
        }
        
      });
        
    }
    openDialogFeed():void{
      console.log('abre')
      const dialog = this.dialog.open(DialogOneComponent, {
        data:{
          title:'Reporte enviado',
          content:'Hemos recibido tu reporte correctamente! Gracias por hacer un mundo más limpio.',
          route: '/map'
        }
      })
    }
  }

  