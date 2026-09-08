/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management API
 */


/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Get all attendance records
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Attendance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Attendance retrieved successfully
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68b123456789abcdef123456"
 *                       check_in:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2026-09-08T01:05:20.000Z"
 *                       check_out:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2026-09-08T10:02:15.000Z"
 *                       check_in_latitude:
 *                         type: number
 *                         format: double
 *                         nullable: true
 *                         example: 11.567525
 *                       check_in_longitude:
 *                         type: number
 *                         format: double
 *                         nullable: true
 *                         example: 104.827060
 *                       check_out_latitude:
 *                         type: number
 *                         format: double
 *                         nullable: true
 *                         example: 11.567500
 *                       check_out_longitude:
 *                         type: number
 *                         format: double
 *                         nullable: true
 *                         example: 104.827000
 *                       distance:
 *                         type: number
 *                         example: 35
 *                       status:
 *                         type: string
 *                         enum:
 *                           - present
 *                           - late
 *                           - absent
 *                         example: present
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-09-08T01:05:20.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-09-08T10:02:15.000Z"
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/attendance/check-in:
 *   post:
 *     summary: Check in attendance
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: double
 *                 example: 11.567525
 *               longitude:
 *                 type: number
 *                 format: double
 *                 example: 104.827060
 *     responses:
 *       201:
 *         description: Check-in successful
 *       400:
 *         description: Invalid request or already checked in
 *       403:
 *         description: User is outside attendance area
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/attendance/check-out:
 *   post:
 *     summary: Check out attendance
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: double
 *                 example: 11.567525
 *               longitude:
 *                 type: number
 *                 format: double
 *                 example: 104.827060
 *     responses:
 *       200:
 *         description: Check-out successful
 *       400:
 *         description: Invalid request or already checked out
 *       403:
 *         description: User is outside attendance area
 *       404:
 *         description: User has not checked in today
 *       500:
 *         description: Internal server error
 */