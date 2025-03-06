import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { keyword } = req.query;

  try {
    const response = await fetch(
      `${process.env.ALADIN_SEARCH_URL}${keyword}&cover=big&sort=salespoint&output=js`,
    );

    if (!response.ok) {
      throw new Error(`알라딘 API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();

    const data = JSON.parse(text.replace(/;$/, '').replace(/\\'/g, "'"));

    res.status(200).json(data.item);
  } catch (error) {
    console.error('API 호출 에러:', error);

    res.status(500).json({
      message: '서버 내부 오류가 발생했습니다.',
      error: error.message || 'Unknown error',
    });
  }
}
