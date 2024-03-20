export const errorMiddleware = (error, req, res, next) => {
  console.log(e);
  return res
    .status(500)
    .json({ message: `Internal server error! | ${error.message}` });
};
