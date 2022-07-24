"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_connect_1 = require("./utils/db.connect");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const rateLimit_1 = require("./middlewares/rateLimit");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(rateLimit_1.limiter);
(0, db_connect_1.connectDB)();
app.use('/api/auth', auth_routes_1.default);
app.use('/api/me', user_routes_1.default);
app.get('/', (_req, res) => {
    res.send('api is running...');
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}....`));
//# sourceMappingURL=index.js.map