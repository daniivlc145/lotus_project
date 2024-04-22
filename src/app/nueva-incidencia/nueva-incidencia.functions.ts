import { supabaseClient } from "src/supabase_client";

/*export async function registerInquiry(containerId: number | null,containerType: string, description: string, type: string, location: string | null){
    try{
        if (containerType === 'Residuos Urbanos' || containerType === 'Organico' || containerType === 'Papel / Carton' || containerType === 'Envases Ligeros') {
            containerType = 'waste_containers'
        }

        const {data: {user}} = await supabaseClient.auth.getUser()
        if (!user) {
            throw new Error('No se ha encontrado un usuario autenticado')
        }

        const {data, error} = await supabaseClient
            .from('inquiries')
            .insert({description, type, container_id: containerId, creator_id: user.id, geo_shape: location})
        if (error) {
            console.error('Error al insertar la incidencia:', error.message);
            throw error;
        }
        if(containerId !== null && data !== null){
            switch (containerType){
                case 'battery_containers':
                    const {error: batteryError} = await supabaseClient
                        .from('relaciones_inquiries_container')
                        .insert({inquiry_id: data[0].id, battery_id: containerId})
                    break;
                case 'clothes_containers':
                    const {error: clothesError} = await supabaseClient
                        .from('relaciones_inquiries_container')
                        .insert({inquiry_id: data[0].id, clothes_id: containerId})
                    break;
                case 'glass_containers':
                    const {error: glassError} = await supabaseClient
                        .from('relaciones_inquiries_container')
                        .insert({inquiry_id: data[0].id, glass_id: containerId})
                    break;
                case 'oil_containers':
                    const {error: oilError} = await supabaseClient
                        .from('relaciones_inquiries_container')
                        .insert({inquiry_id: data[0].id, oil_id: containerId})
                    break;
                case 'waste_containers':
                    const {error: wasteError} = await supabaseClient
                        .from('relaciones_inquiries_container')
                        .insert({inquiry_id: data[0].id, waste_id: containerId})
                    break;
            }
        }
    }catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
}*/