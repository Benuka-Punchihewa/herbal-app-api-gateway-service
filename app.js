// import libraries
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import middleware
const errorHandlerMiddleware = require("./modules/error/error.middleware");

// import errors
const NotFoundError = require("./modules/error/error.classes/NotFoundError");

// import configs
const constants = require("./constants");

// import proxies
const {
  authProxy,
  userProxy,
  productProxy,
  orderProxy,
  paymentProxy,
  feedbackProxy,
} = require("./proxy");

const app = express();

app.use(cors());

// import routes
app.use(constants.API.PREFIX.concat("/auth"), authProxy);
app.use(constants.API.PREFIX.concat("/users"), userProxy);
app.use(constants.API.PREFIX.concat("/products"), productProxy);
app.use(constants.API.PREFIX.concat("/orders"), orderProxy);
app.use(constants.API.PREFIX.concat("/payments"), paymentProxy);
app.use(constants.API.PREFIX.concat("/feedback"), feedbackProxy);

// not found route
app.use((req, res, next) => {
  throw new NotFoundError("API Endpoint Not Found!");
});

// error handler middleware
app.use(errorHandlerMiddleware);

/**
 * connect to database and run application on defined port
 */
const start = async () => {
  const port = process.env.PORT || constants.PORT;
  try {
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
