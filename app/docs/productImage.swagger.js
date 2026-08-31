/**
 * @swagger
 * tags:
 *   name: Product Images
 *   description: Product image management API
 */

/**
 * @swagger
 * /api/product-images:
 *   get:
 *     summary: Get all product images
 *     tags: [Product Images]
 *     responses:
 *       200:
 *         description: Product images retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-images/product/{productId}:
 *   get:
 *     summary: Get images by product ID
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: "66c123456789abcdef123456"
 *     responses:
 *       200:
 *         description: Product images retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-images/{id}:
 *   get:
 *     summary: Get product image by ID
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66c999999999abcdef123456"
 *     responses:
 *       200:
 *         description: Product image retrieved successfully
 *       404:
 *         description: Product image not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-images:
 *   post:
 *     summary: Upload product image
 *     tags: [Product Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - image
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "66c123456789abcdef123456"
 *               image:
 *                 type: string
 *                 format: binary
 *               is_primary:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Product image created successfully
 *       400:
 *         description: Product ID or image is required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-images/{id}:
 *   put:
 *     summary: Update product image
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66c999999999abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: "66c123456789abcdef123456"
 *               image:
 *                 type: string
 *                 format: binary
 *               is_primary:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Product image updated successfully
 *       404:
 *         description: Product image not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product-images/{id}:
 *   delete:
 *     summary: Delete product image
 *     tags: [Product Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66c999999999abcdef123456"
 *     responses:
 *       200:
 *         description: Product image deleted successfully
 *       404:
 *         description: Product image not found
 *       500:
 *         description: Server error
 */