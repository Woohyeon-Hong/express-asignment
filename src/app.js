import express from 'express';
import orderRouter from './routes/orderRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/orders', orderRouter);

// 에러 핸들러(선택)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
