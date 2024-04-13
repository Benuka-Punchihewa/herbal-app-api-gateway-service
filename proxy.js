const { createProxyMiddleware } = require("http-proxy-middleware");

const authProxyOptions = {
  target: process.env.AUTH_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const userProxyOptions = {
  target: process.env.USER_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const productProxyOptions = {
  target: process.env.PRODUCT_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const orderProxyOptions = {
  target: process.env.ORDER_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const paymentProxyOptions = {
  target: process.env.PAYMENT_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const FeedbackProxyOptions = {
  target: process.env.FEEDBACK_SERVICE_BASE_URL,
  changeOrigin: true,
  logger: console,
};

const authProxy = createProxyMiddleware(authProxyOptions);
const userProxy = createProxyMiddleware(userProxyOptions);
const productProxy = createProxyMiddleware(productProxyOptions);
const orderProxy = createProxyMiddleware(orderProxyOptions);
const paymentProxy = createProxyMiddleware(paymentProxyOptions);
const feedbackProxy = createProxyMiddleware(FeedbackProxyOptions);

module.exports = {
  authProxy,
  userProxy,
  productProxy,
  orderProxy,
  paymentProxy,
  feedbackProxy,
};
