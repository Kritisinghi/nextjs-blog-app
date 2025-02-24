interface Blogs {
    id: number;
    created_at: string;
    title: string;
    image: string;
    description: string;
    content: string;
    slug: string;
    user_id: string;
}

type BlogFormType = {
    title:string,
    image: File | null,
    description: string,
    content: string,
    slug:string
}
