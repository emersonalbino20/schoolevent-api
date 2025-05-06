import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarComentario = async (req: Request, res: Response) => {
  try {
    const { usuario_id, evento_id, texto } = req.body;

    /* Verificar se o comentário já foi dado
      const usuarioExistente = await prisma.comentario.findUnique({
        where: { usuario_id },
      });

      if (usuario_id == usuarioExistente.usuario_id && evento_id == usuarioExistente.evento_id) {
        return res.status(400).json({ erro: "Apenas é permitido um comentário" });
      }*/

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

export const buscarComentariosPorUsuario = async (
  req: Request,
  res: Response
) => {
  try {
    const { usuario_id } = req.params;

    // Verifica se o ID do usuário foi fornecido
    if (!usuario_id) {
      return res.status(400).json({ erro: "ID do usuário é obrigatório" });
    }

    const comentarios = await prisma.comentario.findMany({
      where: {
        usuario_id: Number(usuario_id),
      },
      select: {
        id: true,
        texto: true,
        data_criacao: true,
        evento: {
          select: {
            titulo: true,
          },
        },
      },
      orderBy: {
        data_criacao: "desc",
      },
    });

    // Formata a resposta para simplificar a estrutura
    const comentariosFormatados = comentarios.map((comentario) => ({
      id: comentario.id,
      texto: comentario.texto,
      data_criacao: comentario.data_criacao,
      evento_titulo: comentario.evento.titulo,
    }));

    return res.status(200).json(comentariosFormatados);
  } catch (error) {
    console.error("Erro detalhado:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar comentarios do usuário", detalhes: error });
  }
};
