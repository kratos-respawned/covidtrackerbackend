import mongoose from "mongoose";
const newsModel = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  validTill: {
    type: Number,
    required: true,
  },
});

const News = mongoose.model("News", newsModel);
export default News;
