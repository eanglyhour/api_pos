/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "68a7f123456789"
 *         invoice_number:
 *           type: string
 *           example: "INV-20260822-001"
 *         order_id:
 *           type: string
 *           example: "68a7f123456780"
 *         subtotal:
 *           type: number
 *           example: 16
 *         shipping_fee:
 *           type: number
 *           example: 2
 *         discount:
 *           type: number
 *           example: 0
 *         total:
 *           type: number
 *           example: 18
 *         status:
 *           type: string
 *           enum:
 *             - paid
 *             - unpaid
 *           example: paid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create invoice from order
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *             properties:
 *               order_id:
 *                 type: string
 *                 example: "68a7f123456780"
 *               status:
 *                 type: string
 *                 enum:
 *                   - paid
 *                   - unpaid
 *                 example: unpaid
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456789"
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Update invoice status
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - paid
 *                   - unpaid
 *                 example: paid
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       404:
 *         description: Invoice not found
 */

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Delete invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "68a7f123456789"
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */