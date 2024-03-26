import { NONE_TYPE } from "@angular/compiler";
import { supabaseClient } from "../supabase_client";

// interface ContainerInfo {
//     container_id: number
//     container_type: string,
//     location: string,
//     is_full: boolean
// }




interface ContainerInfo {
    container_id: number
    location: string,
    is_full: boolean
}

interface ContainerType {
    container_type: string,
    container_data: ContainerInfo[]
}

interface Container {
    battery: ContainerType,
    clothes: ContainerType,
    glass: ContainerType,
    oil: ContainerType,
    paper: ContainerType,
    plastic: ContainerType,
    organic: ContainerType,
    urbanWaste: ContainerType

}
//v1
// export async function searchContainers(containers: string[]): Promise<ContainerInfo[]> {
//     const containersDataList: ContainerInfo[] = [];
//     try {
//         for (const container of containers) {
//             const fieldsNeeded = container === 'waste_containers' ? 'container_type, geo_point_2d, objectid, is_full' : 'geo_point_2d, objectid, is_full';
//             const { data, error } = await supabaseClient
//                 .from(container)
//                 .select(fieldsNeeded);

//             if (error) {
//                 throw new Error(`Error al consultar el contenedor ${container}: ${error.message}`);
//             }
//             if (data) {
//                 for (const element of data) {
//                     containersDataList.push({
//                         container_type: (element as any).container_type || container,
//                         location: (element as any).geo_point_2d,
//                         container_id: (element as any).objectid,
//                         is_full: (element as any).is_full
//                     })
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error inesperado:', (error as Error).message);
//         throw error;
//     }
//     return containersDataList;
// }
//v2
// export async function searchContainers(): Promise<Container> {
//     //tipos de contenedores sobre los que se va a hacer la consulta
//     const result: any = null 
//     const containers: string [] = [
//         'battery_containers', 
//         'clothes_containers',
//         'glass_containers', 
//         'oil_containers',
//         'waste_containers', 
//     ]
//     let containersList: any = null;
//     try {
//         for (const container of containers) {
//             // estos son los campos que se van a extraer
//             const fieldsNeeded = container === 'waste_containers' ? 'geo_point_2d, objectid, is_full, container_type' : 'geo_point_2d, objectid, is_full';
//             const { data, error } = await supabaseClient
//                 .from(container)
//                 .select(fieldsNeeded);

//             if (error) {
//                 throw new Error(`Error al consultar el contenedor ${container}: ${error.message}`);
//             }
//             if (data) {
//                 //constante para guardar los datos de cada contenedor en una lista del mismo tipo
//                 let containerList: ContainerInfo[] = [];
//                 for (const element of data) {
//                     const type = (element as any).container_type || container
//                     containerList.push({
//                         location: (element as any).geo_point_2d,
//                         container_id: (element as any).objectid,
//                         is_full: (element as any).is_full
//                     })
//                 }
//                 // se guarda el tipo de contenedor y los contenedores
//                 containersList = {
//                     container_type: type,
//                     container_data: containerList
                
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error inesperado:', (error as Error).message);
//         throw error;
//     }
//     return result;
// }

export async function searchContainers(): Promise<Container> {
    //tipos de contenedores sobre los que se va a hacer la consulta
    const containers: string [] = [
        'battery_containers', 
        'clothes_containers',
        'glass_containers', 
        'oil_containers',
        'waste_containers', 
    ]
    let result: any = null;
    try {
        for (const container of containers) {
            // estos son los campos que se van a extraer
            const fieldsNeeded = container === 'waste_containers' ? 'geo_point_2d, objectid, is_full, container_type' : 'geo_point_2d, objectid, is_full';
            const { data, error } = await supabaseClient
                .from(container)
                .select(fieldsNeeded);

            if (error) {
                throw new Error(`Error al consultar el contenedor ${container}: ${error.message}`);
            }
            if (data) {
                //constante para guardar los datos de cada contenedor en una lista del mismo tipo
                let containerList: ContainerInfo[] = [];
                for (const element of data) {
                    const type = (element as any).container_type || container
                    containerList.push({
                        location: (element as any).geo_point_2d,
                        container_id: (element as any).objectid,
                        is_full: (element as any).is_full
                    })
                }
                // se guarda el tipo de contenedor y los contenedores
                // containersList = {
                //     container_type: type,
                //     container_data: containerList
                
                // }
            }
        }
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
    return result;
}

searchContainers()