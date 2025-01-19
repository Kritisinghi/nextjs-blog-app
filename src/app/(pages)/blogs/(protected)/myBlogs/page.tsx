import BlogCard from '@/components/Card/BlogCard';
import { createClerkSupabaseClientSsr } from '@/lib/supabase/server';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const MyBlogs = async () => {
   const client = await createClerkSupabaseClientSsr();
   const {userId} = await auth();
   console.log(userId)
    const { data, error } = await client
      .from('Posts')
      .select('*')
      .eq('user_id', userId)
      .limit(10);
  
    if (error) {
      throw new Error("Oops!! Something went wrong");
    }
  return (
    <>
      {data.map(({ id, title, image, description, slug }) =>
        <Link href={`/blogs/${slug}`} key={slug}> 
          <BlogCard key={title} id={id} header={title} description={description} imgUrl={image} />
        </Link>)
      }
    </>
  )
}

export default MyBlogs;