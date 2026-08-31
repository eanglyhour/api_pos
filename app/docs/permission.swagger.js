/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66c8f2a7e4b1c9d123456789
 *         name:
 *           type: string
 *           example: user.read
 *         description:
 *           type: string
 *           example: Permission to read users
 *         status:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-08-31T05:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-08-31T05:10:00.000Z
 */

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     description: Retrieve all permissions sorted by newest first.
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: Permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permissions retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Permission'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     description: Retrieve a single permission by its MongoDB ObjectId.
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Permission MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: 66c8f2a7e4b1c9d123456789
 *     responses:
 *       200:
 *         description: Permission retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Update permission
 *     description: Update permission name, description, and status.
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Permission MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: 66c8f2a7e4b1c9d123456789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: user.update
 *               description:
 *                 type: string
 *                 example: Permission to update users
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission not found
 *       409:
 *         description: Permission name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission name already exists
 *       500:
 *         description: Internal server error
 */