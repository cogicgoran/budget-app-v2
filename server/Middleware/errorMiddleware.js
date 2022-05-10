const errorMiddleware = (error, req, res, next) => {
  console.log('myerrormiddleware\n', JSON.stringify(error, null, 2));
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    status,
    message,
  });
};

module.exports = errorMiddleware;
