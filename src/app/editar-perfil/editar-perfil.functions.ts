import { supabaseClient } from '../../supabase_client'

// Funcion de actualizar datos; en configuracion
export async function updateUserData (fullName: string, phoneNumber: string): Promise<void> {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    
    if(fullName == "" && phoneNumber == "") return
    
    if (!user){
      console.log('No se encontró el usuario')
      throw new Error("Usuario no encontrado")
    }
    
    let information ;
    
    if (fullName == ""){
        information = {
            phone_number: phoneNumber
        }
    }
    else if (phoneNumber == ""){
        information = {
            full_name : fullName
        }
    }
    else {
        information = {
                full_name : fullName,
                phone_number: phoneNumber
            }
        
    }   
    const { data, error } = await supabaseClient.auth.updateUser({
      data: information
    })

    if(error){
      console.error(error)
      throw new Error("Error al actualizar datos de auth")
    }

  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
    throw error
  }
}