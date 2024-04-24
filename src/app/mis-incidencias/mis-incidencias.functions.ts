import { supabaseClient } from "../../supabase_client";

export async function muestraMisIncidencias(): Promise<{[clave:string]:string}[]>{
    try{
        let result : {[clave:string]:string}[] = []
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
            let [date, hour] = elem.created_at.split('T');
            let [year, month, day] = date.split('-');
            let fecha = `${day}-${month}-${year}`;
            let [hours, minutes] = hour.split(':');
            let hora = `${hours}:${minutes}`;
            elem.type = elem.type === 'reclamation' ? 'RECLAMACIÓN/INFORME' 
                : elem.type === 'suggestion' ? 'PETICIÓN' 
                : 'CONSULTA'
            result.push({
                'fecha': fecha,
                'hora': hora,
                'descripcion': elem.description,
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