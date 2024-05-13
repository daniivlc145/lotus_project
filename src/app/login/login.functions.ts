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

export async function compruebaNuevo(email: string): Promise<boolean>{
  try{
    const {data, error} = await supabaseClient
    .from('users')
    .select('is_new')
    .eq('email', email)
  
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
