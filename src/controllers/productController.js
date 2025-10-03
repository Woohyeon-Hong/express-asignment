export const getProducts = (req, res) => {
    const { active, page } = req.query;
    res.json({
        message: "Product List",
        filters: { active, page }
    });
}

export const createProducts = (req, res) => {
        const { name, count, price } = req.body;
    res.status(201).json({
        message: "Product Created",
        data: {
            name: name,
            count: count,
            price: price
        }
    });
}