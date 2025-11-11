import pool from '../db.js';

// 전체 JOIN 결과: 모든 주문 + 사용자명 + 상품명
export const getJoinedOrders = async (req, res, next) => {
  try {
    const sql = `
      SELECT
        o.id         AS order_id,
        u.name       AS user_name,
        p.name       AS product_name,
        o.order_date AS order_date
      FROM orders o
      JOIN users u    ON o.user_id    = u.id
      JOIN products p ON o.product_id = p.id
      ORDER BY o.id ASC
    `;
    const [rows] = await pool.query(sql);
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// 특정 사용자(userId)의 주문만 JOIN해서 조회
export const getUserOrders = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const sql = `
      SELECT
        o.id         AS order_id,
        u.name       AS user_name,
        p.name       AS product_name,
        o.order_date AS order_date
      FROM orders o
      JOIN users u    ON o.user_id    = u.id
      JOIN products p ON o.product_id = p.id
      WHERE o.user_id = ?
      ORDER BY o.id ASC
    `;
    const [rows] = await pool.execute(sql, [userId]);
    res.json({ data: rows });
  } catch (err) {
    next(err);
  }
};
