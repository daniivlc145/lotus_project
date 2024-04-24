import { supabaseClient } from "../../supabase_client";
import {conversionWasteContainers} from "../../db_functions/containers";

export async function insertInquiry(description: string, type: string, container_id: number | null, geo_shape: string | null, containerType: string) {
    try {
        // const { data: { user } } = await supabaseClient.auth.getUser();
        // if (!user) {
        //     throw new Error('No se ha encontrado un usuario autenticado');
        // }
        if (containerType !== null && container_id !== null) {
            containerType = conversionWasteContainers(containerType)
            containerType = containerType.split('_')[0] + '_id';
        }
        console.log(containerType)
        let user_id = '81ea3dda-ebf9-4a86-8a4f-7e19aaed7312'

        const {error} = await supabaseClient
        .from('inquiries')
        .insert({ description, type, container_id, creator_id: user_id, geo_shape, datos_relacion: containerType});

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