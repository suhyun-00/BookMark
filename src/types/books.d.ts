type BookStatusType = "wishlist" | "reading" | "completed" | "dropped";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  progress: number;
  rating: number;
  status: BookStatusType;
}
