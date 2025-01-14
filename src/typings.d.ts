interface Blogs {
    id: string,
    imgUrl: string;
    header: string;
    description: string;
    content: string;
}

type BlogFormType = {
    title:string,
    image: File | null,
    description: string,
    content: string,
    slug:string
}
