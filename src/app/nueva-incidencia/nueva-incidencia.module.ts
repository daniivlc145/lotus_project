import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NuevaIncidenciaComponent } from './nueva-incidencia.component';   

@NgModule({
  declarations: [
    NuevaIncidenciaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Importa FormsModule
    ReactiveFormsModule, // Importa ReactiveFormsModule
  ],
})
export class NuevaIncidenciaModule { }
