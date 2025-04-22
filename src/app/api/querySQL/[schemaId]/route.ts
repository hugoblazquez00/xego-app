import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function POST(req: NextRequest, { params }: { params: { schemaId: string } }) {
  try {
    const { schemaId } = params;
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();
    
    // Forzamos que solo pueda hacer SELECT para seguridad básica
    if (!query.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json(
        { success: false, error: 'Only SELECT queries are allowed.' },
        { status: 400 }
      );
    }

    const fullQuery = query.replace(
      /from\s+([a-zA-Z_][\w]*)/i,
      `from "${schemaId}".$1`
    );
    
    const { data, error } = await supabase.rpc('execute_raw_sql', { query: fullQuery });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}