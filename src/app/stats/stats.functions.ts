// import { execSync } from 'child_process'
import { searchContainers } from '../map/map.functions' 
import { getAllInquiries } from '../vista-inc-org/vista-inc-org.functions'
import { supabaseClient } from 'src/supabase_client'



interface ContainerInfo {
    container_id: number
    location: string,
    is_full: boolean
}
export async function getStatsCalles() : Promise<{[clave:string]:number}> {
    try{
            return await getAllInquiries().then(async (data)=> {
                console.log("HA IDO BIEN")
                const aux = await recogeStatsStreets(data)
                console.log(aux)
                return aux
            })
            .catch(()=> {throw "Error al recuperar incidencias"})
    }
    catch(error){
        console.error("Error inesperado al sacar los stats: ", error)
        throw error
    } 
    
}
 export async function getStatsContenedores() : Promise<Number[]> {
     try{
         console.log(">> Empieza")
         return searchContainers().then(async (data)=> {
            const stats = await recogeStatsContainer(data)
            console.log(stats)
             return stats
         }).catch(() =>{throw "Error al buscar contenedores"})
     }
     catch(error){
         console.error("Error inesperado al sacar los stats: ", error)
         throw error
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

async function recogeStatsStreets(diccionario_inquiries : {[clave:string]:string}[]) : Promise<{[clave:string]:number}> {
    let diccionario_stats : {[clave:string]:number} = {}
    let calles_tot : number = 0
    for(let inquirie_item of diccionario_inquiries){
        console.log(inquirie_item["geo_shape"])
        console.log((/[a-zA-Z]/g).test(inquirie_item["geo_shape"]) )
    
        if(inquirie_item["geo_shape"] == null || !(/[a-zA-Z]/g).test(inquirie_item["geo_shape"])  ){
            continue  
        } 
        if(diccionario_stats[inquirie_item["geo_shape"]]){
            diccionario_stats[inquirie_item["geo_shape"]] = diccionario_stats[inquirie_item["geo_shape"]] + 1
            calles_tot++
        }
        else{
            diccionario_stats[inquirie_item["geo_shape"]] = 1
            calles_tot++
        }
    }
    for(let entry of Object.keys(diccionario_stats)){
            diccionario_stats[entry] = Math.round(diccionario_stats[entry] / calles_tot * 100)
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