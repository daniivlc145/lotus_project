import { execSync } from 'child_process'
import { searchContainers } from '../map/map.functions' 
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
                    execSync('python3 ./get_stats.py -c [' + data + ']', {encoding : 'utf-8', stdio : 'inherit'})
                }
            )
        })
        getAllInquiries().then((data)=> {
            recogeStatsStreets(data).then(([calles, valor]) => 
                {
                    let value = "[" + valor + "] "
                    let street = '"' + calles + '"'
                    execSync("python3 ./get_stats.py -s " + value +  " st " + street, {encoding : 'utf-8', stdio : 'inherit'})
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

async function recogeStatsStreets(diccionario_inquiries : {[clave:string]:string}[]) : Promise<[string[],number[]]> {
    let diccionario_stats : {[clave:string]:number} = {}
    for(let inquirie_item of diccionario_inquiries){
        if(inquirie_item["geo_shape"] == null || inquirie_item["geo_shape"].search(/\,/g) != -1){
            continue  
        } 
        if(diccionario_stats[inquirie_item["geo_shape"]]){
            diccionario_stats[inquirie_item["geo_shape"]] = diccionario_stats[inquirie_item["geo_shape"]] + 1
        }
        else{
            diccionario_stats[inquirie_item["geo_shape"]] = 1
        }
    }

    //const sortedValues = Object.values(diccionario_stats).sort();

    // COMPLETAR
    
    // const sortedDict = {};
    // sortedValues.forEach(value => {
    // sortedDict[value] = diccionario_stats[value]
    // });
    return [Object.keys(diccionario_stats),Object.values(diccionario_stats)]

}
