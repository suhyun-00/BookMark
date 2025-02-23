import { Timestamp } from 'firebase/firestore';

const formatDate = (timestamp: Timestamp) => {
  return new Date(timestamp.toDate().getTime() - timestamp.toDate().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
};

export default formatDate;
