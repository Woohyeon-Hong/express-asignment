import pool from '../db.js';
import { HttpError } from '../errors/HttpError.js';

// GET /products
export const getAllProducts = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    // 과제 6: DB 조회 실패 시 500 → try/catch로 errorHandler로 전달됨
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// GET /products/:id
export const getProductById = async (req, res, next) => {
  const { id } = req.params; // validateIdParam에서 형식 검증
  try {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) throw new HttpError(404, 'Product not found'); // 과제 7
    res.json({ data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// POST /products
export const createProduct = async (req, res, next) => {
  const { name, price } = req.body; // requireBodyFields + validateNumeric 로 400 검사
  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, price) VALUES (?, ?)',
      [name, price]
    );
    res.status(201).json({ data: { id: result.insertId, name, price: Number(price) } });
  } catch (err) {
    next(err);
  }
};
