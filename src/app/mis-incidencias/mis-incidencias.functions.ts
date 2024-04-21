import { supabaseClient } from "src/supabase_client";

export async function registerInquiryAboutContainer(containerId: number | null,containerType: string, description: string, type: string, location: string | null){
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
    
    }catch (error) {

    }
}
