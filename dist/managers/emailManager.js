"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const emailManager = async (to, text, subject) => {
    var transport = (0, nodemailer_1.createTransport)({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9ad099d3e38959",
            pass: "a2f42b6e497f71",
        },
    });
    await transport.sendMail({
        //sending mail to mailtrap
        to: to,
        from: "info@expensetracker.com",
        text: text,
        subject: subject,
    });
};
exports.default = emailManager;
