import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo, CameraSource, CameraOptions } from '@capacitor/camera';

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

    const options: CameraOptions = {
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      width: width,
      height: height
    };

    const image = await Camera.getPhoto(options);
    console.log("getPhoto")
    return image;
  }

  // async requestCameraPermission() {
  //   try {
  //     const permission = await Camera.requestPermissions();
  //     if(permission.camera === 'granted'){
  //       return true
  //     } else if(permission.photos === 'prompt'){
        
  //     } else{
  //       return false
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  // async checkCameraPermission() {
  //   try {
  //     const permission = await Camera.checkPermissions();
  //     if (permission.camera === 'granted') {
  //       return true;
  //     } else if (permission.camera === 'denied') {
  //       return false;
  //     } else {
  //       await this.requestCameraPermission()
  //     }
  //   } catch (error) {
  //     throw new Error('No se tiene permiso para acceder a la cámara')
  //   }
  // }
}
