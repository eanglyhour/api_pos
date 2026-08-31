/**
 * @swagger
 * tags:
 *   name: Product Sizes
 *   description: Product size, price and stock management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductSize:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66d111111111abcdef123456"
 *         product_id:
 *           type: string
 *           example: "66c999999999abcdef123456"
 *         size:
 *           type: string
 *           example: "M"
 *         const_price:
 *           type: number
 *           minimum: 0
 *           example: 5
 *         sell_price:
 *           type: number
 *           minimum: 0
 *           example: 8
 *         stock:
 *           type: integer
 *           minimum: 0
 *           example: 20
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/product-sizes:
 *   post:
 *     summary: Create a product size
 *     tags: [Product Sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - size
 *               - const_price
 *               - sell_price
 *               - stock
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "66c999999999abcdef123456"
 *               size:
 *                 type: string
 *                 example: "M"
 *               const_price:
 *                 type: number
 *                 minimum: 0
 *                 example: 5
 *               sell_price:
 *                 type: number
 *                 minimum: 0
 *                 example: 8
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 example: 20
 *     responses:
 *       201:
 *         description: Product size created successfully
 *       400:
 *         description: Size already exists or invalid price
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-sizes:
 *   get:
 *     summary: Get all product sizes
 *     tags: [Product Sizes]
 *     responses:
 *       200:
 *         description: Product sizes retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-sizes/{id}:
 *   get:
 *     summary: Get product size by ID
 *     tags: [Product Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66d111111111abcdef123456"
 *     responses:
 *       200:
 *         description: Product size retrieved successfully
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-sizes/{id}:
 *   put:
 *     summary: Update product size
 *     tags: [Product Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66d111111111abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - size
 *               - const_price
 *               - sell_price
 *               - stock
 *             properties:
 *               size:
 *                 type: string
 *                 example: "L"
 *               const_price:
 *                 type: number
 *                 minimum: 0
 *                 example: 6
 *               sell_price:
 *                 type: number
 *                 minimum: 0
 *                 example: 9
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *                 example: 50
 *     responses:
 *       200:
 *         description: Product size updated successfully
 *       400:
 *         description: Size already exists or invalid price
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-sizes/{id}:
 *   delete:
 *     summary: Delete product size
 *     tags: [Product Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66d111111111abcdef123456"
 *     responses:
 *       200:
 *         description: Product size deleted successfully
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Server error
 */