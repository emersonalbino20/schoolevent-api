"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("./../controllers/login.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas aos usuários
 */
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Realiza o login
 *     description: Valida os dados de login do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       500:
 *         description: Erro ao realizar login
 */
router.post("/", (req, res) => {
    (0, login_controller_1.loginUsuario)(req, res);
});
exports.default = router;
