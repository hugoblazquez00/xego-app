import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function GET(req: Request, { params }: { params: { schemaId: string } }) {
  const supabase = createSupabaseClient();

  const viewName = `${params.schemaId}_T_Groceries`;
  const { data, error } = await supabase.from(viewName).select('*');
  console.log(data);
  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}