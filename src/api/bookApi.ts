import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  setDoc,
  addDoc,
} from 'firebase/firestore';

import type { Book, BookStatusType } from '@customTypes/books';
import { Data } from '@customTypes/data';

import db from '@/fireabase';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_SERVER_URL;

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

const fetchDocId = async (bookId: string) => {
  const condition = query(collection(db, 'userBooks'), where('bookId', '==', bookId));
  const querySnapshot = await getDocs(condition);

  return querySnapshot.docs[0].id;
};

export const fetchUserBook = async (bookId: string) => {
  const docId = await fetchDocId(bookId);
  const docRef = doc(db, 'userBooks', docId);
  const docSnap = await getDoc(docRef);

  return { docRef, docSnap };
};

export const deleteBook = async (bookId: string) => {
  const docId = await fetchDocId(bookId);
  await deleteDoc(doc(db, 'userBooks', docId));
};

export const addBook = async (book: Data, userId: string) => {
  const booksRef = await getDoc(doc(db, 'books', book.isbn13));
  const condition = query(
    collection(db, 'userBooks'),
    where('userId', '==', userId),
    where('bookId', '==', book.isbn13),
  );
  const userBooksSanpshot = await getDocs(condition);

  if (!booksRef.exists()) {
    const response = await fetch(`${API_BASE_URL}/lookup/${book.isbn13}`);
    const { page } = await response.json();

    await setDoc(doc(db, 'books', book.isbn13), {
      title: book.title,
      author: book.author.replace(/ 지음.*/, ''),
      cover: book.cover,
      publisher: book.publisher,
      pubDate: book.pubDate,
      page: page,
      description: book.description,
      category: book.categoryName.split('>'),
    });
  }

  if (userBooksSanpshot.docs.length === 0) {
    await addDoc(collection(db, 'userBooks'), {
      userId: userId,
      bookId: book.isbn13,
      status: 'planned',
      currentPage: 0,
      startAt: null,
      finishedAt: null,
      rating: 0,
      notes: [],
    });
  }
};
