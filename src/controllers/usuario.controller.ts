import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, sobrenome, email, senha, tipo } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "o e-mail já está em uso." });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { nome, sobrenome, email, senha, tipo },
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao criar usuário", detalhes: error });
  }
};
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, tipo } = req.body;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, sobrenome, email, senha, tipo },
    });

    return res.status(201).json(usuarioAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao actualizar usuário", detalhes: error });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao listar usuários", detalhes: error });
  }
};

export const buscarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findMany({
      where: { id: Number(id) },
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao buscar o usuário", detalhes: error });
  }
};

export const buscarMinhasInscricoes = async (req: Request, res: Response) => {
  try {
    const { usuario_id } = req.params;
    const usuario = await prisma.inscricao.findMany({
      where: { usuario_id: Number(usuario_id) },
      include: {
        evento: {
          select: {
            id: true,
            titulo: true,
            descricao: true,
            data_inicio: true,
            data_fim: true,
            criador: {
              select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                foto_perfil: true,
                ativo: false,
              },
            },
            local: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            sobrenome: true,
            foto_perfil: true,
          },
        },
      },
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao buscar as inscrições em eventos do usuário",
      detalhes: error,
    });
  }
};
