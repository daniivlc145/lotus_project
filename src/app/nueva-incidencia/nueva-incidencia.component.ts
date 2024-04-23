import { Component, ElementRef, ViewChild } from '@angular/core';
import { StringComparison } from '../string-comparison/string-comparison.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';


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
  
    constructor(private stringComparison: StringComparison, private router: Router) {
      this.cargarCallesDeValencia();
    }
  
    cargarCallesDeValencia() {
      const filePath = '../assets/CdVOUT.txt';
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          const lines = data.split('\n'); // Dividir el texto en líneas
          this.calles = lines.map(line => line.trim()); // Si necesitas quitar espacios en blanco alrededor de cada línea, puedes hacerlo aquí
          
          // Verificar si las calles se cargaron correctamente
          console.log('Calles cargadas:', this.calles);
        })
        .catch(error => console.error('Error al cargar las calles de Valencia:', error));
    }    
    
    filter(): void {
      const filterValue = this.input.nativeElement.value.toLowerCase();
      
      // Verificar el valor del filtro
      console.log('Valor del filtro:', filterValue);
      
      const similarWords = StringComparison.recommendSimilarWords(filterValue, this.calles);
      
      // Verificar si las opciones filtradas se están generando correctamente
      console.log('Opciones filtradas:', similarWords);
      
      this.filteredOptions = similarWords.slice(0, 4); // Mostrar solo las 4 más similares
    }
    
    onInputChange(event: Event): void {
      const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
      // Filtrar las opciones basadas en el valor de entrada
      this.filteredOptions = this.calles.filter(calle =>
        calle.toLowerCase().includes(inputValue)
      ).slice(0, 4); // Mostrar solo las 4 primeras opciones
    }
    
    
    
    goToHomePage() {
      this.router.navigate(['/map']); // Cambia 'map' por la ruta de tu página de inicio de sesión
    }
    
  }
