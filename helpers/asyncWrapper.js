// wrap a middleware function in try catch blocks and return the wrapped middleware function
// this is useful for handling errors in async middleware
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    }
    catch (error) {
      if (error.code === 11000) {
        return res.json({ status: "error", error: "Username already in use" });
      }
      else return res.json({ message: error.message, error });
    }
}
}

module.exports = asyncWrapper;