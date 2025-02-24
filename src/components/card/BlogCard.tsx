import Image from 'next/image';
import React from 'react'
import ActionButton from './ActionButton';

type BlogCardProps = Pick<Blogs, 'id' | 'imgUrl' | 'header' | 'description'>;

const BlogCard: React.FC<BlogCardProps> = ({ id, imgUrl, header, description }) => {
  const imgSrc = imgUrl ?  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + imgUrl : ''
  return (
    <div className="flex justify-center max-w-full">
      <div className="flex flex-col md:flex-row w-3/4 h-auto m-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="w-full md:w-1/3">
          <Image src={imgSrc} alt={header} height={20} width={100} className='object-cover w-full h-80 rounded-t-lg md:rounded-t-none md:rounded-l-lg' />
        </div>
        <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{header}</h2>
            <p className="text-gray-500 text-sm mt-1">by John Doe • Jan 10, 2025</p>
            <p className="text-sm text-gray-700 mt-4">{description}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-gray-600 hover:text-blue-500 transition-colors"
              //   onClick={()=> console.log("like")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span className="ml-1 text-sm">Like</span>
              </button>
              <button
                className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
              //   onClick={()=> console.log("edit")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 3v10M5 9h10"
                  />
                </svg>
                <span className="ml-1 text-sm">Edit</span>
              </button>
              <ActionButton
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                method="DELETE"
                id={id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M10 11h4m-6 0H4a2 2 0 002-2V5h8v6a2 2 0 002 2H4z"
                  />
                </svg>
                <span className="ml-1 text-sm">Delete</span>
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default BlogCard