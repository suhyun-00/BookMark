import type { Book } from "@customTypes/books";

const books: Book[] = [
  {
    id: 1,
    title: "프로젝트 헤일메리",
    author: "앤디 위어",
    cover: "",
    progress: 0,
    rating: 0.0,
    status: "wishlist",
  },
  {
    id: 2,
    title: "살인자의 기억법",
    author: "김영하",
    cover: "",
    progress: 100,
    rating: 3.5,
    status: "completed",
  },
  {
    id: 3,
    title: "아주 작은 습관의 힘",
    author: "제임스 클리어",
    cover: "",
    progress: 75,
    rating: 0.0,
    status: "dropped",
  },
  {
    id: 4,
    title: "지구 끝의 온실",
    author: "김초엽",
    cover: "",
    progress: 100,
    rating: 5.0,
    status: "completed",
  },

  {
    id: 5,
    title: "레슨 인 케미스트리 1",
    author: "보니 가머스",
    cover: "",
    progress: 47,
    rating: 0.0,
    status: "reading",
  },
];

export default books;
