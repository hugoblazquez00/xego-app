// Support POST, PUT, DELETE for dynamic-proxy

import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/app/lib/supabaseClient';

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  try {
    // const { searchParams } = new URL(req.url);
    //const { searchParams } = req.nextUrl;
    const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });
    }

    const table = params.path[0]; 
    if (!table) {
      return NextResponse.json({ success: false, error: "Missing table in path" }, { status: 400 });
    }

    const supabase = createSupabaseClient();

    const fullQuery = `SELECT * FROM "${projectId}".${table}`;

    const { data, error } = await supabase.rpc("execute_raw_sql", { query: fullQuery });
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
    return NextResponse.json({
      success: false,
      error: error.message,
      debug: {
        reqUrl: req.url,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        fullConstructedUrl: new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL).toString(),
        params,
        projectId: url?.searchParams.get("projectId"),
        table: params.path?.[0],
        fullQuery: `SELECT * FROM "${url?.searchParams.get("projectId")}".${params.path?.[0]}`
      }
    }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { path: string[] } }) {
  // const { searchParams } = new URL(req.url);
  
  //const { searchParams } = req.nextUrl;

  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
  const projectId = url.searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const body = await req.json();
  const columns = Object.keys(body).join(', ');
  const values = Object.values(body).map(v => typeof v === "string" ? `'${v}'` : v).join(', ');
  const fullQuery = `INSERT INTO "${projectId}".${table} (${columns}) VALUES (${values})`;

  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { query: fullQuery });

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: { params: { path: string[] } }) {
  // const { searchParams } = new URL(req.url);
  
  //const { searchParams } = req.nextUrl;
  
  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
  const projectId = url.searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const id = params.path[1];
  const body = await req.json();
  const updates = Object.entries(body)
    .map(([k, v]) => `${k} = ${typeof v === "string" ? `'${v}'` : v}`)
    .join(', ');

  const fullQuery = `UPDATE "${projectId}".${table} SET ${updates} WHERE id = ${id}`;
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { query: fullQuery });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: { path: string[] } }) {
  // const { searchParams } = new URL(req.url);
  
  //const { searchParams } = req.nextUrl;
  
  const url = new URL(req.url, process.env.NEXT_PUBLIC_BASE_URL);
  const projectId = url.searchParams.get("projectId");
  // const projectId = searchParams.get("projectId");
  if (!projectId) return NextResponse.json({ success: false, error: "Missing projectId" }, { status: 400 });

  const table = params.path[0];
  const id = params.path[1];
  const fullQuery = `DELETE FROM "${projectId}".${table} WHERE id = ${id}`;

  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc("execute_raw_sql", { query: fullQuery });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}