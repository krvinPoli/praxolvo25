const Product = require('../models/product')

const products = [
    new Product(1,"tomate","Grandes y rojos",5,"2025-01-01T20:57:51.479Z"),
    new Product(2,"zapatos","De todas las tallas",35,"2025-01-02T18:50:15.412Z"),
    new Product(3,"camiseta","Elija la marca que quiera",40,"2025-01-01T08:10:14.194Z")
]

module.exports = products;