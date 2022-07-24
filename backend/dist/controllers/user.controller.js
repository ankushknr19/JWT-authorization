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
exports.userRegister = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const checkDB = yield user_model_1.userModel.findOne({ email }).select('email');
        if (checkDB) {
            throw new Error('email already exists');
        }
        const saltRound = parseInt(process.env.SALT_ROUND || '');
        const salt = yield bcrypt_1.default.genSalt(saltRound);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        const newUser = yield user_model_1.userModel.create({
            email,
            password: hashedPassword,
        });
        res.status(200).json(lodash_1.default.omit(newUser.toJSON(), 'password'));
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
exports.userRegister = userRegister;
//# sourceMappingURL=user.controller.js.map