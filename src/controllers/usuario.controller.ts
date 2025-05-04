import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
//import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    // Extrair dados do corpo da requisição
    const { email, nome, sobrenome, senha, tipo } = req.body;

    // Validar campos obrigatórios
    if (!email || !nome || !sobrenome || !senha || !tipo) {
      // Se um arquivo foi enviado, remover o arquivo
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    // Verificar se o email já está em uso
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      // Se um arquivo foi enviado, remover o arquivo
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ erro: "Este email já está cadastrado" });
    }

    // Hash da senha
    //    const hashedSenha = await bcrypt.hash(senha, 10);

    // Preparar dados do usuário
    const dadosUsuario: any = {
      email,
      nome,
      sobrenome,
      senha: senha,
      tipo,
      data_criacao: new Date(),
      ativo: true,
    };

    // Se foi enviada uma foto de perfil, adicionar o caminho
    if (req.file) {
      dadosUsuario["foto_perfil"] = `/uploads/perfil/${req.file.filename}`;
    }

    // Criar o usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: dadosUsuario,
    });

    // Remover a senha do objeto de resposta
    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    // Se ocorreu um erro e um arquivo foi enviado, remover o arquivo
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({
      erro: "Erro ao criar usuário",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    // Buscar o usuário existente
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuarioExistente) {
      // Se um arquivo foi enviado, remover o arquivo
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    // Extrair dados do corpo da requisição
    const { email, nome, sobrenome, senha, tipo, ativo } = req.body;

    // Preparar dados para atualização
    const dadosAtualizacao: any = {};

    // Atualizar apenas os campos fornecidos
    if (email !== undefined) dadosAtualizacao.email = email;
    if (nome !== undefined) dadosAtualizacao.nome = nome;
    if (sobrenome !== undefined) dadosAtualizacao.sobrenome = sobrenome;
    if (tipo !== undefined) dadosAtualizacao.tipo = tipo;
    if (ativo !== undefined)
      dadosAtualizacao.ativo = ativo === "true" || ativo === true;

    /* Se uma nova senha foi fornecida, fazer o hash
    if (senha) {
      dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
    }*/

    // Se foi enviada uma nova foto de perfil
    if (req.file) {
      // Se o usuário já tinha uma foto, remover o arquivo antigo
      if (usuarioExistente.foto_perfil) {
        const caminhoAntigo = path.join(
          process.cwd(),
          usuarioExistente.foto_perfil.replace(/^\//, "")
        );
        if (fs.existsSync(caminhoAntigo)) {
          fs.unlinkSync(caminhoAntigo);
        }
      }

      // Adicionar o caminho da nova foto
      dadosAtualizacao.foto_perfil = `/uploads/perfil/${req.file.filename}`;
    }

    // Atualizar o usuário no banco de dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: userId },
      data: dadosAtualizacao,
    });

    // Remover a senha do objeto de resposta
    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;

    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso",
      usuario: usuarioSemSenha,
    });
  } catch (error) {
    // Se ocorreu um erro e um arquivo foi enviado, remover o arquivo
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({
      erro: "Erro ao atualizar usuário",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};

export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        sobrenome: true,
        tipo: true,
        foto_perfil: true,
        data_criacao: true,
        ultimo_acesso: true,
        ativo: true,
      },
    });

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({
      erro: "Erro ao listar usuários",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};

export const obterUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nome: true,
        sobrenome: true,
        tipo: true,
        foto_perfil: true,
        data_criacao: true,
        ultimo_acesso: true,
        ativo: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    return res.status(500).json({
      erro: "Erro ao obter usuário",
      detalhes: error instanceof Error ? error.message : String(error),
    });
  }
};
/*export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { foto_perfil, nome, sobrenome, email, senha, tipo } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuario?.email) {
      return res.status(404).json({ erro: "o e-mail já está em uso." });
    }

    const novoUsuario = await prisma.usuario.create({
      data: { foto_perfil, nome, sobrenome, email, senha, tipo },
    });

    return res.status(201).json(novoUsuario);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "o e-mail já está em uso.", detalhes: error });
  }
};
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { foto_perfil, nome, sobrenome, email, tipo, senha } = req.body;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { foto_perfil, nome, sobrenome, email, tipo, senha },
    });

    return res.status(201).json(usuarioAtualizado);
  } catch (error) {
    return res
      .status(500)
      .json({ erro: "o email pertence a um outro usuário", detalhes: error });
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
*/
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
