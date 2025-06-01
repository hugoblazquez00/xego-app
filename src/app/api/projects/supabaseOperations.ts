import { createSupabaseClient } from '@/app/lib/supabaseClient'

export const createProjectSchema = async (projectId: string) => {
  // Usar el cliente de Supabase con el rol de servicio
  const supabase = createSupabaseClient();
  
  try {
    const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS "${projectId}";`;
    
    const { error: schemaError } = await supabase.rpc('execute_raw_sql', { query: createSchemaQuery });
    
    if (schemaError) {
      throw new Error(`Error creating schema: ${schemaError.message}`);
    }

    // // Otorgar permisos al rol de servicio
    // const grantPermissionsQuery = `
    //   GRANT ALL PRIVILEGES ON SCHEMA "${projectId}" TO service_role;
    //   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA "${projectId}" TO service_role;
    //   ALTER DEFAULT PRIVILEGES IN SCHEMA "${projectId}" GRANT ALL PRIVILEGES ON TABLES TO service_role;
    // `;
    
    // const { error: grantError } = await supabase.rpc('execute_raw_sql', { query: grantPermissionsQuery });
    
    // if (grantError) {
    //   throw new Error(`Error granting permissions: ${grantError.message}`);
    // }

    return true;
  } catch (error) {
    console.error('Error in createProjectSchema:', error);
    throw error;
  }
};
