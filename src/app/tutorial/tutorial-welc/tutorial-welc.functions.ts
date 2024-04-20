import { supabaseClient } from "src/supabase_client"

// Funcion para cambiar el valor de la variable is_new
export async function noTutorial() : Promise<void>{

    try{
        const {data: {user}} = await supabaseClient.auth.getUser()
        
        if(!user){
            throw new Error('No se encontró el usuario')
        }
        console.log("Usuario encontrado correctamente")
        
        const { error } = await supabaseClient
        .from('users_info')
        .update({is_new : false})
        .eq('user_id', user.id)

        if(error){
            throw new Error("Error al actualizar el valor")
        }
        
        console.log("El usuario ya no es nuevo!")
    }       
    catch(error){
        console.error("Error inesperado", (error as Error).message)
        throw error
    }
}