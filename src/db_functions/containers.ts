import { supabaseClient } from "../supabase_client";

interface ContainerInfo {
    container_type: string,
    location: string
}

export async function showContainersLocation(containers: string[]): Promise<ContainerInfo[]> {
    const containersDataList: ContainerInfo[] = [];
    try {
        for (const container of containers) {
            const fieldsNeeded = container === 'waste_containers' ? 'container_type, geo_point_2d' : 'geo_point_2d';
            const { data, error } = await supabaseClient
                .from(container)
                .select(fieldsNeeded);

            if (error) {
                throw new Error(`Error al consultar el contenedor ${container}: ${error.message}`);
            }
            if (data) {
                for (const element of data) {
                    containersDataList.push({
                        container_type: (element as any).container_type || container,
                        location: (element as any).geo_point_2d
                    })
                }
            }
        }
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
        throw error;
    }
    return containersDataList;
}