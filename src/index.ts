import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import userRoutes from "./routes/usuario.routes";
import eventRoutes from "./routes/evento.routes";
import eventImageRoutes from "./routes/imagem_evento.routes";
import inscricaoRoutes from "./routes/inscricao.routes";
import comentarioRoutes from "./routes/comentario.routes";
import feedbackRoutes from "./routes/feedback.routes";
import destaqueRoutes from "./routes/destaque.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SchoolEvents",
      version: "1.0.0",
      description: "API para gestão de eventos escolares",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Rota para acessar a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
app.use("/usuarios", userRoutes);
app.use("/eventos", eventRoutes);
app.use("/evento-imagem", eventImageRoutes);
app.use("/inscricao", inscricaoRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/destaques", destaqueRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
