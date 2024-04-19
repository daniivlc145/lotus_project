import { supabaseClient } from "../supabase_client";

interface ContainerInfo {
    container_id: number
    location: string,
    is_full: boolean
}

export async function searchContainers(): Promise<{[clave: string]: ContainerInfo[]}> {
    //tipos de contenedores sobre los que se va a hacer la consulta
    const containers: string [] = [
        'battery_containers', 
        'clothes_containers',
        'glass_containers', 
        'oil_containers',
        'waste_containers', 
    ]
    let result: {[clave: string]: ContainerInfo[]} = {}
    try {
        for (const containerTypeSearch of containers) {
            const fieldsNeeded = containerTypeSearch === 'waste_containers' ? 'geo_point_2d, objectid, is_full, container_type' : 'geo_point_2d, objectid, is_full';
            const { data, error } = await supabaseClient
                .from(containerTypeSearch)
                .select(fieldsNeeded);

            if (error) {
                throw new Error(`Error al consultar el contenedor ${containerTypeSearch}: ${error.message}`);
            }
            if (data) {
                for (const element of data) {
                    let type = (element as any).container_type || containerTypeSearch
                    let container: ContainerInfo = {
                        container_id: (element as any).objectid,
                        location: (element as any).geo_point_2d,
                        is_full: (element as any).is_full
                    }
                    if (!result[type]) {
                        result[type] = [container]
                    } else {
                        result[type].push(container)
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
    return result;
}
export async function checkLevel(container_id: number, container_type: string): Promise<boolean> {
    if (container_type === 'Residuos Urbanos' || container_type === 'Organico' || container_type === 'Papel / Carton' || container_type === 'Envases Ligeros') {
        container_type = 'waste_containers'
    }

    const {data, error} = await supabaseClient
        .from(container_type)
        .select('is_full')
        .eq('objectid', container_id)

    if (error) {
        throw new Error(`Error al consultar el nivel del contenedor ${container_id}: ${error.message}`);
    }

    return (data as any[])[0].is_full

}
export async function modifyLevel(container_id: number, container_type: string, level: boolean): Promise<void> {
    if (container_type === 'Residuos Urbanos' || container_type === 'Organico' || container_type === 'Papel / Carton' || container_type === 'Envases Ligeros') {
        container_type = 'waste_containers'
    }
    try{
        let current_level = await checkLevel(container_id, container_type)
        if (level === current_level) {
            return
        }

        const {error} = await supabaseClient
            .from(container_type)
            .update({is_full: level})
            .eq('objectid', container_id)
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
    
}