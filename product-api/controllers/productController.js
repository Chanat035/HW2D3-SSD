const Product = require("../models/productModels");

const productController = {
    getAllProducts: (req, res) => {

        Product.getAll((err, results) => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json(results);
    
        });
    },

    getProductByID: (req, res) => {

        Product.getById(req.params.id, (err, results) => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json(results[0] || {});
    
        });
    },

    searchProducts: (req, res) => {

        const { keyword } = req.params;
    
        Product.searchByKeyword(keyword, (err, results) => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json(results);
    
        });
    },

    createProduct: (req, res) => {

        const { name, price} = req.body;

        if (!name || !price == null) {
            return res.status(400).json({ error: 'Name and price are required' });
        }
    
        // const query = 'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)';
    
        Product.create(req.body, (err, result) => {
    
                  if (err) {return res.status(500).json({ error: err.message });}
    
                  res.status(201).json({ id: result.insertId, message: 'Product created' });
    
        });
    },

    updateProduct: (req, res) => {

        const { id } = req.params;
    
        // const query = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?';
    
        Product.update(id, req.body, err => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json({ message: 'Product updated' });
    
        });
    },

    softDeleteProduct: (req, res) => {
        const { id } = req.params;
        Product.softDelete(id, err => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json({ message: 'Product soft-deleted' });
    
        });
    },

    restoreProduct: (req, res) => {
        const { id } = req.params;
        Product.restore(id, err => {
    
                  if (err) return res.status(500).json({ error: err.message });
    
                  res.json({ message: 'Product restored' });
    
        });
    },

    getProductsView: (req, res) => {
        Product.getAll((err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.render('product', { products: results });
        });
    }
};

module.exports = productController;