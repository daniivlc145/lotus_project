import { v4 as uuidv4 } from 'uuid';
import { supabaseClient } from "../../supabase_client";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

export async function insertInquiry(description: string, type: string, container_id: number | null, geo_shape: string | null, containerType: string) {
    try {
        const imageURL = 'https://olfjbwyuusyambowcier.supabase.co/storage/v1/object/public/inquiries_images/123456789.jpg'

         const { data: { user }, error : errorUsuario } = await supabaseClient.auth.getUser();
         if (errorUsuario) {
             throw new Error('No se ha encontrado un usuario autenticado');
         }
        if (containerType !== null && container_id !== null) {
            containerType = conversionWasteContainers(containerType)
            containerType = containerType.split('_')[0] + '_id';
        }
        // CODIGO A QUITAR
        
        const {error} = await supabaseClient
        .from('inquiries')
        .insert({ description, type, container_id, creator_id: user?.id, geo_shape, datos_relacion: containerType, imagen_adjunta: imageURL});

        if (error) {
            console.error('Error al insertar la incidencia:', error.message);
            throw error;
        }
        console.log('Incidencia insertada:');
        
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
}

export function conversionWasteContainers (containerType: string): string {
    if (containerType === 'Residuos Urbanos' || containerType === 'Organico' || containerType === 'Papel / Carton' || containerType === 'Envases Ligeros') {
        containerType = 'waste_containers'
    }
    return containerType
}

export async function modifyLevel(container_id: number, container_type: string, level: boolean): Promise<void> {
    try{
        const {error} = await supabaseClient
            .from(container_type)
            .update({is_full: level})
            .eq('objectid', container_id)
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
    
}

export async function takePicure() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      return image
}

export async function subirImagen(imagen: Photo) {
    const response = await fetch(imagen.webPath);
      const blob = await response.blob();
      const file = new File([blob], 'space-cat.png', { type: blob.type });
}

export async function subirImagenYGuardar(imagen: any) {
    try {
       // Genera un nombre de archivo único
       const fileName = `${uuidv4()}`;
   
       // Sube la imagen al bucket de Supabase Storage
       const { data, error } = await supabaseClient.storage.from('inquiries_images').upload(fileName, imagen);
       if (error) throw error;
   
       // Obtiene la URL pública de la imagen
       const { data: publicUrlData } = supabaseClient.storage.from('inquiries_images').getPublicUrl(fileName);
   
       console.log('Imagen subida y URL guardada en inquiries:', publicUrlData.publicUrl); // Accede a la URL pública correctamente
    } catch (error) {
       console.error('Error al subir la imagen:', error);
    }
}
  