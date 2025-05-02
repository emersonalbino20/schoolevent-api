"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarFeedbacks = exports.atualizarFeedback = exports.criarFeedback = void 0;
const prisma_1 = require("../config/prisma");
const criarFeedback = async (req, res) => {
    try {
        const { professor_id, aluno_id, evento_id, texto, pontuacao } = req.body;
        const novoFeedback = await prisma_1.prisma.feedback.create({
            data: {
                professor_id,
                aluno_id,
                evento_id,
                texto,
                pontuacao,
            },
        });
        return res.status(201).json(novoFeedback);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao criar Feedback", detalhes: error });
    }
};
exports.criarFeedback = criarFeedback;
const atualizarFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { professor_id, aluno_id, evento_id, texto, pontuacao } = req.body;
        const FeedbackAtualizado = await prisma_1.prisma.feedback.update({
            where: { id: Number(id) },
            data: {
                professor_id,
                aluno_id,
                evento_id,
                texto,
                pontuacao,
            },
        });
        return res.status(201).json(FeedbackAtualizado);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao actualizar Feedback", detalhes: error });
    }
};
exports.atualizarFeedback = atualizarFeedback;
const listarFeedbacks = async (req, res) => {
    try {
        const feedbacks = await prisma_1.prisma.feedback.findMany();
        return res.status(200).json(feedbacks);
    }
    catch (error) {
        return res
            .status(500)
            .json({ erro: "Erro ao listar Feedbacks", detalhes: error });
    }
};
exports.listarFeedbacks = listarFeedbacks;
