import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarDestaque = async (req: Request, res: Response) => {
  try {
    const { aluno_id, evento_id, motivo, criado_por } = req.body;

    const novoDestaque = await prisma.destaque.create({
      data: {
        aluno_id,
        evento_id,
        motivo,
        criado_por,
      },
    });

    return res.status(201).json(novoDestaque);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar Destaque", detalhes: error });
  }
};

export const atualizarDestaque = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { aluno_id, evento_id, motivo, criado_por } = req.body;

    const DestaqueAtualizado = await prisma.destaque.update({
      where: { id: Number(id) },
      data: {
        aluno_id,
        evento_id,
        motivo,
        criado_por,
      },
    });

    return res.status(201).json(DestaqueAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar Destaque", detalhes: error });
  }
};

export const listarDestaques = async (req: Request, res: Response) => {
  try {
    const destaques = await prisma.destaque.findMany();
    return res.status(200).json(destaques);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar Destaques", detalhes: error });
  }
};

export const buscarDestaque = async (req: Request, res: Response) => {
  try {
    const { evento_id } = req.params;
    const destaques = await prisma.destaque.findMany({
      where: { evento_id: Number(evento_id) },
    });
    return res.status(200).json(destaques);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar o destaque", detalhes: error });
  }
};
