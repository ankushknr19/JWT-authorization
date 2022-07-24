"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
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
//# sourceMappingURL=user.schema.js.map