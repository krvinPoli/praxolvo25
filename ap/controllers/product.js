let products = require('../db/products.js')
const Product = require('../models/product.js')

const getProducts = (req, res) => {
    if (products.length != 0) {
        res.status(200).json(products);
    } else {
        res.status(200).send('There are no products here yet!');
    }
}

const getOneProduct = (req, res) => {
    const { id } = req.params;
    const productFound = products.find(product => product.id === parseInt(id));
    
    if (productFound != undefined) {
        res.status(200).json(productFound);
    } else {
        res.status(404).send("Elemento no encontrado")
    }
}

const createProduct = (req, res) => {
    const { name, descr, price } = req.body;
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Product(
        id,
        name,
        descr,
        price,
        new Date()
    );
    if (!name || !descr || !price) {
        return res.status(400).send('Faltan parametros')
    }
    if (typeof price !== "number" || price < 0 || typeof name !== "string" || typeof descr !== "string") {
        return res.status(400).send('Parámetros no validos')
    }

    products.push(newProduct);
    res.status(201).json(newProduct);
}

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const newArray = products.filter(product => product.id !== parseInt(id));

    if (newArray.length == products.length) {
        res.status(404).send('Producto no encontrado')
    } else {
        products = newArray
        res.status(200).json(products)
    }
}

const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, descr, price } = req.body;

    for (let i = 0; i < products.length; i++) {
        if (!name || !descr || !price) {
            return res.status(400).send('Faltan parametros')
        }
        if (typeof price !== "number" || price < 0 || typeof name !== "string" || typeof descr !== "string") {
            return res.status(400).send('Parámetros no validos')
        }
        if (products[i].id === parseInt(id)) {
            products[i].name = name;
            products[i].descr = descr;
            products[i].price = price;
            return res.status(200).json(products[i])
        }
    }

    res.status(404).send("Elemento no encontrado")
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct
}