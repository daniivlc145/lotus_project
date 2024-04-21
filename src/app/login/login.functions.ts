import { supabaseClient } from '../../supabase_client'

export async function signInUser (email: string, password: string): Promise<void> {
    const signInInfo = {
      email,
      password
    }
    try {
      const {data, error} = await supabaseClient.auth.signInWithPassword(signInInfo)
      if (error) {
        throw new Error('Error al iniciar sesión: ' + error.message)
      }
      console.log('Exito iniciando sesión')
    } catch (error) {
      console.error('Error inesperado:', (error as Error).message)
      throw error
    }
  }

export async function forgotPassword(email:string) : Promise<void>{
  try{
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          // Habrá que modificar invent por la ruta correcta
          redirectTo: '/localhost:4200/invent',
      })

      if(error){
          throw new Error('Error al encontrar el correo')
      }
      console.log("Correo encontrado, mensaje enviado")
  }
  catch(error){
      console.error("Error inesperado:", (error as Error).message)
      throw error
  }
}