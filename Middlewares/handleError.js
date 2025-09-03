const handleDuplicatEror = (err) => {
  const errKey = Object.keys(err.keyValue)[0];
  const errValue = Object.values(err.keyValue)[0];

  const message = `${errKey} of ${errValue} already Exists`;
  return {
    message,
    StatusCode: 400,
  };
};

const handleError = (err, req, res, next) => {
  if (err.code == 11000) {
    const error = handleDuplicatEror(err);
    res.status(error.StatusCode).json({
      Message: error.message,
      Status: "Error",
    });
  }
  else{
    res.status(500).json({
        Message : "Oops Something went wrong",
        Status : "Error"
    })
  }
};

export default handleError;
