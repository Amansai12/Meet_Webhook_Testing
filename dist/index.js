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
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const ZOOM_SECRET_TOKEN = 'XtcLIeZtQ0aB6uwQJpvnsw';
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post('/webhook/zoom', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plainToken } = req.body;
    if (plainToken) {
        // Generate the encrypted token using HMAC SHA-256
        const encryptedToken = crypto_1.default
            .createHmac('sha256', ZOOM_SECRET_TOKEN)
            .update(plainToken)
            .digest('hex');
        // Respond with the required JSON format
        return res.status(200).json({
            plainToken,
            encryptedToken,
        });
    }
    // Handle regular webhook events (meeting started, ended, etc.)
    console.log('Received Zoom Event:', req.body.event);
    res.status(200).send('Event received');
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
