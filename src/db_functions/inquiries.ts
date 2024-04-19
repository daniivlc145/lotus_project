import { supabaseClient } from '../supabase_client'

interface Inquiry {
    type: string,
    description: string,
    created_at: string,
    about_container: boolean,
    container_id: number | null
}

// incompleto
export async function createInquiry (type: string, description: string, about_container: boolean, container_id?: number): Promise<void>{
    let timeStamp = new Date().toISOString()
    try {
        const {error} = await supabaseClient
            .from('inquiries')
            .insert({type, description, created_at: timeStamp})
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message)
        throw error
    }
}

export async function getInquiries (): Promise<Inquiry[]> {
    try {
        let result: Inquiry[] = []
        const {data: {user}} = await supabaseClient.auth.getUser()
        if (!user) {
            throw new Error('No hay un usuario logueado')
        }
        const { data, error } = await supabaseClient
            .from('inquiries')
            .select('type, description, created_at, about_container, container_id')
            .eq('creator_id', user.id)
            
        if (error) {
            throw new Error('Error al consultar los reportes: ' + error.message)
        }
        for (let element in data) {
            result.push({
                type: (element as any).type,
                description: (element as any).description,
                created_at: (element as any).created_at,
                about_container: (element as any).about_container,
                container_id: (element as any).container_id
            })
        }
        return result
        
    } catch (error) {
        console.error('Error inesperado:', (error as Error).message)
        throw error
    }
}