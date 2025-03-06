import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { isbn } = req.query;
  const response = await fetch(`${process.env.ALADIN_LOOKUP_URL}${isbn}&output=js`);
  const text = await response.text();
  const data = JSON.parse(text.replace(/;$/, '').replace(/\\'/g, "'").replace(/\n/g, ''));
  res.json({ page: data.item[0].bookinfo.itemPage });
}
