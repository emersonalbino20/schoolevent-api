import { Request, Response, Router } from "express";
import { loginUsuario } from "./../controllers/login.controller";

const router = Router();

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
router.post("/", (req: Request, res: Response) => {
  loginUsuario(req, res);
});
export default router;
