import { Request, Response, Router } from "express";
import {
  criarUsuario,
  atualizarUsuario,
  listarUsuarios,
  buscarUsuario,
  buscarMinhasInscricoes,
} from "./../controllers/usuario.controller";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Certifique-se de que o diretório upload/perfil existe
const uploadDir = path.join(process.cwd(), "uploads", "perfil");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "perfil-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Somente imagens são permitidas!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // limite de 5MB por arquivo
  },
});

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário com foto de perfil opcional
 *     description: Cadastra um novo usuário no sistema, com opção de enviar foto de perfil.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               senha:
 *                 type: string
 *                 format: password
 *               tipo:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR, ADMINISTRADOR]
 *             required:
 *               - email
 *               - nome
 *               - sobrenome
 *               - senha
 *               - tipo
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *       500:
 *         description: Erro ao criar o usuário
 */
router.post(
  "/",
  upload.single("foto_perfil"),
  (req: Request, res: Response) => {
    criarUsuario(req, res);
  }
);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza um usuário existente
 *     description: Atualiza dados do usuário, incluindo foto de perfil opcional.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto_perfil:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               senha:
 *                 type: string
 *                 format: password
 *               tipo:
 *                 type: string
 *                 enum: [ALUNO, PROFESSOR, ADMINISTRADOR]
 *               ativo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put(
  "/:id",
  upload.single("foto_perfil"),
  (req: Request, res: Response) => {
    atualizarUsuario(req, res);
  }
);

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
