import { supabaseClient } from "../../supabase_client";

export async function muestraMisIncidencias(): Promise<{[clave:string]:string}[]>{
    try{
        let result : {[clave:string]:string}[] = []
        
        const {data: {user}, error: errorUsuario} = await supabaseClient.auth.getUser()
        
        if (errorUsuario) {
             throw new Error('No se ha encontrado un usuario autenticado')
         }
        // CODIGO A QUITAR
        console.log("Usuario encontrado")
        
        const {data, error} = await supabaseClient
            .from('inquiries')
            .select('created_at, description, type, geo_shape, imagen_adjunta')
            .eq('creator_id', user?.id)
            .in('type', ['reclamation', 'suggestion', 'query', 'contenedor_lleno']);

        if (error) {
            console.error('Error al obtener las incidencias:', error.message);
            throw error;
        }
        
        // Ordenar las incidencias por fecha y hora más reciente
        data.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
        });
        
        for (let elem of data){
            let [date, hour] = elem.created_at.split('T');
            let [year, month, day] = date.split('-');
            let fecha = `${day}-${month}-${year}`;
            let [hours, minutes] = hour.split(':');
            let hora = `${hours}:${minutes}`;
            elem.type = elem.type === 'reclamation' ? 'RECLAMACIÓN' 
                : elem.type === 'suggestion' ? 'PETICIÓN'
                : elem.type === 'query' ? 'CONSULTA'
                : elem.type = 'LLENO'
            result.push({
                'fecha': fecha,
                'hora': hora,
                'descripcion': elem.description,
                'type': elem.type,
                'geo_shape': elem.geo_shape,
                'link_imagen': elem.imagen_adjunta
            })
           
        }
        return result

    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
}
