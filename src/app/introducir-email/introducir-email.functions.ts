import { supabaseClient } from "../../supabase_client"

export  async function existsEmail(email : string) : Promise<boolean> {
    try{
        const {data, error} = await supabaseClient.rpc('exists_email',{email_to_check: email})
        if(error){
            throw error
        }
        console.log("Comprobado existencia de email")
        return Boolean(data)
    }
    catch(error){
        console.error("Error inesperado: ", (error as Error).message)
        throw error
    }
}


export async function forgotPassword(email:string) : Promise<void>{
    try{
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            // Habrá que modificar invent por la ruta correcta
            redirectTo: 'http://localhost:4200/contrasenaOlv',
        })
  
        if(error){
            throw error
        }
        console.log("Correo encontrado, mensaje enviado")
    }
    catch(error){
        console.error("Error inesperado:", (error as Error).message)
        throw error
    }
  }