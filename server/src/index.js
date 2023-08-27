const express = require("express");
const cors = require("cors");
const axios = require("axios");

//assign express
const app = express();
//endpoint url
const endpoint = "https://openexchangerates.org/api/";
//api key
const key = "your api key is here";

//middlewares
app.use(express.json());
app.use(cors());

//get all currencies
app.get("/getallcurrencies", async (req, res) => {
  const url = `${endpoint}currencies.json?app_id=${key}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  const url = `${endpoint}historical/${date}.json?app_id=${key}`;

  try {
    const response = await axios.get(url);
    const rates = response.data.rates;

    //reates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));

  } catch (error) {
    console.error(error);
  }
});

//listen port
app.listen(5000, () => {
  console.log("Server started");
});
