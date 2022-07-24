"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controllers/session.controller");
const validateResource_1 = require("../middlewares/validateResource");
const session_schema_1 = require("../schemas/session.schema");
const router = express_1.default.Router();
router.route('/').post((0, validateResource_1.validate)(session_schema_1.loginUserSchema), session_controller_1.userLogin);
exports.default = router;
//# sourceMappingURL=session.routes.js.map