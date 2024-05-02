import { execSync } from 'child_process'
// CAMBIAR 
//import { searchContainers } from '../map/map.functions' 
import { supabaseClient } from '../../supabase_client'
import { getAllInquiries } from '../vista-inc-org/vista-inc-org.functions'


interface ContainerInfo {
    container_id: number
    location: string,
    is_full: boolean
}

export async function getStats() : Promise<void> {
    try{
        console.log(">> Empieza")
        searchContainers().then((data)=> {
            recogeStatsContainer(data).then((data) => 
                {
                    console.log(data)
                    // CAMBIAR
                    execSync("python3 ../app/stats/get_stats.py " + data, {encoding : 'utf-8', stdio : 'inherit'})
                }
            )
        })
        getAllInquiries().then((data)=> {
            recogeStatsStreets(data).then((data) => 
                {
                    console.log(data)
                    // CAMBIAR
                    execSync("python3 ../app/stats/get_stats.py " + data, {encoding : 'utf-8', stdio : 'inherit'})
                }
            )
        })
    }
    catch(error){
        console.error("Error inesperado al sacar los stats: ", error)
    }


}

async function recogeStatsContainer(diccionario_container : {[clave:string]:ContainerInfo[]}) : Promise<Number[]> {
    let contenedores : string[] = ["Papel / Carton", "oil_containers", "glass_containers", "clothes_containers", "Envases Ligeros",  "Organico"]
    let result : Number[] = []
    for(let contenedor of contenedores){
        let contador = 0
        for(let container_item of diccionario_container[contenedor]){
            if(container_item.is_full) contador++
        }
        result.push(contador)
    }
    return result
}

async function recogeStatsStreets(diccionario_inquiries : {[clave:string]:string}[]) : Promise<Number[]> {
    
    
    return result
}

// CAMBIAR QUITAR
async function searchContainers(): Promise<{[clave: string]: ContainerInfo[]}> {
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
    
    return result;

}