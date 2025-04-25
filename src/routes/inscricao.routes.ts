import { Request, Response, Router } from "express";
import {
  criarInscricao,
  atualizarInscricao,
  listarInscricoes,
} from "../controllers/inscricao.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Inscrição no Evento
 *     description: Operações relacionadas as inscrições em eventos
 *
/**
 * @swagger
 * /inscricao:
 *   post:
 *     tags:
 *       - Inscrição no Evento
 *     summary: Cria uma nova inscrição
 *     description: Cria uma nova inscrição num evento no sistema.
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
 *               data_inscricao:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [confirmado, pendente, cancelado]
 *                 default: confirmado
 *     responses:
 *       200:
 *         description: Inscrição criada com sucesso
 *       500:
 *         description: Erro ao criar inscrição
 */

router.post("/", (req: Request, res: Response) => {
  criarInscricao(req, res);
});

/**
 *
 * @swagger
 * /inscricao/{id}:
 *   put:
 *     tags:
 *       - Inscrição no Evento
 *     summary: Atualiza uma inscrição existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integereger
 *         required: true
 *         description: ID da incricao
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
 *               data_inscricao:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [confirmado, pendente, cancelado]
 *                 default: confirmado
 *     responses:
 *       200:
 *         description: Inscrição atualizada com sucesso
 *       404:
 *         description: Inscrição não atualizada
 */

router.put("/:id", (req: Request, res: Response) => {
  atualizarInscricao(req, res);
});

/**
 * @swagger
 * /inscricao:
 *   get:
 *     tags:
 *       - Inscrição no Evento
 *     summary: Lista todas as inscrições
 *     responses:
 *       200:
 *         description: Lista de inscrições retornada com sucesso
 */
router.get("/", (req: Request, res: Response) => {
  listarInscricoes(req, res);
});

export default router;
