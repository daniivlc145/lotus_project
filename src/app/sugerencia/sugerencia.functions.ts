import { supabaseClient } from "src/supabase_client";


export async function getMail() : Promise<String> {
    
    try{
        const {data: {user}, error: errorUsuario} = await supabaseClient.auth.getUser()
        if (errorUsuario) throw "Error al encontrar el usuario"

        const {data, error} = await supabaseClient
            .from('users_info')
            .select('email')
            .eq('user_id',user?.id )
        if(error) throw ("Error al encontrar el email")
        return data[0].email
    }
    catch(error){
        console.error("Error inesperado: ", error)
        throw error
    }
}