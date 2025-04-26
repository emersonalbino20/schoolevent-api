import { Request, Response, Router } from "express";
import {
  criarEvento,
  atualizarEvento,
  listarEventos,
} from "../controllers/evento.controller";

const router = Router();

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
router.post("/", (req: Request, res: Response) => {
  criarEvento(req, res);
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
router.put("/:id", (req: Request, res: Response) => {
  atualizarEvento(req, res);
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
router.get("/", (req: Request, res: Response) => {
  listarEventos(req, res);
});

export default router;
