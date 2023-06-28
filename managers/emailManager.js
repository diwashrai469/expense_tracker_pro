const nodemailer = require("nodemailer");

const emailManager = async (to, text, subject) => {
  var transport = nodemailer.createTransport({
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
module.exports = emailManager;
