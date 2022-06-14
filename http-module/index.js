const baseURL = "https://pokeapi.co/api/v2/pokemon/ditto";
const http = require("http");
async function getdata() {
  try {
    const requestResponse = await http.request.get(baseURL);
    console.log(requestResponse);
  } catch (error) {
    console.log(error);
  }
}
getdata();
