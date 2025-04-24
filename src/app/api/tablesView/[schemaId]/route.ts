import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function GET(req: NextRequest, { params }: { params: { schemaId: string } }) {
  try {
    const { schemaId } = params;
    const supabase = createSupabaseClient();

    const { data: tableNames, error } = await supabase.rpc('get_table_names', {
        schema_name: schemaId
      });
    
    console.log("tableNames:", tableNames);

    const { data: structure } = await supabase.rpc('get_table_structure', {
        schema_name: schemaId,
        table_name: "t_groceries"
      });
    
      console.log("structure:", structure);
    const { data: structureData, error: structureError } = await supabase.rpc('get_schema_structure', { 
      schema_name: schemaId 
    });

    console.log("structureData:", JSON.stringify(structureData, null, 2));
    
    if (structureError) throw structureError;

    // Asegurarnos de que structureData es un array
    const tables = Array.isArray(structureData) ? structureData : [];

    const tablesWithData = await Promise.all(
      tables.map(async (table) => {
        const { data: tableData, error: dataError } = await supabase.rpc('get_table_data', { 
          schema_name: schemaId,
          table_name: table.table_name,
          limit_rows: 100
        });

        if (dataError) throw dataError;

        return {
          ...table,
          records: tableData || []
        };
      })
    );
    
    return NextResponse.json({ success: true, data: tablesWithData });
  } catch (error: any) {
    console.error('Error in tablesView:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
