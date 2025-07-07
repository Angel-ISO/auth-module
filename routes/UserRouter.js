const express = require('express');
const UserRouter = express.Router();
const { createUser, getUserById, loginUser, logoutUser } = require('../controllers/UserController');

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: Datos faltantes o inválidos
 *       409:
 *         description: Usuario ya existe
 */
UserRouter.post('/', createUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Obtener un usuario por su id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *       404:
 *         description: Usuario no encontrado
 */
UserRouter.get('/:id', getUserById);


/** 
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */ 
UserRouter.post('/login', loginUser);

/** 
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Cerrar sesión de usuario
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 *       401:
 *         description: No se proporcionó token
 *       500:
 *         description: Error al cerrar sesión
 */
UserRouter.post('/logout', logoutUser);

module.exports = UserRouter;
