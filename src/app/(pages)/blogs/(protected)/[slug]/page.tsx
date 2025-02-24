import React from 'react'
import { createClerkSupabaseClientSsr } from '@/lib/supabase/server';
import Image from 'next/image';

type BlogPageProps = {
    params: Promise<{ slug: string }>;
};

type BlogResponse = {
    data: Blogs | null,
    error: any
}

const BlogPage = async ({ params }: BlogPageProps) => {
    const { slug } = await params;
    const client = await createClerkSupabaseClientSsr();
    const { data, error }: BlogResponse = await client
        .from('Posts')
        .select('*')
        .eq('slug', slug)
        .single()
    const { data: { publicUrl } } = client.storage.from("BLOG").getPublicUrl(data?.image?.split("/")[1]);
    const imageUrl = publicUrl;
    if (error) {
        throw new Error("Oops!! Something went wrong", error);
    }

    return (
        <>{data && imageUrl &&
            <div className="max-w-3xl mx-auto py-12 px-5">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-gray-900">{data.title}</h1>

                {/* Date */}
                <p className="text-gray-500 text-sm mt-2">
                    Published on {new Date(data.created_at).getDate()}
                </p>

                {/* Featured Image */}
                <div className="relative w-full h-80 mt-6">
                    <Image
                        src={`${imageUrl}`}
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* Description */}
                <p className="mt-6 text-lg text-gray-700">{data.description}</p>

                {/* Content */}
                <div className="mt-4 text-gray-800 leading-relaxed space-y-4">
                    {data.content.split("\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>

                {/* Author Info (Optional) */}
                <div className="mt-10 p-4 border-l-4 border-blue-500 bg-gray-100">
                    <p className="text-gray-600 text-sm">Written by: <strong>{data.user_id}</strong></p>
                </div>
            </div>
        }</>
    )
}

export default BlogPage