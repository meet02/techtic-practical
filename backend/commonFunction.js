const responseGenerator = (res, error, payload, status) => {
  res.status(status).send(
    JSON.stringify({
      error: error,
      payload: payload,
      status: status.toString(),
    })
  );
};

module.exports = {
  responseGenerator,
};
