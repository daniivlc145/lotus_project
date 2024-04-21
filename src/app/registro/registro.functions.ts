import { supabaseClient } from '../../supabase_client'

// Funcion de registro; en registro
export async function signUpUser (email: string, password: string, fullName: string, phoneNumber: string, rep: string): Promise<void> {
  const userData = {
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber
      },
      emailRedirectTo: "http://localhost:4200/login"
    }
  }
  try {
    if(await camposVacios(email,password)){throw new Error('Rellena todos los campos')}
    if(await validarNombre(fullName)){throw new Error('Escribe un nombre válido')}
    if(await validarTelefono(phoneNumber)){throw new Error('Teléfono incorrecto. Escribe solo dígitos')}
    if(await validarCorreoElectronico(email)){throw new Error('Email incorrecto. Escribe un email válido')}
    if(await validarContrasena(password,rep)){throw new Error('Las contraseñas no coinciden')}
    if(await validarLongitudContrasena(password)){throw new Error('La contrasña debe tener 8-16 caracteres')}

    const { data, error} = await supabaseClient.auth.signUp(userData)
    if (error) {
      throw new Error('Email o teléfono registrado/s')
    }
    console.log('Usuario registrado con éxito')
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
function validarNombre(texto: string): boolean {
  const contieneDigitos = /\d/.test(texto);
  const masDe100Caracteres = texto.length > 100;
  return contieneDigitos || masDe100Caracteres;
}

function validarTelefono(texto: string): boolean {
  const soloDigitos = /^\d+$/.test(texto);
  return !soloDigitos;
}
function validarContrasena(password: string, rep: string): boolean {
  const contrasenaInvalida = password === rep;
  return !contrasenaInvalida;
}
function validarLongitudContrasena(password: string): boolean {
  const longitudValida = password.length >= 8 && password.length <= 16;
  return !longitudValida;
}