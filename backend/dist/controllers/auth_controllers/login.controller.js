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
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sign_jwt_utils_1 = require("../../utils/jwt_utils/sign.jwt.utils");
dotenv_1.default.config();
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.userModel.findOne({ email });
        if (!user) {
            throw new Error('invalid email');
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('invalid password');
        }
        (0, sign_jwt_utils_1.signJwtAccessToken)(res, { userId: user._id });
        const { refreshTokenId } = (0, sign_jwt_utils_1.signJwtRefreshToken)(res, user._id);
        user.refreshTokenId = refreshTokenId;
        yield user.save();
        res.status(200).send({
            message: 'Sucessfully logged in',
            user: user._id,
        });
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.userLoginController = userLoginController;
//# sourceMappingURL=login.controller.js.map