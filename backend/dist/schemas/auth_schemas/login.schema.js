"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = void 0;
const zod_1 = require("zod");
exports.userLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Not a valid email'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6, 'assword should be of at least 6 characters'),
    }),
});
//# sourceMappingURL=login.schema.js.map