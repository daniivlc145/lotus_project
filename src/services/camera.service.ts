import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo, CameraSource } from '@capacitor/camera';
import {} from '@capacitor/app';



@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }
  async takePhoto(): Promise<Photo> {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,

      });
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
