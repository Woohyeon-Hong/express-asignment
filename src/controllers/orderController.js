import pool from '../db.js';
import { HttpError } from '../errors/HttpError.js';

// GET /orders
export const getAllOrders = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders');
    // 과제 2: DB 조회 실패 시 500 → try/catch로 errorHandler에게 전달
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// POST /orders
export const createOrder = async (req, res, next) => {
  const { user_id, product_id } = req.body;
  // 과제 1: 필수값 누락 400은 미들웨어로 처리 (requireBodyFields)
  try {
    // 존재 검증 → 없으면 404
    const [[u]] = await pool.execute('SELECT id FROM users WHERE id = ?', [user_id]);
    if (!u) throw new HttpError(404, 'User not found');

    const [[p]] = await pool.execute('SELECT id FROM products WHERE id = ?', [product_id]);
    if (!p) throw new HttpError(404, 'Product not found');

    const [result] = await pool.execute(
      'INSERT INTO orders (user_id, product_id) VALUES (?, ?)',
      [user_id, product_id]
    );
    res.status(201).json({ data: { id: result.insertId, user_id, product_id } });
  } catch (err) {
    next(err);
  }
};

// GET /orders/joined
export const getJoinedOrders = async (req, res, next) => {
  try {
    const sql = `
      SELECT o.id AS order_id, u.name AS user_name, p.name AS product_name, o.order_date
      FROM orders o
      JOIN users u    ON o.user_id    = u.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.id ASC
    `;
    const [rows] = await pool.query(sql);
    // 과제 3: 빈 배열도 200 OK와 함께 반환
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// GET /orders/user/:userId
export const getUserOrders = async (req, res, next) => {
  const { userId } = req.params; // validateIdParam로 숫자 검증
  try {
    const sql = `
      SELECT o.id AS order_id, u.name AS user_name, p.name AS product_name, o.order_date
      FROM orders o
      JOIN users u    ON o.user_id    = u.id
      JOIN products p ON o.product_id = p.id
      WHERE u.id = ?
      ORDER BY o.id ASC
    `;
    const [rows] = await pool.execute(sql, [userId]);

    // 과제 4: 해당 userId 주문이 없으면 404
    if (rows.length === 0) throw new HttpError(404, 'No orders for this user');

    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};
