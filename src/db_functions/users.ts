import { supabaseClient } from '../supabase_client'

async function signUpUser (email: string, password: string, fullName: string, dni: string, phoneNumber: string) {
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
      //console.error('Error inesperado:', error.message)
    }
  }
  