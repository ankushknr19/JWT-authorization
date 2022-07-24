"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (_req, res, next) => {
    const user = res.locals.user;
    if (!user) {
        return res.status(401).send('unauathorized, invalid token');
    }
    return next();
};
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.js.map