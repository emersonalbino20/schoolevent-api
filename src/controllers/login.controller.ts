import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    // 1. Verificar se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // 2. Verificar se a senha está correta
    const senhaCorreta = senha == usuario.senha;
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    return res.status(200).json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "Erro ao fazer login", detalhes: error });
  }
};
