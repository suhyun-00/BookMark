import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { keyword } = req.query;
  const response = await fetch(
    `${process.env.ALADIN_SEARCH_URL}${keyword}&cover=big&sort=salespoint&output=js`,
  );
  const text = await response.text();
  const data = JSON.parse(text.replace(/;$/, '').replace(/\\'/g, "'"));
  res.json(data.item);
}
