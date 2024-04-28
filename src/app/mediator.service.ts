import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {
  coords: string = '';
  markerContainerID: number | null = null;
  markerContainerType : string | null = null; 

  constructor() { }
}
