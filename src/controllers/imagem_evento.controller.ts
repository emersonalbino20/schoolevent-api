import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const criarImagemEvento = async (req: Request, res: Response) => {
  try {
    // Verifica se o upload da pasta existe, caso contrário, cria
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
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
  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    return res.status(500).json({
      erro: "Erro ao criar imagem do evento",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};

export const criarMultiplasImagensEvento = async (
  req: Request,
  res: Response
) => {
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
    const files = req.files as Express.Multer.File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = `/uploads/${file.filename}`;

      // Criar registro no banco de dados
      const novaImagem = await prisma.imagemEvento.create({
        data: {
          evento_id: Number(evento_id),
          url,
          descricao: descricao || "",
          ordem: i + 1,
        },
      });

      imagensCriadas.push(novaImagem);
    }

    return res.status(201).json({
      mensagem: `${imagensCriadas.length} imagens do evento criadas com sucesso`,
      imagens: imagensCriadas,
    });
  } catch (error) {
    console.error("Erro ao salvar imagens:", error);
    return res.status(500).json({
      erro: "Erro ao criar imagens do evento",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};

export const atualizarImagemEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url, descricao } = req.body;

    const imagemEventoAtualizado = await prisma.imagemEvento.update({
      where: { id: Number(id) },
      data: { url, descricao },
    });

    return res.status(201).json(imagemEventoAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar a imagem do evento", detalhes: error });
  }
};

export const listarImagemEventos = async (req: Request, res: Response) => {
  try {
    const imagensEvento = await prisma.imagemEvento.findMany();
    return res.status(200).json(imagensEvento);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar as imagens do eventos", detalhes: error });
  }
};
