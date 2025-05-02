import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarInscricao = async (req: Request, res: Response) => {
  try {
    const { usuario_id, evento_id, data_inscricao, status } = req.body;

    const novaInscricao = await prisma.inscricao.create({
      data: { usuario_id, evento_id, data_inscricao, status },
    });

    return res.status(201).json(novaInscricao);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar inscrição", detalhes: error });
  }
};

export const atualizarInscricao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuario_id, evento_id, data_inscricao, status } = req.body;

    const inscricaoAtualizado = await prisma.inscricao.update({
      where: { id: Number(id) },
      data: { usuario_id, evento_id, data_inscricao, status },
    });

    return res.status(201).json(inscricaoAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar a inscrição", detalhes: error });
  }
};

export const listarInscricoes = async (req: Request, res: Response) => {
  try {
    const inscricoes = await prisma.inscricao.findMany();
    return res.status(200).json(inscricoes);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar as inscrições", detalhes: error });
  }
};
