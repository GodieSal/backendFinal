const mockingProducts = [];

for (let i = 1; i <= 100; i++) {
  const product = {
    _id: uuidv4(), 
    name: `Producto ${i}`,
    price: Math.floor(Math.random() * 100) + 1, 
    description: `Descripción del Producto ${i}`,
  };

  mockingProducts.push(product);
}

module.exports = mockingProducts;
