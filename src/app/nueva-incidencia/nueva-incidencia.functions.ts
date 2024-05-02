import { v4 as uuidv4 } from 'uuid';
import { supabaseClient } from "../../supabase_client";
import { Photo } from '@capacitor/camera';

export async function insertInquiry(description: string, type: string, container_id: number | null, geo_shape: string | null, containerType: string, image: Photo | null = null) {
    
    try {
        let imageLink: String | null = null;
         const { data: { user }, error : errorUsuario } = await supabaseClient.auth.getUser();
         if (errorUsuario) {
             throw new Error('No se ha encontrado un usuario autenticado');
         }
        if (containerType !== null && container_id !== null) {
            containerType = conversionWasteContainers(containerType)
            containerType = containerType.split('_')[0] + '_id';
        }
        if(image) {
            imageLink = await subirImagenYGuardar(image);
        }
        const {error} = await supabaseClient
            .from('inquiries')
            .insert({ description, type, container_id, creator_id: user?.id, geo_shape, imagen_adjunta: imageLink, datos_relacion: containerType});
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

export async function subirImagenYGuardar(imagen: Photo) {
    try{
        if (imagen.webPath) {
            const response = await fetch(imagen.webPath);
            const blob = await response.blob();
            const fileName = `${uuidv4()}`;
            const file = new File([blob],fileName, { type: blob.type });
            // Sube la imagen al bucket de Supabase Storage
            const { data, error } = await supabaseClient.storage.from('inquiries_images').upload(fileName, file);
            if (error) throw error;
        
            // Obtiene la URL pública de la imagen
            const { data: publicUrlData } = supabaseClient.storage.from('inquiries_images').getPublicUrl(fileName);
        
            console.log('Imagen subida y URL guardada en inquiries:', publicUrlData.publicUrl);
            return publicUrlData.publicUrl;
        } else {
            throw new Error('La propiedad webPath de la imagen no está definida.');
        }
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error;
    }
}
  