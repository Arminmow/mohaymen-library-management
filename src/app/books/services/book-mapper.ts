import { Book } from '../stores/book-store';

export interface BookFormData {
  id?: number;
  title: string;
  author_info: { id: number; name: string };
  publishedDate: Date;
  tags: string[];
}

export function mapFormDataToBook(formData: BookFormData): Book | Omit<Book, 'id'> {
  const book = {
    title: formData.title,
    author: formData.author_info.name,
    author_id: formData.author_info.id,
    publishedDate: formData.publishedDate,
    tags: formData.tags
  };

  if (formData.id != null) return { ...book, id: formData.id };
  return book;
}
