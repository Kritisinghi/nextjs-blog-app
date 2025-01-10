import BlogCard from '@/components/card/BlogCard';
import React from 'react'

interface BlogData {
  title: string,
  image: string,
  description: string
}

const Feeds: React.FC = async () => {
  const data: BlogData[] = await fetch('http://localhost:3000/api/blogs').then(res => res.json());
  console.log(data);
  return (
    <>
      {data.map(({ title, image, description }) =>
        <BlogCard key={title} header={title} description={description} imgUrl={image} />)
      }
    </>
  )
}

export default Feeds