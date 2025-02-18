import { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';
import { Data } from '@/types/data';
import Card from '@components/Modal/AddBookModal/Card';
import ScaleLoader from 'react-spinners/ScaleLoader';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_NAVER_API_URL;

const BarcodeView = () => {
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
      {result === '' && <video ref={ref} className="rounded-xl border border-gray-100" />}
      {data && <Card book={data} />}
      {isLoading && (
        <div className="flex justify-center py-8">
          <ScaleLoader color="#101828" />
        </div>
      )}
    </div>
  );
};

export default BarcodeView;
