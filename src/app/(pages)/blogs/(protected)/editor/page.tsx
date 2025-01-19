'use client';
import { convertBlobUrlToFile, uploadImage } from '@/lib/supabase/upload/utils';
import { useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState, useTransition } from 'react';

type BlogFormType = {
  title: string,
  image: string | null,
  description: string,
  content: string,
  slug: string
}
const BlogForm = () => {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormType>({
    title: '',
    image: null,
    description: '',
    content: '',
    slug: ''
  })
  const { session } = useSession();
  const [isPending, startTransition] = useTransition();

  const addPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/blogs',
      { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } });
    if (response.ok) {
      const { slug } = await response.json()
      router.push(`/blogs/${slug}}`);
    }
  };
  const uploadForm = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(async () => {
      const file = e.target.files?.[0]; // Optional chaining ensures that e.target.files is not null
      if (file) {
        const imageFile = await convertBlobUrlToFile(URL.createObjectURL(file));
        const clerkToken = await session?.getToken({ template: 'supabase' });
        if (clerkToken) {
          const { fullPath, error } = await uploadImage(imageFile, clerkToken);
          console.log(fullPath);
          if (!fullPath || error) {
            console.log("Erro to be handled");
          } else {
            setForm({ ...form, image: fullPath })
          }
        }
      }
    })
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Blog</h1>
      <form onSubmit={addPost} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the blog title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a brief description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your blog content here"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder="Enter a URL-friendly slug"
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadForm}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed`}
            disabled={isPending}>
            Create Blog {isPending}
          </button>
        </div>
      </form>
    </div>

  );
};

export default BlogForm;
