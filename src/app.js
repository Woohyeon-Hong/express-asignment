import express, { json } from 'express';
import router from './routes/productRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const { active, page } = req.query;
    res.json({
        message: "유저 정보",
        filters: {
            active: active,
            page: page
        }
    });
});

app.post('/', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({
        message: "유저가 생성되었습니다",
        data: {
            name: name,
            email: email
        }
    });
});

app.use("/products", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
