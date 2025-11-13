export function errorHandler(err, req, res, next) {
  // 공통 에러 응답
  const status = err.statusCode || 500;
  const payload = {
    error: err.message || 'Internal Server Error',
  };
  // 개발 중이면 스택을 보고 싶을 수도 있음
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  console.error(err);
  res.status(status).json(payload);
}
