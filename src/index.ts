import { getCovidData } from "./utils/getCovidData";
import { getNews } from "./utils/getNews";
import mongoose from "mongoose";
import express from "express";
import News from "./schema/news";
import mostAffectedCountries from "./schema/top_contries";
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/covid").then(() => {
  console.log("Connected to MongoDB");
});
app.get("/", async (req, res) => {
  const news = await News.find({ validTill: { $gt: new Date().getTime() } });
  if (news.length === 0) {
    const data = await getNews();
    setTimeout(async () => {
      await News.deleteMany({});
      await News.insertMany(data);
    }, 0);
    res.json(data).status(200);
  } else {
    console.log("cache hit");
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
