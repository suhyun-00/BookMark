import { useEffect, useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';
import { useZxing } from 'react-zxing';

import { Data } from '@customTypes/data';

import Card from '@components/Modal/AddBookModal/Card';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_NAVER_API_URL;

interface BarcodeViewProps {
  onClose: () => void;
  camera: MediaStream | undefined;
}

const BarcodeView = ({ onClose, camera }: BarcodeViewProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data>();
  const [result, setResult] = useState<string>('');
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  const findBookByBarcode = async (barcode: string) => {
    const response = await fetch(`${API_BASE_URL}/search/${barcode}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (result !== '') {
      const findBook = async () => {
        setIsLoading(true);
        const response = await findBookByBarcode(result);
        setData(response[0]);
        setIsLoading(false);
      };

      findBook();
    }
  }, [result]);

  return (
    <div>
      {camera === undefined && (
        <div className="flex items-center justify-center py-8 text-gray-500">
          카메라를 찾을 수 없습니다.
        </div>
      )}
      {camera !== undefined && result === '' && (
        <video ref={ref} className="w-full rounded-xl border border-gray-100" />
      )}
      {data && <Card book={data} onClose={onClose} />}
      {isLoading && (
        <div className="flex justify-center py-8">
          <ScaleLoader color="#101828" />
        </div>
      )}
    </div>
  );
};

export default BarcodeView;
