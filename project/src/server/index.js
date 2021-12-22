require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/manifest_data_Opportunity", async (req, res) => {
  try {
    let manifest_data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=2018-06-09&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ manifest_data });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/manifest_data_Spirit", async (req, res) => {
  try {
    let manifest_data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=2010-02-01&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ manifest_data });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/manifest_data_Perseverance", async (req, res) => {
  try {
    let manifest_data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=2021-11-28&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ manifest_data });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/manifest_data_Curiosity", async (req, res) => {
  try {
    let manifest_data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-11-30&api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ manifest_data });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
