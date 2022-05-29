const catchError = async (err, req, res, next) => {
  const error = err.message;
  const {status} = err;
  const {data} = err;

  return res.status(400).json({
    status,
    error,
    data
  });
};

module.exports = catchError;
