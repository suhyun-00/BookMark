import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { XMLParser } from "fast-xml-parser";

const app = express();

dotenv.config();

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/search/:isbn", async (req, res) => {
  const response = await fetch(
    `${process.env.ALADIN_API_URL}${req.params.isbn}`,
  );
  const text = await response.text();

  const parser = new XMLParser();
  const json = parser.parse(text);
  const data = json.object.item.bookinfo.itemPage;

  res.json(data);
});

app.listen(process.env.PORT, () => {
  console.log(`BookMark listening on port ${process.env.PORT}`);
});
