import { createClerkSupabaseClientSsr } from "@/lib/supabase/server"
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

async function GET(): Promise<Response> {
  const client = await createClerkSupabaseClientSsr();
  try {
    const { data, error } = await client
      .from('Posts')
      .select('*')
      .limit(10);
    if (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch Blogs" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Send the data as a JSON response
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' }, })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something Went Wrong" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function POST(req: NextRequest) {
  const data = await req.json();
  const client = await createClerkSupabaseClientSsr();
  try {
    await client.from('Posts').insert([data]);
    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: "Something Went Wrong" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function PUT(req: NextRequest) {
  const data = await req.json();
  const {userId} = await auth();
  const client = await createClerkSupabaseClientSsr();
  try {
     const updatedData = await client
    .from('Posts')
    .update({
      ...data
    })
    .eq('id', data.id)
    .eq('user_id', userId);
    console.log(updatedData)
    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something Went Wrong" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function DELETE(req: NextRequest) {
  const data = await req.json();
  const {userId} = await auth();
  const client = await createClerkSupabaseClientSsr();
  try {
    await client.from('Posts').delete().eq('id', data.id).eq('user_id', userId);
    return new Response(null, { status: 201 })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something Went Wrong" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export { GET, POST, PUT, DELETE };