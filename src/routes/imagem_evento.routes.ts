import { Request, Response, Router } from "express";
import {
  criarImagemEvento,
  atualizarImagemEvento,
  listarImagemEventos,
} from "../controllers/imagem_evento.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Imagem do Evento
 *     description: Operações relacionadas as imagens dos eventos
 */
/**
 * @swagger
 * /evento-imagem:
 *   post:
 *     tags:
 *       - Imagem do Evento
 *     summary: Cria uma nova imagem do evento
 *     description: Cria uma nova imagem evento no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evento_id:
 *                 type: int
 *               url:
 *                 type: string
 *               descricao:
 *                 type: string
 *               ordem:
 *                 type: int
 *     responses:
 *       200:
 *         description: Imagem do evento criado com sucesso
 *       500:
 *         description: Erro ao criar a imagem do evento
 */
router.post("/", (req: Request, res: Response) => {
  criarImagemEvento(req, res);
});

/**
 *
 * @swagger
 * /evento-imagem/{id}:
 *   put:
 *     tags:
 *       - Imagem do Evento
 *     summary: Atualiza uma imagem do evento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da imagem do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evento_id:
 *                 type: int
 *               url:
 *                 type: string
 *               descricao:
 *                 type: string
 *               ordem:
 *                 type: int
 *     responses:
 *       200:
 *         description: Imagem do evento atualizado com sucesso
 *       404:
 *         description: Imagem do Evento não atualizado
 */
router.put("/:id", (req: Request, res: Response) => {
  atualizarImagemEvento(req, res);
});
/**
 * @swagger
 * /evento-imagem:
 *   get:
 *     tags:
 *       - Imagem do Evento
 *     summary: Lista todas as imagens do evento
 *     responses:
 *       200:
 *         description: Lista de imagens do evento retornada com sucesso
 */
router.get("/", (req: Request, res: Response) => {
  listarImagemEventos(req, res);
});

export default router;
