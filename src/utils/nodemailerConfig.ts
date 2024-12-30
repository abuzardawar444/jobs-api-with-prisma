import nodemailer from "nodemailer";
export const nodeMailerConfig = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "marques.stokes@ethereal.email",
    pass: "FkYcPKY1nrHcyRRFZU",
  },
});
