/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Operaciones de carritos de compra.
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary:  Lista de carritos.
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Lista de carritos obtenida exitosamente.
 *       500:
 *         description: Error del servidor.
 */

router.get('/', cartController.getAllCarts);

/**
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: llama a un carrito por su ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error del servidor.
 */

router.get('/:cartId', cartController.getCartById);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Crear un nuevo carrito.
 *     tags: [Carts]
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente.
 *       500:
 *         description: Error del servidor.
 */

router.post('/', cartController.createCart);

/**
 * @swagger
 * /carts/{cartId}:
 *   put:
 *     summary: Actualizar un carrito ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito a actualizar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error del servidor.
 */

router.put('/:cartId', cartController.updateCart);

/**
 * @swagger
 * /carts/{cartId}:
 *   delete:
 *     summary: Elimina un carrito por su ID.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carrito eliminado exitosamente.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error del servidor.
 */

router.delete('/:cartId', cartController.deleteCart);

/**
 * @swagger
 * /carts/{cartId}/products:
 *   post:
 *     summary: Agrega un producto a un carrito.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito al que se agregará el producto.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *         description: Producto agregado al carrito exitosamente.
 *       500:
 *         description: Error del servidor.
 */

router.post('/:cartId/products', cartController.addProductToCart);

/**
 * @swagger
 * /carts/{cartId}/products/{productId}:
 *   put:
 *     summary: Actualiza la cantidad de un producto en un carrito.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito en el que se actualizará el producto.
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto a actualizar en el carrito.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado en el carrito exitosamente.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */

router.put('/:cartId/products/:productId', cartController.updateProductInCart);

/**
 * @swagger
 * /carts/{cartId}/products/{productId}:
 *   delete:
 *     summary: Elimina un producto de un carrito.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: ID del carrito del que se eliminará el producto.
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto a eliminar del carrito.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Producto eliminado del carrito exitosamente.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */

router.delete('/:cartId/products/:productId', cartController.removeProductFromCart);

module.exports = router;
