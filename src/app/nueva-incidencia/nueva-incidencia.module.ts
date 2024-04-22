import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevaIncidenciaComponent } from './nueva-incidencia.component';   
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    NuevaIncidenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Importa FormsModule
    ReactiveFormsModule, // Importa ReactiveFormsModule
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class NuevaIncidenciaModule { }
