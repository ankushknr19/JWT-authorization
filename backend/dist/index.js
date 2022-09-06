"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const db_connect_1 = require("./utils/db.connect");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const winstonLogger_1 = __importDefault(require("./middlewares/winstonLogger"));
const rateLimit_1 = require("./middlewares/rateLimit");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '2mb' }));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(rateLimit_1.limiter);
(0, db_connect_1.connectDB)();
app.use('/api/auth', auth_routes_1.default);
app.use('/api/me', user_routes_1.default);
app.get('/', (_req, res) => {
    res.send('api is running...');
});
app.use((_req, _res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler_1.errorHandler);
try {
    app.listen(env_1.PORT, () => winstonLogger_1.default.info(`server is running on port http://localhost:${env_1.PORT}....`));
}
catch (error) {
    winstonLogger_1.default.error('error during server connection');
    process.exit();
}
exports.default = app;
//# sourceMappingURL=index.js.map