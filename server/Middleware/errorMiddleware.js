const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  console.log('Status:', error.status);
  console.log('Message:', error.message);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    status,
    message,
  });
};

module.exports = errorMiddleware;
