import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function GET(req: NextRequest, { params }: { params: { schemaId: string } }) {
  try {
    const { schemaId } = params;
    const supabase = createSupabaseClient();

    const { data: tableNames, error } = await supabase.rpc('get_table_names', {
      schema_name: schemaId
    });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      data: tableNames || [] 
    });
  } catch (error: any) {
    console.error('Error fetching table names:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
