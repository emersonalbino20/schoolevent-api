import { Request, Response, Router } from "express";
import {
  criarFeedback,
  atualizarFeedback,
  listarFeedbacks,
  buscarFeedbacksPorUsuario,
  buscarFeedbacksPorProfessor,
} from "../controllers/feedback.controller";

const router = Router();

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
router.post("/", (req: Request, res: Response) => {
  criarFeedback(req, res);
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
router.put("/:id", (req: Request, res: Response) => {
  atualizarFeedback(req, res);
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
router.get("/", (req: Request, res: Response) => {
  listarFeedbacks(req, res);
});

/**
 *
 * @swagger
 * /feedbacks/{usuario_id}:
 *   get:
 *     tags:
 *       - Feedbacks
 *     summary: Busca todos os feedbacks recebidos por um aluno específico
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Informações do feedback do usuário retornado com sucesso
 */
router.get("/:usuario_id", (req: Request, res: Response) => {
  buscarFeedbacksPorUsuario(req, res);
});

/**
 *
 * @swagger
 * /feedbacks/professor/{professor_id}:
 *   get:
 *     tags:
 *       - Feedbacks
 *     summary: Busca todos os feedbacks dados para um aluno específico
 *     parameters:
 *       - in: path
 *         name: professor_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Informações do feedback do professor retornado com sucesso
 */
router.get("/professor/:professor_id", (req: Request, res: Response) => {
  buscarFeedbacksPorProfessor(req, res);
});

export default router;
