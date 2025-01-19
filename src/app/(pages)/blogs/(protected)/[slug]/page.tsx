import React from 'react'

type BlogPageProps = {
    params: Promise<{ slug: string }>;
};
const BlogPage =  async ({ params }: BlogPageProps) => {
    const { slug } = await params;

    return (
        <div>BlogPage {slug} </div>
    )
}

export default BlogPage