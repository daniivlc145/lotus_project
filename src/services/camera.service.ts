import { Injectable } from '@angular/core';
import { Camera, CameraResultType, Photo, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }
  async takePicureFromCamera(): Promise<Photo> {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,

      });
      return image;
  }
  async takePicureFromAlbum(): Promise<Photo> {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,

      });
      return image;
  }
}
