let products = [];
let nextId = 1;

// 공통 유효성 검사
const isValidPrice = (val) => {
  const n = typeof val === 'string' ? Number(val) : val;
  return Number.isFinite(n) && n >= 0;
};

// 전체 조회: GET /products
export const getAllProducts = (req, res) => {
  res.status(200).json({ data: products });
};

// 단일 조회: GET /products/:id
export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ data: product });
};

// 생성: POST /products
export const createProduct = (req, res) => {
  const { name, price, description } = req.body ?? {};

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'price must be a non-negative number' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: Number(price),
    description: description ?? null,
  };
  products.push(newProduct);
  res.status(201).json({ data: newProduct });
};

// 전체 교체(대체): PUT /products/:id
export const replaceProduct = (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const { name, price, description } = req.body ?? {};
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name and price are required' });
  }
  if (!isValidPrice(price)) {
    return res.status(400).json({ error: 'price must be a non-negative number' });
  }

  products[index] = { id, name, price: Number(price), description: description ?? null };
  res.json({ data: products[index] });
};

// 일부 수정: PATCH /products/:id
export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const { name, price, description } = req.body ?? {};

  if (name !== undefined) product.name = name;
  if (price !== undefined) {
    if (!isValidPrice(price)) {
      return res.status(400).json({ error: 'price must be a non-negative number' });
    }
    product.price = Number(price);
  }
  if (description !== undefined) product.description = description;

  res.json({ data: product });
};

// 삭제: DELETE /products/:id
export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some(p => p.id === id);
  if (!exists) return res.status(404).json({ error: 'Product not found' });

  products = products.filter(p => p.id !== id);
  res.status(204).send();
};
