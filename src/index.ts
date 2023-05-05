import { getCovidData } from "./utils/getCovidData";
import { getNews } from "./utils/getNews";
import express from "express";
const app = express();
app.get("/", async (req, res) => {
  const data = await getNews();
  res.json(data);
});
app.get("/countryWise", async (req, res) => {
  const data = await getCovidData();
  res.json(data);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
