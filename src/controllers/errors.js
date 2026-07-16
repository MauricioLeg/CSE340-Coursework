export const showTestErrorPage = (req, res, next) => {
  const error = new Error('This is a test error');
  error.status = 500;
  next(error);
}