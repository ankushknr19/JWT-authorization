"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, _next) => {
    const errorObject = {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
    };
    res.render('error', { errorObject });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map