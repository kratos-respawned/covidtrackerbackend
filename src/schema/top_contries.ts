import mongoose from "mongoose";
const mostAffectedCountriesModel = new mongoose.Schema({
  country: String,
  totalCases: String,
  newCases: String,
  totalDeaths: String,
  newDeaths: String,
  totalRecovered: String,
  newRecovered: String,
  activeCases: String,
  validTill: Number,
});
const mostAffectedCountries = mongoose.model(
  "mostAffectedCountries",
  mostAffectedCountriesModel
);
export default mostAffectedCountries;
