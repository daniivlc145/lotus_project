import { supabaseClient } from "../supabase_client";

interface ContainerInfo {
    container_type: string,
    geo_point_2d: string
}



async function showContainersLocation(containers: string[]): Promise<ContainerInfo[]> {
    const containersData: any[] = [];
    try {
        for (const container of containers) {

            if(container == 'waste_containers') {
                const { data, error } = await supabaseClient
                .from(container)
                .select('geo_point_2d, container_type')

                if (error) {
                    console.log('No se ha podido filtrar los resultados de:', container);
                } else {
                    if (data && data.length > 0) {
                        const containerInfo: ContainerInfo = {
                            container_type: data[0].container_type,
                            geo_point_2d: data[0].geo_point_2d
                        };
                        containersData.push(containerInfo);
                    }
                }
            } else {
                const { data, error } = await supabaseClient
                .from(container)
                .select('geo_point_2d');

                if (error) {
                    console.log('No se ha podido filtrar los resultados de:', container);
                } else {
                    if (data && data.length > 0) {
                        const containerInfo = {
                            container_type: container,
                            geo_point_2d: data[0].geo_point_2d
                        };
                        containersData.push(containerInfo);
                    }
                }
            }
            
        }
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message);
    }
    return containersData;
}