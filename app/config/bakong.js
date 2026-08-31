require("dotenv").config();

const bakongConfig = {
  apiUrl: process.env.BAKONG_API_URL,
  token: process.env.BAKONG_TOKEN,
  accountId: process.env.BAKONG_ACCOUNT_ID,
  merchantName: process.env.BAKONG_MERCHANT_NAME,
  city: process.env.BAKONG_CITY
};

module.exports = bakongConfig;