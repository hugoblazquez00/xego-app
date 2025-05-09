import { NextRequest, NextResponse } from 'next/server';

import { createSupabaseClient } from '@/app/lib/supabaseClient';

const cleanErrorMessage = (error: string, schemaId: string) => {
  return error.replace(new RegExp(`"${schemaId}\\.`, 'g'), '"');
};

export async function POST(req: NextRequest, { params }: { params: { schemaId: string } }) {
  
  const { schemaId } = params;
  try {
    const { schemaId } = params;
    const body = await req.json();
    const { query, queryType } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query is required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();
    
    if (queryType === 'xego' && !query.trim().toLowerCase().startsWith('select')) {
      return NextResponse.json(
        { success: false, error: 'Only SELECT queries are allowed in XEGO mode.' },
        { status: 400 }
      );
    }
    const fullQuery = query
    .replace(/from\s+([a-zA-Z_][\w]*)/gi, `from "${schemaId}".$1`)
    .replace(/insert\s+into\s+([a-zA-Z_][\w]*)/gi, `insert into "${schemaId}".$1`)
    .replace(/update\s+([a-zA-Z_][\w]*)/gi, `update "${schemaId}".$1`)
    .replace(/delete\s+from\s+([a-zA-Z_][\w]*)/gi, `delete from "${schemaId}".$1`)
    .replace(/create\s+table\s+([a-zA-Z_][\w]*)/gi, `create table "${schemaId}".$1`)
    .replace(/drop\s+table\s+if\s+exists\s+([a-zA-Z_][\w]*)/gi, `drop table if exists "${schemaId}".$1`);
    const { data, error } = await supabase.rpc('execute_raw_sql', { query: fullQuery });

    if (error) {
      const cleanedError = cleanErrorMessage(error.message, schemaId);
      return NextResponse.json(
        { success: false, error: cleanedError },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    const cleanedError = cleanErrorMessage(error.message || 'Internal server error', schemaId);
    return NextResponse.json(
      { success: false, error: cleanedError },
      { status: 500 }
    );
  }
}