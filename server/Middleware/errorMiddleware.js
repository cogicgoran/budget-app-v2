const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    status,
    message,
  });
};

module.exports = errorMiddleware;
