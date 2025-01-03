const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    res.render("index", { weather, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "Error, please try again" });
  }
});

app.get("/air-quality/:city", async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const airQuality = response.data;
    res.json({ airQuality });
  } catch (error) {
    res.status(500).json({ error: "Error fetching air quality data" });
  }
});
app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    res.json({ weather });
  } catch (error) {
    res.status(500).json({ error: "Error, please try again" });
  }
});

app.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const forecast = response.data;
    res.json({ forecast });
  } catch (error) {
    res.status(500).json({ error: "Error, please try again" });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
