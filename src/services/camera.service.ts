import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async takePhoto(): Promise<Photo> {
    // Establecer el ratio de 16:9 para la foto
    const ratio = 16 / 9;
    const width = 800; // Anchura predeterminada
    const height = Math.round(width / ratio); // Calcular la altura según el ratio

    const options = {
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      width: width,
      height: height
    };

    const image = await Camera.getPhoto(options);
    return image;
  }
}
