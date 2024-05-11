import { supabaseClient } from "src/supabase_client";


export async function getMail() : Promise<String> {
    
    try{
        const id = supabaseClient.auth.getUser()
        const {data, error} = await supabaseClient
            .from("public.users_info")
            .select("email")
            .eq("user_id",id )
    
        if (error) throw "Error al encontrar el usuario"
        return String(data)
    }
    catch(error){
        console.error("Error inesperado: ", error)
        throw error
    }
}