import { v4 as uuidv4 } from 'uuid';
import { supabaseClient } from "../../supabase_client";
import {conversionWasteContainers} from "../../db_functions/containers";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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

export async function seleccionarImagen() {
    const image = await Camera.getPhoto({
       quality: 80,
       allowEditing: true,
       resultType: CameraResultType.Uri,
       source: CameraSource.Prompt,
    });
    return image;
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
  