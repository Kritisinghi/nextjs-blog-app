import { Webhook } from 'svix'; // Svix typings
import { NextRequest } from 'next/server';
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { createClerkSupabaseClientSsr } from '@/lib/supabase/server';

export const POST = async (req: NextRequest) => {
  const secret: string | undefined = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Clerk webhook secret not configured', { status: 500 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }
  const wh = new Webhook(secret);
  try {
    // Verify the webhook event
    const evt: WebhookEvent = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent

    if (evt.type === 'user.created' || evt.type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, username, image_url, created_at } = evt.data as UserJSON;
      const email = email_addresses[0]?.email_address;
      if (!email) {
        return new Response('Email address missing', { status: 400 });
      }

      const client = await createClerkSupabaseClientSsr();
      
      // Upsert user into Supabase
      const { error } = await client
        .from('User')
        .upsert({
          user_id: id,
          created_at: new Date(created_at).toISOString(),
          email,
          first_name,
          last_name,
          username,
          avatar: image_url
        });

      if (error) {
        console.error('Error syncing user to Supabase:', error);
        return new Response('Error syncing user to Supabase', { status: 500 });
      }
      return new Response('User synced successfully', { status: 200 });
    } else {
      return new Response('Unhandled event type', { status: 400 });
    }
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
};

