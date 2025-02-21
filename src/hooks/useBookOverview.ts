import { useState, useRef, useEffect } from 'react';

import { DocumentReference, DocumentData, updateDoc, Timestamp } from 'firebase/firestore';

import type { Book, BookStatusType } from '@customTypes/books';

import { fetchUserBook } from '@api/bookApi';

interface useBookOverviewProps {
  book: Book;
  handleBookUpdate: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatDate = (timestamp: Timestamp) => {
  return new Date(timestamp.toDate().getTime() - timestamp.toDate().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

const useBookOverview = ({ book, handleBookUpdate, setIsLoading }: useBookOverviewProps) => {
  const [status, setStatus] = useState<BookStatusType>(book.status);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rating, setRating] = useState<number>(book.rating);
  const [startAt, setStartAt] = useState<string>(book.startAt ? formatDate(book.startAt) : '');
  const [finishedAt, setFinishedAt] = useState<string>(
    book.finishedAt ? formatDate(book.finishedAt) : '',
  );

  const documentRef = useRef<DocumentReference<DocumentData, DocumentData>>();
  const prevCurrentPage = useRef<number>(currentPage);

  const handleUpdate = async () => {
    setIsLoading(true);
    const updateFields: Record<string, Timestamp | BookStatusType | number> = {};

    if (String(book.startAt) !== startAt) {
      updateFields.startAt = Timestamp.fromDate(new Date(startAt + 'T00:00:00'));
    }

    if (String(book.finishedAt) !== finishedAt) {
      updateFields.finishedAt = Timestamp.fromDate(new Date(finishedAt + 'T00:00:00'));
    }

    if (book.rating !== rating) {
      updateFields.rating = rating;
    }

    if (prevCurrentPage.current !== currentPage) {
      updateFields.currentPage = currentPage;
    }

    if (book.status !== status) {
      updateFields.status = status;
    }

    if (Object.keys(updateFields).length !== 0) {
      if (documentRef.current) {
        await updateDoc(documentRef.current, updateFields);
        await handleBookUpdate();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const { docRef, docSnap } = await fetchUserBook(book.id.toString());
      if (docRef) documentRef.current = docRef;
      if (docSnap.exists()) setCurrentPage(docSnap.data().currentPage);
    };
    getData();
  }, [book.id]);

  return {
    currentPage,
    rating,
    startAt,
    finishedAt,
    setStatus,
    setCurrentPage,
    setRating,
    setStartAt,
    setFinishedAt,
    handleUpdate,
  };
};

export default useBookOverview;
