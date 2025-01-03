let products = require('../db/products.js')
const Product = require('../models/product.js')

const getProducts = (req, res) => {
    try {
        if (products.length != 0) {
            res.status(200).json(products);
        } else {
            res.status(200).send([]);
        }
    } catch (error) {
        next(error);
    }
}

const getOneProduct = (req, res) => {
    try {
        const { id } = req.params;
        const productFound = products.find(product => product.id === parseInt(id));
        
        if (productFound != undefined) {
            res.status(200).json(productFound);
        } else {
            res.status(404).send("Elemento no encontrado")
        }
    } catch (error) {
        next(error);
    }
}

const createProduct = (req, res) => {
    try {
        const { name, descr, price } = req.body;
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        if (!name || !descr || price === undefined) {
            return res.status(400).send('Faltan parametros');
        }

        if (typeof price !== "number" || price < 0 || typeof name !== "string" || typeof descr !== "string") {
            return res.status(400).send('Parámetros no validos');
        }

        const newProduct = new Product(
            id,
            name,
            descr,
            price,
            new Date()
        );

        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        const newArray = products.filter(product => product.id !== parseInt(id));

        if (newArray.length == products.length) {
            return res.status(404).send('Producto no encontrado');
        } else {
            products = newArray;
            res.status(200).json(products);
        }
    } catch (error) {
        next(error);
    }
}

const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, descr, price } = req.body;

        const product = products.find(product => product.id === parseInt(id));

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        if (!name || !descr || price === undefined) {
            return res.status(400).send('Faltan parametros');
        }

        if (typeof price !== "number" || price < 0 || typeof name !== "string" || typeof descr !== "string") {
            return res.status(400).send('Parámetros no validos');
        }

        product.name = name;
        product.descr = descr;
        product.price = price;
        product.updatedAt = new Date();

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}