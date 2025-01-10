import Image from 'next/image';
import { title } from 'process';
import React from 'react'

interface BlogCardProps {
    imgUrl: string;
    header: string;
    description: string;
}
  
const BlogCard: React.FC<BlogCardProps> = ({imgUrl, header, description}) => {
  return (
    <div className='flex justify-center max-w-full'>
    <div  className='flex w-3/4 h-96 m-2 border-2 border-gray-300'>
        <div className='mr-2 justify-start'>
            <Image src={imgUrl} alt={title} height={0} width={300} className='h-full'/>
        </div>
        <div>
            <div className='text-md font-medium'>{header}</div>
            <div className='text-sm font-thin mt-2 text-gray-900'>{description}</div>
        </div>
    </div>
    </div>
  )
}


export default BlogCard