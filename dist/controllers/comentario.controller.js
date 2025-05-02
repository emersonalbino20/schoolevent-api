"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarComentarios = exports.atualizarComentario = exports.criarComentario = void 0;
const prisma_1 = require("../config/prisma");
const criarComentario = async (req, res) => {
    try {
        const { usuario_id, evento_id, texto } = req.body;
        const novoComentario = await prisma_1.prisma.comentario.create({
            data: {
                usuario_id,
                evento_id,
                texto,
            },
        });
        return res.status(201).json(novoComentario);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao criar Comentario", detalhes: error });
    }
};
exports.criarComentario = criarComentario;
const atualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, evento_id, texto } = req.body;
        const ComentarioAtualizado = await prisma_1.prisma.comentario.update({
            where: { id: Number(id) },
            data: {
                usuario_id,
                evento_id,
                texto,
            },
        });
        return res.status(201).json(ComentarioAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar Comentario", detalhes: error });
    }
};
exports.atualizarComentario = atualizarComentario;
const listarComentarios = async (req, res) => {
    try {
        const comentarios = await prisma_1.prisma.comentario.findMany();
        return res.status(200).json(comentarios);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar Comentarios", detalhes: error });
    }
};
exports.listarComentarios = listarComentarios;
