const baseURL = "https://pokeapi.co/api/v2/pokemon/ditto";
const axios = require("axios");
const fetch = require("node-fetch");
const request = require("request");
async function getdata() {
  try {
    const axiosResponse = await axios.get(baseURL);
    const requestResponse = await request.get(baseURL);
    const fetchResponse = await fetch(baseURL);
    console.log(axiosResponse, requestResponse, fetchResponse);
  } catch (error) {
    console.log(error);
  }
}
getdata();
