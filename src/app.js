import express from 'express';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

import productRouter from './routes/prductRouter.js';
import orderRouter from './routes/orderRouter.js';
import itemsRouter from './routes/itemRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 공통 미들웨어
app.use(express.json());
app.use(logger);

// 헬스 체크
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

// 라우터
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/api/items', itemsRouter);

// 중앙 에러 핸들러(항상 마지막)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
