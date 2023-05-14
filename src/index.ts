import { getCovidData } from "./utils/getCovidData.js";
import { getNews } from "./utils/getNews.js";
import mongoose from "mongoose";
import express from "express";
import News from "./schema/news.js";
import mostAffectedCountries from "./schema/top_contries.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
if (!process.env.MONGO_URL) throw new Error("MONGO_URL not found");
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.get("/news", async (req, res) => {
  const news = await News.find({ validTill: { $gt: new Date().getTime() } });
  if (news.length === 0) {
    const data = await getNews();
    setTimeout(async () => {
      await News.deleteMany({});
      await News.insertMany(data);
    }, 0);
    res.json(data).status(200);
  } else {
    res.json(news).status(200);
  }
});

app.get("/countryWise", async (req, res) => {
  const affectedCountries = await mostAffectedCountries.find({
    validTill: { $gt: new Date().getTime() },
  });
  if (affectedCountries.length === 0) {
    const data = await getCovidData();
    setTimeout(async () => {
      await mostAffectedCountries.deleteMany({});
      await mostAffectedCountries.insertMany(data);
    }, 0);
    res.json(data).status(200);
  } else {
    res.json(affectedCountries).status(200);
  }
});
const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
