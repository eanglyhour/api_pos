/**
 * @swagger
 * tags:
 *   name: Order Items
 *   description: Order item management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "68a7f123456789"
 *         order_id:
 *           type: string
 *           example: "68a7f123456780"
 *         product_size_id:
 *           type: string
 *           example: "6a883e54060ceef50f7a3e26"
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 8
 *         subtotal:
 *           type: number
 *           example: 16
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [Order Items]
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/order-items/order/{orderId}:
 *   get:
 *     summary: Get order items by order ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456780"
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456789"
 *     responses:
 *       200:
 *         description: Order item retrieved successfully
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/order-items/{id}:
 *   delete:
 *     summary: Delete order item
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456789"
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Server error
 */