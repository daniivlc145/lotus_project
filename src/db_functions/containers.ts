import { supabaseClient } from "../supabase_client";
import {writeFileSync, readFileSync} from 'fs';

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
    const path : string = "../utils/diccionario_contenedores.json"
    
    const data : string = JSON.stringify(result,null,2)

    try{
        writeFileSync(path,data, {flag: "w+"})
        console.log("Diccionario creado correctamente")
    }
    catch(error){
        console.error("Error inesperado: ", (error as Error).message)
        throw error
    }
    
    return result;

}
export async function checkLevel(containerId: number, containerType: string): Promise<boolean> {
    if (containerType === 'Residuos Urbanos' || containerType === 'Organico' || containerType === 'Papel / Carton' || containerType === 'Envases Ligeros') {
        containerType = 'waste_containers'
    }

    const {data, error} = await supabaseClient
        .from(containerType)
        .select('is_full')
        .eq('objectid', containerId)

    if (error) {
        throw new Error(`Error al consultar el nivel del contenedor ${containerId}: ${error.message}`);
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

export async function filtrarMapa(contenedores : {[clave: string]: boolean}) : Promise<{[clave: string]: ContainerInfo[]}>{
    const data : string =  readFileSync("../utils/diccionario_contenedores",{encoding : "utf-8"})
    const diccionario : {[clave: string]: ContainerInfo[]} = JSON.parse(data)
    const res : {[clave:string]: ContainerInfo[]}= {}
    for(const element in contenedores){
        let value = contenedores[element]
        
        if(value){
            res[element] = diccionario[element]
        }
    }
    return res;
}