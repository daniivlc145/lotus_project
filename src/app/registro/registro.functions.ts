import { supabaseClient } from '../../supabase_client'

// Funcion de registro; en registro
export async function signUpUser (email: string, password: string, fullName: string, phoneNumber: string): Promise<void> {
  const userData = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber
      },
      emailRedirectTo: "https://lotusproject.netlify.app/login"
    }
  }
  try {
    const { data, error} = await supabaseClient.auth.signUp(userData)
    if (error) {
      if (String(error).includes("key")) throw "Correo a registrado"
      throw error
    }
    console.log('Usuario registrado con éxito')
  } catch (error) {
        console.error('Error inesperado:', (error as Error).message)
        throw error
    }
}
