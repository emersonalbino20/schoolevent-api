"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarImagemEventos = exports.atualizarImagemEvento = exports.criarMultiplasImagensEvento = exports.criarImagemEvento = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const criarImagemEvento = async (req, res) => {
    try {
        // Verifica se o upload da pasta existe, caso contrário, cria
        const uploadDir = path_1.default.join(process.cwd(), "uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Verificar se o arquivo foi enviado
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhum arquivo enviado" });
        }
        const { evento_id, descricao, ordem } = req.body;
        // Validar evento_id
        if (!evento_id || isNaN(Number(evento_id))) {
            return res.status(400).json({ erro: "ID de evento inválido" });
        }
        // Construir a URL do arquivo
        const url = `/uploads/${req.file.filename}`;
        // Criar registro no banco de dados
        const novaImagem = await prisma.imagemEvento.create({
            data: {
                evento_id: Number(evento_id),
                url,
                descricao: descricao || "",
                ordem: ordem ? Number(ordem) : 0,
            },
        });
        return res.status(201).json({
            mensagem: "Imagem do evento criada com sucesso",
            imagem: novaImagem,
        });
    }
    catch (error) {
        console.error("Erro ao salvar imagem:", error);
        return res.status(500).json({
            erro: "Erro ao criar imagem do evento",
            detalhes: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.criarImagemEvento = criarImagemEvento;
const criarMultiplasImagensEvento = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        // Verificar se os arquivos foram enviados
        if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
            return res.status(400).json({ erro: "Nenhum arquivo enviado" });
        }
        const { evento_id, descricao } = req.body;
        // Validar evento_id
        if (!evento_id || isNaN(Number(evento_id))) {
            return res.status(400).json({ erro: "ID de evento inválido" });
        }
        // Array para armazenar todas as imagens criadas
        const imagensCriadas = [];
        // Processar cada arquivo e criar registros no banco
        const files = req.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const url = `/uploads/${file.filename}`;
            // Criar registro no banco de dados
            const novaImagem = await prisma.imagemEvento.create({
                data: {
                    evento_id: Number(evento_id),
                    url,
                    descricao: descricao || "",
                    ordem: i + 1, // Ordem sequencial baseada na ordem dos arquivos
                },
            });
            imagensCriadas.push(novaImagem);
        }
        return res.status(201).json({
            mensagem: `${imagensCriadas.length} imagens do evento criadas com sucesso`,
            imagens: imagensCriadas,
        });
    }
    catch (error) {
        console.error("Erro ao salvar imagens:", error);
        return res.status(500).json({
            erro: "Erro ao criar imagens do evento",
            detalhes: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.criarMultiplasImagensEvento = criarMultiplasImagensEvento;
const atualizarImagemEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, descricao } = req.body;
        const imagemEventoAtualizado = await prisma.imagemEvento.update({
            where: { id: Number(id) },
            data: { url, descricao },
        });
        return res.status(201).json(imagemEventoAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar a imagem do evento", detalhes: error });
    }
};
exports.atualizarImagemEvento = atualizarImagemEvento;
const listarImagemEventos = async (req, res) => {
    try {
        const imagensEvento = await prisma.imagemEvento.findMany();
        return res.status(200).json(imagensEvento);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar as imagens do eventos", detalhes: error });
    }
};
exports.listarImagemEventos = listarImagemEventos;
