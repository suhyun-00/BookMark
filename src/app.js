import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { XMLParser } from 'fast-xml-parser';

const app = express();

dotenv.config();

app.use(cors({ origin: true }));

app.use(express.json());

app.get('/search/:keyword', async (req, res) => {
  const response = await fetch(
`${process.env.ALADIN_SEARCH_URL}${req.params.keyword}&cover=big&sort=salespoint&output=js`,
);
  const text = await response.text();
  const data = JSON.parse(text.replace(/;$/, '').replace(/\\'/g, "'"));
  res.json(data.item);
});

app.get('/lookup/:isbn', async (req, res) => {
  const page = json.object.item.bookinfo.itemPage;
  const description = json.object.item.description;
  const categoryName = json.object.item.categoryName;

  res.json({ page, description, categoryName });
});

app.listen(process.env.PORT, () => {
  console.log(`BookMark listening on port ${process.env.PORT}`);
});
