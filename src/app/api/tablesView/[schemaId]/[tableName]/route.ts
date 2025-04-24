import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function POST(req: NextRequest, { params }: { params: { schemaId: string, tableName: string } }) {
  try {
    const { schemaId, tableName } = params;
    const supabase = createSupabaseClient();

    // Obtener la estructura de la tabla
    const { data: structure, error: structureError } = await supabase.rpc('get_table_structure2', {
        schema_name: schemaId,
        tbl_name: tableName
      });

    if (structureError) throw structureError;

    // Obtener los datos de la tabla
    const { data: records, error: dataError } = await supabase.rpc('get_table_data', {
      schema_name: schemaId,
      table_name: tableName,
      limit_rows: 100
    });
    if (dataError) throw dataError;

    return NextResponse.json({
      success: true,
      data: {
        columns: structure || [],
        records: records || []
      }
    });
  } catch (error: any) {
    console.error('Error fetching table data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
