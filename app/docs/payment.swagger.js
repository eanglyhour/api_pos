/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Bakong Payment API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "68a89749bc2c5f9e33092dcb8"
 *         invoice_id:
 *           type: string
 *           example: "68a89749bc2c5f9e33092dca0"
 *         order_id:
 *           type: string
 *           example: "68a89749bc2c5f9e33092dcb1"
 *         amount:
 *           type: number
 *           example: 18
 *         currency:
 *           type: string
 *           example: "KHR"
 *         md5:
 *           type: string
 *           example: "a1b2c3d4e5f678901234567890abcdef"
 *         transaction_hash:
 *           type: string
 *           nullable: true
 *           example: "TXN-001"
 *         from_account_id:
 *           type: string
 *           nullable: true
 *           example: "user@bkrt"
 *         to_account_id:
 *           type: string
 *           nullable: true
 *           example: "phal_phanth@bkrt"
 *         payment_method:
 *           type: string
 *           example: "KHQR"
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - paid
 *           example: "pending"
 *         payment_date:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create Bakong payment
 *     description: Create a payment and generate a dynamic KHQR using an invoice ID.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invoice_id
 *             properties:
 *               invoice_id:
 *                 type: string
 *                 example: "68a89749bc2c5f9e33092dca0"
 *               currency:
 *                 type: string
 *                 enum:
 *                   - KHR
 *                   - USD
 *                 example: KHR
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid request or invoice/order already paid
 *       404:
 *         description: Invoice or order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Bakong payment
 *     description: Verify payment status using Bakong transaction API and MD5.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - md5
 *             properties:
 *               md5:
 *                 type: string
 *                 example: "a1b2c3d4e5f678901234567890abcdef"
 *     responses:
 *       200:
 *         description: Payment verified successfully or payment is still pending
 *       400:
 *         description: Invalid payment or amount mismatch
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */