import { supabaseClient } from '../../supabase_client'

export async function signInUser (email: string, password: string): Promise<void> {

  
    const signInInfo = {
      email,
      password
    }

    try {
      if(await camposVacios(email,password)){throw new Error('Rellena todos los campos')}
      if(await validarCorreoElectronico(email)){throw new Error('Email incorrecto. Escribe un email válido')}
      const {data, error} = await supabaseClient.auth.signInWithPassword(signInInfo)
      if (error) {
        throw new Error('El email o la contraseña son incorrecto/S')
      }
      console.log('Exito iniciando sesión')
    } catch (error) {
      console.error('Error inesperado:', (error as Error).message)
      throw error
    }
}

function validarCorreoElectronico(correo: string): boolean {
    console.log("validando email")
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !expresionRegular.test(correo);
}


function camposVacios(email: string, password: string): boolean {
  console.log("validando email")
  return email.trim() === '' || password.trim() === '';
}



export async function compruebaNuevo(): Promise<boolean>{
  try{
    const {data: {user}, error: errorUsuario} = await supabaseClient.auth.getUser()
    if (errorUsuario) {
        throw new Error('No se ha encontrado un usuario autenticado')
    }

    const {data, error} = await supabaseClient
    .from('users_info')
    .select('is_new')
    .eq('user_id', user?.id)
  
    if (error) {
        console.error('Error al obtener los usuarios:', error.message);
        throw error;
    }
    return data[0].is_new
  } catch (error) {
    console.error('Error inesperado:', (error as Error).message)
    throw error
  }
}

export async function isUser(email : string) {
    try {

      const {data, error,count} = await supabaseClient
      .from('users_info')
      .select('*')
      .eq('email',email)
      
      if(error) throw "Error al comprobar la existencia del correo"

      count ? true : false
    }
    catch(error) {
      console.error("Error inesperado: ", error)
      throw error
    }
}
