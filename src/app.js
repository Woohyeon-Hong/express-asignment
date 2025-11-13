import express from 'express';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

import productRouter from './routes/prductRouter.js';
import orderRouter from './routes/orderRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 공통 미들웨어
app.use(express.json());
app.use(logger);

// 라우터
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// 중앙 에러 핸들러(항상 마지막)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
