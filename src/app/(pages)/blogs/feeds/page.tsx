import BlogCard from '@/components/Card/BlogCard';
import Loading from '@/components/Loading/Loading';
import { createClerkSupabaseClientSsr } from '@/lib/supabase/server';
import Link from 'next/link';
import React, { Suspense } from 'react'

const Feeds: React.FC = async () => {
  const client = await createClerkSupabaseClientSsr();
  const { data, error } = await client
    .from('Posts')
    .select('*')
    .limit(10);

  if (error) {
    throw new Error("Oops!! Something went wrong", error);
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        {data.map(({ id, title, image, description, slug }) =>
          <Link key={id} href={`/blogs/${slug}`}> <BlogCard key={title} id={id} header={title} description={description} imgUrl={image} /></Link>)
        }
      </Suspense>
    </>
  )
}

export default Feeds