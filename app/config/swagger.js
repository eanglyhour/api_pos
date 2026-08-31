const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description:
        "E-Commerce API with Express, MongoDB and Cloudinary",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
   apis: [
    "./app/docs/*.swagger.js",
  ],
};

module.exports = swaggerJsdoc(options);