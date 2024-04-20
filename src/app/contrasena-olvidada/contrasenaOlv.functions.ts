import { supabaseClient } from '../../supabase_client'

export async function updatePassword(password:string) : Promise<void>{
    try {
        const { data, error } = await supabaseClient.auth.updateUser({
            password
        })
        
        if(error){
            throw new Error("Error al actualizar la contraseña")
        }
        console.log("Contraseña actualizada correctamente")
    }
    catch(error){
        console.log("Error al actualizar contraseña")
        throw error
    }
}