import { supabaseClient } from "src/supabase_client";

export async function getFullContainers() : Promise<number[][]> {
    try{
        let result: number[][] = []
        const containers: string [] = [
            'battery_containers', 
            'clothes_containers',
            'glass_containers', 
            'oil_containers',
            'waste_containers', 
        ]
        for (const containerTypeSearch of containers) {
            const fieldsNeeded = containerTypeSearch === 'waste_containers' ? 'geo_point_2d, objectid, is_full, container_type' : 'geo_point_2d, objectid, is_full';
            const { data, error } = await supabaseClient
                .from(containerTypeSearch)
                .select(fieldsNeeded)
                .eq("is_full",true)
                

            if (error) {
                console.log("JEJE GOD")
                throw new Error(`Error al consultar el contenedor ${containerTypeSearch}: ${error.message}`);
            }
            if (data) {
                for (const element of data) {
                    let aux : string[] = ((element as any).geo_point_2d).split(",").push("0.5")
                    let location = aux.map((data)=> Number(data))
                    console.log("Ubicacion: " , location)
                    result.push(location)
                }
            }
        }
        return result
    }
    catch(error){
        console.error("Error inesperado: ", error)
        throw error
    }
}