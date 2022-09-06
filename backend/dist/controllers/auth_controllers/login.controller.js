"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginController = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../../models/user.model");
const sign_jwt_utils_1 = require("../../utils/jwt_utils/sign.jwt.utils");
const login_schema_1 = require("../../schemas/auth_schemas/login.schema");
const userLoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield login_schema_1.userLoginSchema.validateAsync(req.body);
        const { email, password } = result;
        const user = yield user_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new http_errors_1.default.BadRequest('User not registered');
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            throw new http_errors_1.default.Unauthorized('Invalid email/password');
        }
        yield (0, sign_jwt_utils_1.signAccessTokenAsync)(res, {
            userId: user._id,
        });
        const { refreshTokenId } = yield (0, sign_jwt_utils_1.signRefreshTokenAsync)(res, user._id);
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        res.status(200).send({
            message: 'Sucessfully logged in',
            user: user._id,
            role: user.role,
        });
    }
    catch (error) {
        if (error.isJoi) {
            return next(new http_errors_1.default.BadRequest('Invalid email/password'));
        }
        next(error);
    }
});
exports.userLoginController = userLoginController;
//# sourceMappingURL=login.controller.js.map