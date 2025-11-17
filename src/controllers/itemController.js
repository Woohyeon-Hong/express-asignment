import pool from '../db.js'; // 또는 '../config/db.js'

function isValidPrice(val) {
  const num = Number(val);
  return Number.isFinite(num) && num >= 0;
}

// POST /api/items
export const createItem = async (req, res, next) => {
  const { name, description, price } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name은 필수입니다.' });
  }
  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'price는 0 이상 숫자여야 합니다.' });
  }

  try {
    const [result] = await pool.execute(
      'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
      [name, description ?? null, price]
    );

    res.status(201).json({
      data: {
        id: result.insertId,
        name,
        description: description ?? null,
        price: Number(price),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/items
export const getAllItems = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, description, price FROM items ORDER BY id DESC'
    );
    res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// GET /api/items/:id
export const getItemById = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: '유효하지 않은 id입니다.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, name, description, price FROM items WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: '존재하지 않는 아이템입니다.' });
    }

    res.status(200).json({ data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// PUT /api/items/:id
export const updateItem = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: '유효하지 않은 id입니다.' });
  }

  const { name, description, price } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name은 필수입니다.' });
  }
  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'price는 0 이상 숫자여야 합니다.' });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description ?? null, price, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '존재하지 않는 아이템입니다.' });
    }

    res.status(200).json({
      data: {
        id,
        name,
        description: description ?? null,
        price: Number(price),
      },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: '유효하지 않은 id입니다.' });
  }

  try {
    const [result] = await pool.execute(
      'DELETE FROM items WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: '존재하지 않는 아이템입니다.' });
    }

    // 성공 시 204 No Content
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
