import { supabaseClient } from '../supabase_client'


// Funcion de borrar la cuenta; en confiugración
export async function deleteUserAccount (): Promise<void> {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    
    if (!user){
      console.log('No se encontró el usuario')
      throw new Error("Usuario no encontrado")
    }
    const {error} = await supabaseClient.auth.admin.deleteUser(user.id)
    if (error) {
      throw new Error('Error al eliminar usuario: ' + error.message)
    }
    console.log('Exito eliminando usuario')
  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
    throw error
  }
}
  