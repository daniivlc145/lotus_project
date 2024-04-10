// info-rec.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRecComponent } from './info-rec.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    InfoRecComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InfoRecModule { }
