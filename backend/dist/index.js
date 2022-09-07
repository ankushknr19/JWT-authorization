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
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '2mb' }));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
(0, db_connect_1.connectDB)();
app.use('/api/auth', auth_routes_1.default);
app.get('/', (_req, res) => {
    res.send('api is running...');
});
app.use((_req, _res, next) => {
    next(new Error('not found'));
});
app.use(errorHandler_1.errorHandler);
try {
    app.listen(env_1.PORT, () => console.log(`server is running on port http://localhost:${env_1.PORT}....`));
}
catch (error) {
    console.log('error during server connection');
    process.exit();
}
exports.default = app;
//# sourceMappingURL=index.js.map