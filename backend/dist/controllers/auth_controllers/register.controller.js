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
exports.userRegisterController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.default.config();
const userRegisterController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checkDB = yield user_model_1.UserModel.findOne({ email }).select('email');
        if (checkDB) {
            throw new Error('email already exists');
        }
        const saltRound = parseInt(process.env.SALT_ROUND);
        const salt = yield bcrypt_1.default.genSalt(saltRound);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newUser = yield user_model_1.UserModel.create({
            email,
            password: hashedPassword,
        });
        res.status(200).json(lodash_1.default.omit(newUser.toJSON(), 'password'));
    }
    catch (error) {
        next(error);
    }
});
exports.userRegisterController = userRegisterController;
//# sourceMappingURL=register.controller.js.map