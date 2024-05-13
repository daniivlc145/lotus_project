import { supabaseClient } from '../../../supabase_client'
export async function yaNoNuevo () {
    try {
        const {data: {user}, error: errorUsuario} = await supabaseClient.auth.getUser()
        if (errorUsuario) {
            throw new Error('No se ha encontrado un usuario autenticado')
        }
        const {data, error} = await supabaseClient
            .from('users')
            .update({is_new: false})
            .eq('id', user?.id)
        if (error) {
            console.error('Error al actualizar el usuario:', error.message)
            throw error
        }
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message)
        throw error
    }
}