import { supabaseClient } from '../../supabase_client';

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
    
    // Una vez se guarda el diccionario con todos los contenedores, lo transformamos a un objeto local
    
    const data : string = JSON.stringify(result,null,2)
    try{
        localStorage.setItem("diccionario_contenedoresJSON",data) 
        console.log("Diccionario creado correctamente")
    }
    catch(error){
        console.error("Error inesperado: ", (error as Error).message)
        throw error
    }
    
    return result;

}

export async function filtrarMapa(contenedores : string[]) : Promise<{[clave: string]: ContainerInfo[]}>{
    try{
        const data: string | null =  localStorage.getItem("diccionario_contenedoresJSON");
        if (data){
            const diccionario : {[clave: string]: ContainerInfo[]} = JSON.parse(data)
            const res : {[clave:string]: ContainerInfo[]} = {}
            for(const element of contenedores){
                    console.log(element)
                    res[element] = diccionario[element]
            }
            console.log("Actualizado correctamente")
            return res;
        }
        else throw new Error("Error al cargar al filtrar")
    }
    catch(error){
        console.error("Error inesperado: ",error)
        throw error
    }
}