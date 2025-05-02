"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const evento_routes_1 = __importDefault(require("./routes/evento.routes"));
const inscricao_routes_1 = __importDefault(require("./routes/inscricao.routes"));
const comentario_routes_1 = __importDefault(require("./routes/comentario.routes"));
const feedback_routes_1 = __importDefault(require("./routes/feedback.routes"));
const destaque_routes_1 = __importDefault(require("./routes/destaque.routes"));
const imagem_evento_routes_1 = __importDefault(require("./routes/imagem_evento.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Configurar a pasta uploads como um diretório de arquivos estáticos
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
// Rota para acessar a documentação do Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Rotas da aplicação
app.use("/usuarios", usuario_routes_1.default);
app.use("/eventos", evento_routes_1.default);
app.use("/evento-imagem", imagem_evento_routes_1.default);
app.use("/inscricao", inscricao_routes_1.default);
app.use("/comentarios", comentario_routes_1.default);
app.use("/feedbacks", feedback_routes_1.default);
app.use("/destaques", destaque_routes_1.default);
app.use("/login", login_routes_1.default);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
