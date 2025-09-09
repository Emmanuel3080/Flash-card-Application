const handleDuplicateError = (err) => {
  // if (!err.keyValue) {
  //   return {
  //     errMessage: "Duplicate field error",
  //     statusCode: 400,
  //   };
  // }
  const errKey = Object.keys(err.keyValue)[0];
  const errValue = Object.values(err.keyValue)[0];

  const errMessage = `${errKey} of ${errValue} already exists`;

  return {
    errMessage,
    statusCode: 400,
  };
};

const handleCastError = (err) => {
  const errMessage = `This (id)${err.value} doesn't exist in ${err.kind} Field`;

  return {
    errMessage,
    statusCode: 400,
  };
};

const handleJsonWebTokenErr = (err) => {
  const errMessage = `Invalid Signature`;

  return {
    errMessage,
    statusCode: 400,
  };
};

const handleError = (err, req, res, next) => {
  //   res.json("Errororo");

  console.log(err.message);

  if (err.code === 11000) {
    const error = handleDuplicateError(err);
    res.status(error.statusCode).json({
      Message: error.errMessage,
      Status: "Error",
    });
  } else if (err.name == "CastError") {
    const error = handleCastError(err);
    res.status(error.statusCode).json({
      Message: error.errMessage,
      Status: "Failedd",
    });
  } else if (err.name == "JsonWebTokenError") {
    const error = handleJsonWebTokenErr(err);
    res.status(error.statusCode).json({
      Message: error.errMessage,
      Status: "Error",
    });
  } else {
    res.status(500).json({
      Message: "Opps Somethng went wrong",
      Status: "Error",
    });
  }
};

export default handleError;
