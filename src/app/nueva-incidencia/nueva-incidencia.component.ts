import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StringComparison } from '../string-comparison/string-comparison';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'; // Importa el AutocompleteComponent

@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.component.html',
  styleUrls: ['./nueva-incidencia.component.scss'],
})
export class NuevaIncidenciaComponent {
    @ViewChild('input') input!: ElementRef<HTMLInputElement>;
    @ViewChild(AutocompleteComponent) autocompleteComponent!: AutocompleteComponent; // ViewChild para AutocompleteComponent
    myControl = new FormControl('');
    calles: string[] = [];
    filteredOptions: string[] = [];
  
    constructor(private stringComparison: StringComparison) {
      this.cargarCallesDeValencia();
    }
  
    cargarCallesDeValencia() {
      const filePath = '../utils/CdVOUT.txt';
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          const lines = data.split('\n').filter(line => line.trim() !== '');
          this.calles = lines.map(line => line.trim());
        })
        .catch(error => console.error('Error al cargar las calles de Valencia:', error));
    }    
    
    filter(): void {
      const filterValue = this.input.nativeElement.value.toLowerCase();
      const similarWords = StringComparison.recommendSimilarWords(filterValue, this.calles);
      this.filteredOptions = similarWords.slice(0, 4); // Mostrar solo las 4 más similares
    }    
    
    
  }
