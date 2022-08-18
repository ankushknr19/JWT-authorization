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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = (0, redis_1.createClient)();
            yield client.connect();
            client.on('connect', () => {
                console.log('Client connected to redis...');
            });
            client.on('ready', () => {
                console.log('Redis ready to use');
            });
            client.on('error', (error) => {
                console.log(error.message);
            });
            client.on('end', () => {
                console.log('client disconnected from redis');
            });
            process.on('SIGINT', () => {
                client.quit();
            });
        }
        catch (error) {
            console.log('error during inital connection to redis');
        }
    });
}
exports.connectRedis = connectRedis;
//# sourceMappingURL=init.redis.js.map