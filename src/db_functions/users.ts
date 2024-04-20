import { supabaseClient } from '../supabase_client'

// Funcion de registro; en registro
export async function signUpUser (email: string, password: string, fullName: string, phoneNumber: string): Promise<void> {
  const userData = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber
      }
    }
  }
  try {
    const { data, error} = await supabaseClient.auth.signUp(userData)

    if (error) {
      throw new Error('Error al registrar usuario: ' + error.message)
    }
    // Registro exitoso
    console.log('Usuario registrado con éxito')
  } catch (error) {
    console.error('Error inesperado:', (error as Error).message)
    throw error
  }
}
// Funcion de login; en login
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
    console.log('Error inesperado:', (error as Error).message)
    throw error
  }
}
// Funcion de cerrar sesión; en configuacion
export async function signOutUser (): Promise<void> {
  try {
    const {error} = await supabaseClient.auth.signOut()
    if (error) {
      throw new Error('Error al cerrar sesión: ' + error.message)
    }
    console.log('Exito cerrando sesión')
  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
    throw error
  }
}
// Funcion de actualizar datos; en configuracion
export async function updateUserData (fullName: string, phoneNumber: string): Promise<void> {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    const updateData = {
      fullName,
      phoneNumber
    }
    
    if (!user){
      console.log('No se encontró el usuario')
      return
    }
    const { error } = await supabaseClient
      .from('users_info')
      .update(updateData)
      .eq('id', user.id)

    if (error) {
      throw new Error('Error al actualizar datos de usuario: ' + error.message)
    }

  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
    throw error
  }
}

// Funcion de borrar la cuenta; en confiugración
export async function deleteUserAccount (): Promise<void> {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    
    if (!user){
      console.log('No se encontró el usuario')
      return
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
  