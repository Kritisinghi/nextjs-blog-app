import { Webhook } from 'svix'; // Svix typings
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client with environment variables
const supabase: SupabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret: string | undefined = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    res.status(500).send('Clerk webhook secret not configured');
    return;
  }

  const payload = req.body;
  const headers:any = req.headers;

  const wh = new Webhook(secret);

  try {
    // Verify the webhook event
    const event:any = wh.verify(JSON.stringify(payload), headers);

    if (event.type === 'user.created' || event.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name } = event.data as {
        id: string;
        email_addresses: { email_address: string }[];
        first_name: string;
        last_name: string;
      };

      const email = email_addresses[0]?.email_address;

      if (!email) {
        res.status(400).send('Email address missing');
        return;
      }

      // Upsert user into Supabase
      const { error } = await supabase
        .from('users')
        .upsert({
          id,
          email,
          first_name,
          last_name,
        });

      if (error) {
        console.error('Error syncing user to Supabase:', error);
        res.status(500).send('Error syncing user to Supabase');
        return;
      }

      res.status(200).send('User synced successfully');
    } else {
      res.status(400).send('Unhandled event type');
    }
  } catch (err) {
    console.error('Webhook verification failed:', err);
    res.status(400).send('Webhook verification failed');
  }
};

export default handler;
