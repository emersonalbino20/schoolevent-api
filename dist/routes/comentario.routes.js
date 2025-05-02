"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentario_controller_1 = require("../controllers/comentario.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Operações relacionadas aos Comentarios
 */
/**
 * @swagger
 * /comentarios:
 *   post:
 *     tags:
 *       - Comentarios
 *     summary: Cria um novo comentario
 *     description: Cria um novo comentario no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               texto:
 *                 type: string
 *     responses:
 *       200:
 *         description: comentario criado com sucesso
 *       500:
 *         description: Erro ao criar comentario
 */
router.post("/", (req, res) => {
    (0, comentario_controller_1.criarComentario)(req, res);
});
/**
 *
 * @swagger
 * /comentarios/{id}:
 *   put:
 *     tags:
 *       - Comentarios
 *     summary: Atualiza um comentario existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               texto:
 *                 type: string
 *     responses:
 *       200:
 *         description: comentario atualizado com sucesso
 *       404:
 *         description: comentario não atualizado
 */
router.put("/:id", (req, res) => {
    (0, comentario_controller_1.atualizarComentario)(req, res);
});
/**
 * @swagger
 * /comentarios:
 *   get:
 *     tags:
 *       - Comentarios
 *     summary: Lista todos os Comentarios
 *     responses:
 *       200:
 *         description: Lista de Comentarios retornada com sucesso
 */
router.get("/", (req, res) => {
    (0, comentario_controller_1.listarComentarios)(req, res);
});
exports.default = router;
