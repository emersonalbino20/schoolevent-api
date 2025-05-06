import { Request, Response, Router } from "express";
import {
  criarComentario,
  atualizarComentario,
  listarComentarios,
  buscarComentariosPorUsuario,
} from "../controllers/comentario.controller";

const router = Router();

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
router.post("/", (req: Request, res: Response) => {
  criarComentario(req, res);
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
router.put("/:id", (req: Request, res: Response) => {
  atualizarComentario(req, res);
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
router.get("/", (req: Request, res: Response) => {
  listarComentarios(req, res);
});

/**
 *
 * @swagger
 * /comentarios/{usuario_id}:
 *   get:
 *     tags:
 *       - Comentarios
 *     summary: Busca todos os comentariosdo usuário
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações do comentário do usuário retornado com sucesso
 */
router.get("/:usuario_id", (req: Request, res: Response) => {
  buscarComentariosPorUsuario(req, res);
});

export default router;
