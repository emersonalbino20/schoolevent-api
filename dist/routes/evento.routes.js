"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evento_controller_1 = require("../controllers/evento.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: Eventos
 *     description: Operações relacionadas aos eventos
 */
/**
 * @swagger
 * /eventos:
 *   post:
 *     tags:
 *       - Eventos
 *     summary: Cria um novo evento
 *     description: Cria um novo evento no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *                 format: date-time
 *               data_fim:
 *                 type: string
 *                 format: date-time
 *               local:
 *                 type: string
 *               criado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento criado com sucesso
 *       500:
 *         description: Erro ao criar evento
 */
router.post("/", (req, res) => {
    (0, evento_controller_1.criarEvento)(req, res);
});
/**
 *
 * @swagger
 * /eventos/{id}:
 *   put:
 *     tags:
 *       - Eventos
 *     summary: Atualiza um evento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *                 format: date-time
 *               data_fim:
 *                 type: string
 *                 format: date-time
 *               local:
 *                 type: string
 *               criado_por:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       404:
 *         description: Evento não atualizado
 */
router.put("/:id", (req, res) => {
    (0, evento_controller_1.atualizarEvento)(req, res);
});
/**
 * @swagger
 * /eventos:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Lista todos os eventos
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 */
router.get("/", (req, res) => {
    (0, evento_controller_1.listarEventos)(req, res);
});
/**
 * @swagger
 * /eventos/passados:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Lista os eventos que já aconteceram
 *     responses:
 *       200:
 *         description: Lista de eventos passados retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Palestra de Tecnologia"
 *                   data_inicio:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-20T14:00:00.000Z"
 *                   criador:
 *                     type: object
 *                     properties:
 *                       nome:
 *                         type: string
 *                         example: "Ana"
 *                       sobrenome:
 *                         type: string
 *                         example: "Souza"
 *                       tipo:
 *                         type: string
 *                         example: "organizador"
 *                       email:
 *                         type: string
 *                         example: "ana@evento.com"
 *                   inscricoes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         usuario:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 4
 *                             nome:
 *                               type: string
 *                               example: "Pedro"
 *                   imagens:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: "https://exemplo.com/foto.jpg"
 *                         ordem:
 *                           type: integer
 *                           example: 1
 *                   destaques:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         aluno:
 *                           type: object
 *                           properties:
 *                             nome:
 *                               type: string
 *                               example: "Luana"
 *                             sobrenome:
 *                               type: string
 *                               example: "Martins"
 *                             email:
 *                               type: string
 *                               example: "luana@exemplo.com"
 *                   comentarios:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         usuario:
 *                           type: object
 *                           properties:
 *                             foto_perfil:
 *                               type: string
 *                               example: "https://exemplo.com/foto.jpg"
 *                             tipo:
 *                               type: string
 *                               example: "aluno"
 *                         comentarios:
 *                           type: string
 *                           example: "O evento estava bom."
 */
router.get("/passados", (req, res) => {
    (0, evento_controller_1.listarEventosPassados)(req, res);
});
/**
 *
 * @swagger
 * /eventos/{id}:
 *   get:
 *     tags:
 *       - Eventos
 *     summary: Buscar informações do evento
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Informações do evento retornado com sucesso
 */
router.get("/:id", (req, res) => {
    (0, evento_controller_1.buscarEvento)(req, res);
});
exports.default = router;
