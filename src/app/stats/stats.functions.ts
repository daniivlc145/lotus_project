// import { execSync } from 'child_process'
import { searchContainers } from '../map/map.functions' 
import { getAllInquiries } from '../vista-inc-org/vista-inc-org.functions'
import { supabaseClient } from 'src/supabase_client'



interface ContainerInfo {
    container_id: number
    location: string,
    is_full: boolean
}
export async function getStatsCalles() : Promise<{[clave:string]:string}> {
    try{
            getAllInquiries().then((data)=> {
                return recogeStatsStreets(data)
            })
            throw "Error al recuperar incidencias"
    }
    catch(error){
        console.error("Error inesperado al sacar los stats: ", error)
        throw error
    } 
    
}
// export async function getStats() : Promise<void> {
//     try{
//         console.log(">> Empieza")
//         searchContainers().then((data)=> {
//             recogeStatsContainer(data).then((data) => 
//                 {
//                     execSync('python3 ./get_stats.py -c [' + data + ']', {encoding : 'utf-8', stdio : 'inherit'})
//                 }
//             )
//         })
//         getAllInquiries().then((data)=> {
//             recogeStatsStreets(data).then(([calles, valor]) => 
//                 {
//                     let value = "[" + valor + "] "
//                     let street = '"' + calles + '"'
//                     execSync("python3 ./get_stats.py -s " + value +  " st " + street, {encoding : 'utf-8', stdio : 'inherit'})
//                 }
//             )
//         })
//     }
//     catch(error){
//         console.error("Error inesperado al sacar los stats: ", error)
//     }


// }

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

async function recogeStatsStreets(diccionario_inquiries : {[clave:string]:string}[]) : Promise<{[clave:string]:Number}> {
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
    return diccionario_stats

}

export async function getFullContainerStat() : Promise<Number> {
    try{
        const {data, error, count} = await supabaseClient
        .from('inquiries')
        .select('*', { count : 'exact', head : true})
        .eq('type', 'contenedor_lleno')

        if(error) throw "Error al recuperar stats de Contenedores llenos"         
        
        return count || 0

    }
    catch(error) {
        console.error("Error inesperado: ", error)
        throw error
    }
        
}

export async function getReclamationStat() : Promise<Number> {
    try{
        const {data, error, count} = await supabaseClient
        .from('inquiries')
        .select('*', { count : 'exact', head : true})
        .eq('type', 'reclamation')

        if(error) throw "Error al recuperar stats de Contenedores llenos"         
        
        return count || 0

    }
    catch(error) {
        console.error("Error inesperado: ", error)
        throw error
    }

}

export async function getSuggestionStat() : Promise<Number> {
    try{
        const {data, error, count} = await supabaseClient
        .from('inquiries')
        .select('*', { count : 'exact', head : true})
        .eq('type', 'suggestion')

        if(error) throw "Error al recuperar stats de Contenedores llenos"         
        
        return count || 0

    }
    catch(error) {
        console.error("Error inesperado: ", error)
        throw error
    }

}

export async function getQueryStat() : Promise<Number> {
    try{
        const {data, error, count} = await supabaseClient
        .from('inquiries')
        .select('*', { count : 'exact', head : true})
        .eq('type', 'query')

        if(error) throw "Error al recuperar stats de Contenedores llenos"         
        
        return count || 0

    }
    catch(error) {
        console.error("Error inesperado: ", error)
        throw error
    }

}