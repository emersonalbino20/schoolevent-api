"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const destaque_controller_1 = require("../controllers/destaque.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Destaques
 *     description: Operações relacionadas aos Destaques
 */
/**
 * @swagger
 * /destaques:
 *   post:
 *     tags:
 *       - Destaques
 *     summary: Cria um novo destaque
 *     description: Cria um novo destaque no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aluno_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               motivo:
 *                 type: string
 *               criado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: destaque criado com sucesso
 *       500:
 *         description: Erro ao criar destaque
 */
router.post("/", (req, res) => {
    (0, destaque_controller_1.criarDestaque)(req, res);
});
/**
 *
 * @swagger
 * /destaques/{id}:
 *   put:
 *     tags:
 *       - Destaques
 *     summary: Atualiza um destaque existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do destaque
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aluno_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               motivo:
 *                 type: string
 *               criado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: destaque atualizado com sucesso
 *       404:
 *         description: destaque não atualizado
 */
router.put("/:id", (req, res) => {
    (0, destaque_controller_1.atualizarDestaque)(req, res);
});
/**
 * @swagger
 * /destaques:
 *   get:
 *     tags:
 *       - Destaques
 *     summary: Lista todos os Destaques
 *     responses:
 *       200:
 *         description: Lista de Destaques retornada com sucesso
 */
router.get("/", (req, res) => {
    (0, destaque_controller_1.listarDestaques)(req, res);
});
/**
 *
 * @swagger
 * /destaques/{evento_id}:
 *   get:
 *     tags:
 *       - Destaques
 *     summary: Buscar destaques do evento
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 */
router.get("/:evento_id", (req, res) => {
    (0, destaque_controller_1.buscarDestaque)(req, res);
});
exports.default = router;
