import { supabaseClient } from "src/supabase_client";
import {conversionWasteContainers} from "src/db_functions/containers";

export async function insertInquiry(description: string, type: string, container_id: number | null, geo_shape: string | null, containerType: string) {
    try {
        containerType = conversionWasteContainers(containerType);
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) {
            throw new Error('No se ha encontrado un usuario autenticado');
        }

        const {error} = await supabaseClient
        .from('inquiries')
        .insert({ description, type, container_id, creator_id: user.id, geo_shape,  });

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