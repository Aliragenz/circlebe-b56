"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_errors_1 = require("../errors/custom-errors");
const errorHandler = (err, req, res, next) => {
    // Handled errors
    if (err instanceof custom_errors_1.CustomError) {
        const { statusCode, errors, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }
        return res.status(statusCode).send({ errors });
    }
    // Unhandled errors
    console.error(JSON.stringify(err, null, 2));
    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
exports.errorHandler = errorHandler;
