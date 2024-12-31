import nodemailer from "nodemailer";
export const nodeMailerConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "abuzardawar444@gmail.com",
    pass: process.env.MY_PASSWORD,
  },
};
