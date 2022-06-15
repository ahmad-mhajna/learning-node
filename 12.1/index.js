const axios = require("axios");
const express = require("express");
const server = express();
const apiKey = "3RZrJEXHr5JHjlQSdComvY0AqS1daJVp";

const port = process.env.PORT || 5000;
server.use(express.json());
server.get("/weather", getWeather);

server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});

async function getWeather(req, res) {
  const { data } = await axios.get(
    `https://api.tomorrow.io/v4/timelines?location=${req.body.lat},${req.body.lon}&fields=temperature&timesteps=1h&units=metric&apikey=${apiKey}`
  );
  res.send(data);
}
