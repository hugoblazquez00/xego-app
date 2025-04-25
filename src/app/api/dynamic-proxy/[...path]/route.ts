// Support POST, PUT, DELETE for dynamic-proxy

import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });
    }

    const table = params.path[0]; // e.g. /api/dynamic-proxy/tasks → "tasks"
    if (!table) {
      return NextResponse.json({ success: false, error: "Missing table in path" }, { status: 400 });
    }

    const supabase = createSupabaseClient();

    const rawQuery = `SELECT * FROM ${table}`;
    const fullQuery = rawQuery.replace(/from\s+([a-zA-Z_][\w]*)/gi, `from "${projectId}".$1`);

    const { data, error } = await supabase.rpc("execute_raw_sql", { query: fullQuery });
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { path: string[] } }) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const body = await req.json();
  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(v => typeof v === "string" ? `'${v}'` : v).join(', ');
  const rawQuery = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
  const fullQuery = rawQuery.replace(/from\s+([a-zA-Z_][\w]*)/gi, `from "${projectId}".$1`);

  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { fullQuery });

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: { params: { path: string[] } }) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const id = params.path[1];
  const body = await req.json();
  const updates = Object.entries(body)
    .map(([k, v]) => `${k} = ${typeof v === "string" ? `'${v}'` : v}`)
    .join(', ');
  const rawQuery = `UPDATE ${table} SET ${updates} WHERE id = ${id}`;
  const fullQuery = rawQuery.replace(/from\s+([a-zA-Z_][\w]*)/gi, `from "${projectId}".$1`);

  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { fullQuery });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { path: string[] } }) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const id = params.path[1];
  const rawQuery = `DELETE FROM ${table} WHERE id = ${id}`;
  const fullQuery = rawQuery.replace(/from\s+([a-zA-Z_][\w]*)/gi, `from "${projectId}".$1`);

  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { fullQuery });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}