import pool from '../db.js';

// 전체 조회
export const getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json({ data: rows });
  } catch (err) {
    next(err);
  }
};

// 단일 조회
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: 'User not found' });
    res.json({ data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// 생성
export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: 'Name and email are required' });

  try {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0)
      return res.status(409).json({ error: 'Email already exists' });

    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ data: { id: result.insertId, name, email } });
  } catch (err) {
    next(err);
  }
};

// 전체 수정 (PUT)
export const replaceUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: 'Name and email are required' });

  try {
    const [result] = await pool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json({ data: { id, name, email } });
  } catch (err) {
    next(err);
  }
};

// 일부 수정 (PATCH)
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const [existingRows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existingRows.length === 0)
      return res.status(404).json({ error: 'User not found' });

    const user = existingRows[0];
    const newName = name ?? user.name;
    const newEmail = email ?? user.email;

    await pool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [newName, newEmail, id]
    );
    res.json({ data: { id, name: newName, email: newEmail } });
  } catch (err) {
    next(err);
  }
};

// 삭제
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'User not found' });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
