import { supabaseClient } from "../../supabase_client";

export async function getFullName() : Promise<string>{

    try{
        const {data : {user}, error} = await supabaseClient.auth.getUser()
        
        if (error){
            throw new Error('No se ha encontrado un usuario autenticado')
        }
        let full_name =  user?.user_metadata["full_name"]

        return full_name

    }

    catch(error){
        console.error("Error inesperado:", error)
        throw error
    }
}