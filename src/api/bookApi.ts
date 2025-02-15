import { doc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import type { Book, BookStatusType } from '@customTypes/books';
import db from '@/fireabase';

export const fetchBooks = async (userId: string) => {
  const condition = query(collection(db, 'userBooks'), where('userId', '==', userId));
  const querySnapshot = await getDocs(condition);

  const booksData: (Book | null)[] = await Promise.all(
    querySnapshot.docs.map(async (document) => {
      const data = document.data();
      const bookRef = doc(db, 'books', data.bookId);
      const bookSnap = await getDoc(bookRef);

      if (!bookSnap.exists()) return null;
      const bookData = bookSnap.data();

      return {
        id: data.bookId,
        title: bookData.title,
        author: bookData.author,
        cover: bookData.cover,
        progress: Math.floor((data.currentPage / bookData.page) * 100),
        startAt: data.startAt,
        finishedAt: data.finishedAt,
        rating: data.rating,
        status: data.status as BookStatusType,
      };
    }),
  );
  return booksData;
};

export const fetchBook = async (bookId: string) => {
  const bookRef = doc(db, 'books', bookId);
  const bookSnap = await getDoc(bookRef);

  return bookSnap;
};

export const findDocumentId = async (bookId: string) => {
  const condition = query(collection(db, 'userBooks'), where('bookId', '==', bookId));
  const querySnapshot = await getDocs(condition);

  if (querySnapshot.empty) return null;

  const docId = querySnapshot.docs[0].id;
  const docRef = doc(db, 'userBooks', docId);

  return docRef;
};
