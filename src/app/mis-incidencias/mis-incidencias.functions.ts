import { supabaseClient } from "../../supabase_client";

export async function muestraMisIncidencias(){
    try{
        let result = []
        // const {data: {user}} = await supabaseClient.auth.getUser()
        // if (!user) {
        //     throw new Error('No se ha encontrado un usuario autenticado')
        // }
        // CODIGO A QUITAR
        let user_id = '81ea3dda-ebf9-4a86-8a4f-7e19aaed7312'
        const {data, error} = await supabaseClient
            .from('inquiries')
            .select('created_at, description, type, geo_shape')
            .eq('creator_id', user_id)
            .in('type', ['reclamation', 'suggestion', 'query']);

        if (error) {
            console.error('Error al obtener las incidencias:', error.message);
            throw error;
        }
        for (let elem of data){
            result.push({
                'created_at': elem.created_at,
                'description': elem.description,
                'type': elem.type,
                'geo_shape': elem.geo_shape
            })
        }
        return result
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
}
