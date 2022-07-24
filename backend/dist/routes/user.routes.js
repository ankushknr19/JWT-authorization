"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyUser_1 = require("../middlewares/verifyUser");
const router = express_1.default.Router();
router.route('/profile').get(verifyUser_1.verifyUser, (_req, res) => {
    var _a;
    res.status(200).send(`welcome user ${(_a = res.locals.user) === null || _a === void 0 ? void 0 : _a.userId}`);
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map