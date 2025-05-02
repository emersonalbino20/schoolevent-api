"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("../controllers/feedback.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Feedbacks
 *     description: Operações relacionadas aos Feedbacks
 */
/**
 * @swagger
 * /feedbacks:
 *   post:
 *     tags:
 *       - Feedbacks
 *     summary: Cria um novo feedback
 *     description: Cria um novo feedback no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professor_id:
 *                 type: integer
 *               aluno_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               texto:
 *                 type: string
 *               pontuacao:
 *                 type: integer
 *     responses:
 *       200:
 *         description: feedback criado com sucesso
 *       500:
 *         description: Erro ao criar feedback
 */
router.post("/", (req, res) => {
    (0, feedback_controller_1.criarFeedback)(req, res);
});
/**
 *
 * @swagger
 * /feedbacks/{id}:
 *   put:
 *     tags:
 *       - Feedbacks
 *     summary: Atualiza um feedback existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professor_id:
 *                 type: integer
 *               aluno_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *               texto:
 *                 type: string
 *               pontuacao:
 *                 type: integer
 *     responses:
 *       200:
 *         description: feedback atualizado com sucesso
 *       404:
 *         description: feedback não atualizado
 */
router.put("/:id", (req, res) => {
    (0, feedback_controller_1.atualizarFeedback)(req, res);
});
/**
 * @swagger
 * /feedbacks:
 *   get:
 *     tags:
 *       - Feedbacks
 *     summary: Lista todos os Feedbacks
 *     responses:
 *       200:
 *         description: Lista de Feedbacks retornada com sucesso
 */
router.get("/", (req, res) => {
    (0, feedback_controller_1.listarFeedbacks)(req, res);
});
exports.default = router;
