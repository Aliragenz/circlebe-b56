"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const hello_controller_1 = require("./controllers/hello-controller");
const upload_files_1 = require("./middlewares/upload-files");
const errors_1 = require("./middlewares/errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get("/", upload_files_1.uploadFile, hello_controller_1.HelloController);
app.use(errors_1.errorHandler);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
