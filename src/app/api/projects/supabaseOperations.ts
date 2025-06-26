import { createSupabaseClient } from '@/app/lib/supabaseClient'

export const createProjectSchema = async (projectId: string) => {
  // Usar el cliente de Supabase con el rol de servicio
  const supabase = createSupabaseClient();
  
  try {
    console.log('Creando schema con projectId:', projectId);
    const { error } = await supabase.rpc('create_project_schema', { schema_name: projectId });
    
    if (error) {
      throw new Error(`Error creating schema: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Error in createProjectSchema:', error);
    throw error;
  }
};
