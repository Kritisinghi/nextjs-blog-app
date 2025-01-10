import { createClerkSupabaseClientSsr } from "@/lib/supabase/server"
import { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    const client = await createClerkSupabaseClientSsr();
    try {
        const { data, error } = await client
          .from('Posts')
          .select('*')
          .limit(10);
        if (error) {
          return new Response(JSON.stringify({error: "Failed to fetch Blogs"}),
          {status: 500, headers: { 'Content-Type': 'application/json'}});
        }
    
        // Send the data as a JSON response
        return new Response(JSON.stringify(data), {status:200,  headers: { 'Content-Type': 'application/json' },})
      } catch (error) {
        return new Response(JSON.stringify({error: "Something Went Wrong"}),
          {status: 500, headers: { 'Content-Type': 'application/json'}});
      }

}

export {GET};