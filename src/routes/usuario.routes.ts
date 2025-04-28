import { Request, Response, Router } from "express";
import {
  criarUsuario,
  atualizarUsuario,
  listarUsuarios,
  buscarUsuario,
  buscarMinhasInscricoes,
} from "./../controllers/usuario.controller";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro ao criar usuário
 */
router.post("/", (req: Request, res: Response) => {
  criarUsuario(req, res);
});
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", (req: Request, res: Response) => {
  atualizarUsuario(req, res);
});
/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get("/", (req: Request, res: Response) => {
  listarUsuarios(req, res);
});

/**
 *
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Buscar informações do usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações do usuário retornado com sucesso
 */
router.get("/:id", (req: Request, res: Response) => {
  buscarUsuario(req, res);
});

/**
 *
 * @swagger
 * /usuarios/{usuario_id}/inscricoes:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Buscar informações das inscrições em eventos do usuario
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações das inscrições do usuário retornado com sucesso
 */
router.get("/:usuario_id/inscricoes", (req: Request, res: Response) => {
  buscarMinhasInscricoes(req, res);
});

export default router;
