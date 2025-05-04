import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarComentario = async (req: Request, res: Response) => {
  try {
    const { usuario_id, evento_id, texto } = req.body;

          // Verificar se o email já está em uso
      const usuarioExistente = await prisma.comentario.findUnique({
        where: { usuario_id },
      });

      if (usuarioExistente) {
        return res.status(400).json({ erro: "Apenas é permitido um comentário" });
      }

    const novoComentario = await prisma.comentario.create({
      data: {
        usuario_id,
        evento_id,
        texto,
      },
    });

    return res.status(201).json(novoComentario);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar Comentario", detalhes: error });
  }
};

export const atualizarComentario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { usuario_id, evento_id, texto } = req.body;

    const ComentarioAtualizado = await prisma.comentario.update({
      where: { id: Number(id) },
      data: {
        usuario_id,
        evento_id,
        texto,
      },
    });

    return res.status(201).json(ComentarioAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar Comentario", detalhes: error });
  }
};

export const listarComentarios = async (req: Request, res: Response) => {
  try {
    const comentarios = await prisma.comentario.findMany();
    return res.status(200).json(comentarios);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar Comentarios", detalhes: error });
  }
};
