const axios = require("axios");

async function axoisDemo(currency) {
  const response = await axios.get(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
  );
  console.log(response.data[currency]);
}

axoisDemo("usd");
