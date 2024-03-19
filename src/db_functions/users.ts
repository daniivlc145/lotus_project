import { supabaseClient } from '../supabase_client'

interface NewUserData {
  fullName?: string,
  dni?: string,
  phoneNumber?: string
}

export async function signUpUser (email: string, password: string, fullName: string, dni: string, phoneNumber: string) {
  const userData = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        dni,
        phone_number: phoneNumber
      }
    }
  }
  try {
    const { data, error} = await supabaseClient.auth.signUp(userData)

    if (error) {
      console.error('Error al registrar usuario:', error.message)
      return
    }
    // Registro exitoso
    console.log('Usuario registrado con éxito')
  } catch (error) {
    console.error('Error inesperado:', (error as Error).message)
  }
} 

export async function signInUser (email: string, password: string) {
  const signInInfo = {
    email,
    password
  }
  try {
    const {data, error} = await supabaseClient.auth.signInWithPassword(signInInfo)
    if (error) {
      console.log('Error al iniciar sesión:', error.message)
    }
    console.log('Exito iniciando sesión')
  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
  }
}

export async function signOutUser () {
  try {
    const {error} = await supabaseClient.auth.signOut()
    if (error) {
      console.log('Error al iniciar sesión:', error.message)
    }
    console.log('Exito cerrando sesión')
  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
  }
}

export async function updateUserData (fullName: string, dni: string, phoneNumber: string) {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    const updateData: NewUserData = {
      fullName,
      dni,
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
      console.log('Error al actualizar usuario')
    }

  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
  }
}

export async function deleteUserAccount () {
  try{
    const {data: {user}} = await supabaseClient.auth.getUser()
    
    if (!user){
      console.log('No se encontró el usuario')
      return
    }
    const {error} = await supabaseClient.auth.admin.deleteUser(user.id)
    if (error) {
      console.log('Error al eliminar usuario:', error.message)
    }
    console.log('Exito eliminando usuario')
  } catch (error) {
    console.log('Error inesperado:', (error as Error).message)
  }
}
  