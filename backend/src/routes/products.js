const express = require('express');
const Product = require('../models/products');
const products = require('../models/products');
const router = express.Router();


// Crear un nuevo producto
router.post('/products', (req, res) => {
    const { title, description, price } = req.body;
    const newProduct = new Product({
        title: title,
        description: description,
        price: price
    });

    newProduct.save()
        .then(product => {
            res.json(product);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

// Obtener todos los productos
router.get('/products', (req, res) => {
    Product.find()
        .sort({ create_at: -1 }) // Ordenar por fecha de más reciente a más antigua
        .then((products) => {
            if (products.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }
            res.json(products);
        })
        .catch((error) => res.status(500).json({ message: error }));
});



// Obtener un producto por su ID
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// Actualizar un producto por su ID
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar un producto por su ID
router.delete('/products/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Producto eliminado correctamente' }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
