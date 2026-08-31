/**
 * @swagger
 * tags:
 *   name: Role Permissions
 *   description: Role and permission management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6a9430f3aa4afffda197887c"
 *         role_id:
 *           type: string
 *           example: "6a93e07b39c0fecaec90227f"
 *         permission_id:
 *           type: string
 *           example: "6a94284839d19e010497f2f6"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AssignPermissions:
 *       type: object
 *       required:
 *         - role_id
 *         - permission_ids
 *       properties:
 *         role_id:
 *           type: string
 *           example: "6a93e07b39c0fecaec90227f"
 *         permission_ids:
 *           type: array
 *           items:
 *             type: string
 *           minItems: 1
 *           example:
 *             - "6a94284839d19e010497f2f6"
 *             - "6a94284839d19e010497f2f7"
 *             - "6a94284839d19e010497f2f5"
 *
 *     RolePermissionList:
 *       type: object
 *       properties:
 *         role_id:
 *           type: string
 *         role_name:
 *           type: string
 *         permissions:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * /api/role-permissions:
 *   post:
 *     summary: Assign multiple permissions to a role
 *     tags:
 *       - Role Permissions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignPermissions'
 *     responses:
 *       201:
 *         description: Permissions assigned successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Role or permission not found
 *       409:
 *         description: All permissions are already assigned
 */

/**
 * @swagger
 * /api/role-permissions:
 *   get:
 *     summary: Get all roles with their permissions
 *     tags:
 *       - Role Permissions
 *     responses:
 *       200:
 *         description: Role permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RolePermissionList'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   get:
 *     summary: Get role permission by ID
 *     tags:
 *       - Role Permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6a9430f3aa4afffda197887c"
 *     responses:
 *       200:
 *         description: Role permission retrieved successfully
 *       404:
 *         description: Role permission not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Remove permission from role
 *     tags:
 *       - Role Permissions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6a9430f3aa4afffda197887c"
 *     responses:
 *       200:
 *         description: Permission removed from role successfully
 *       404:
 *         description: Role permission not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/role-permissions/role/{roleId}:
 *   get:
 *     summary: Get all permissions of a role
 *     tags:
 *       - Role Permissions
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6a93e07b39c0fecaec90227f"
 *     responses:
 *       200:
 *         description: Role permissions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/RolePermissionList'
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/role-permissions/permission/{permissionId}:
 *   get:
 *     summary: Get all roles that have a permission
 *     tags:
 *       - Role Permissions
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6a94284839d19e010497f2f6"
 *     responses:
 *       200:
 *         description: Permission roles retrieved successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */