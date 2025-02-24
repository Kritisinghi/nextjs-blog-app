import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const createClerkSupabaseClient = (clerkToken: string): SupabaseClient => {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                fetch: async (url, options = {}) => {
                    const headers = new Headers(options?.headers);
                    if (clerkToken) {
                        headers.set('Authorization', `Bearer ${clerkToken}`);
                    }
                    return fetch(url, {
                        ...options,
                        headers
                    })
                }
            }
        }
    )
}