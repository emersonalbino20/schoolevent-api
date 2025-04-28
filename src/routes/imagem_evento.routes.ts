import { Request, Response, Router } from "express";
import {
  criarImagemEvento,
  criarMultiplasImagensEvento, // Novo controlador
  atualizarImagemEvento,
  listarImagemEventos,
} from "../controllers/imagem_evento.controller";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

// Certifique-se de que o diretório upload existe
const uploadDir = path.join(process.cwd(), "uploads");
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
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
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
 *     description: Cria uma nova imagem evento no sistema, enviando arquivo de imagem.
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *               evento_id:
 *                 type: integer
 *               descricao:
 *                 type: string
 *               ordem:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Imagem do evento criada com sucesso
 *       500:
 *         description: Erro ao criar a imagem do evento
 */
router.post("/", upload.single("imagem"), (req, res) => {
  criarImagemEvento(req, res);
});

/**
 * @swagger
 * /evento-imagem/multiplas:
 *   post:
 *     tags:
 *       - Imagem do Evento
 *     summary: Cria múltiplas imagens do evento
 *     description: Faz upload e cria múltiplas imagens para um evento no sistema (até 10 imagens).
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagens:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               evento_id:
 *                 type: integer
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Imagens do evento criadas com sucesso
 *       400:
 *         description: Dados inválidos ou nenhum arquivo enviado
 *       500:
 *         description: Erro ao criar as imagens do evento
 */
router.post("/multiplas", upload.array("imagens", 10), (req, res) => {
  criarMultiplasImagensEvento(req, res);
});

//router.post("/", upload.single("imagem"), criarImagemEvento);

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
 *               url:
 *                 type: string
 *               descricao:
 *                 type: string
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
