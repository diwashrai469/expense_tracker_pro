"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    if (!error) {
        next();
    }
    if (error.message) {
        console.log(error);
        res.status(400).json({
            status: "failed",
            error: error.message,
        });
        return;
    }
    res.status(400).json({
        status: "Failed",
        error: error,
    });
};
exports.default = errorHandler;
