import mongoose from "mongoose";
const mostAffectedCountriesModel = new mongoose.Schema({
  country: String,
  totalCases: String,
  totalDeaths: String,
  totalRecovered: String,
  activeCases: String,
  validTill: Number,
});
const mostAffectedCountries = mongoose.model(
  "mostAffectedCountries",
  mostAffectedCountriesModel
);
export default mostAffectedCountries;
