import { supabaseClient } from "../../supabase_client";

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
            
            const { data, error } = await supabaseClient
                .from(containerTypeSearch)
                .select("geo_point_2d")
                .eq("is_full","true")

            if (error) {
                throw new Error(`Error al consultar el contenedor ${containerTypeSearch}: ${error.message}`);
            }
            if (data) {
                for (const element of data) {
                    console.log((element as any).geo_point_2d.split(","))
                    let aux : string[] = (element as any).geo_point_2d.split(",")
                    aux.push("0.5")
                    let location : number[] = aux.map((data)=> Number(data))
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