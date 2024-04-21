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

export async function forgotPassword(email:string) : Promise<void>{
  try{
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          // Habrá que modificar invent por la ruta correcta
          redirectTo: 'https://localhost:4200/contrasena-olvidada',
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