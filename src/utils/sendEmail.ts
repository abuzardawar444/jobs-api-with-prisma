import nodemailer from "nodemailer";
import { nodeMailerConfig } from "./nodemailerConfig";
import { BadRequestError, CustomAPIError } from "../errors";

import sgMail from "@sendgrid/mail";

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    // Create transporter using the preconfigured settings from nodemailerConfig
    const transporter = nodemailer.createTransport(nodeMailerConfig);

    // Send the email
    await transporter.sendMail({
      from: `"Abuzardawar" <abuzardawar444@gmail.com>`, // Customize the sender email and name
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", to);
  } catch (error) {
    if (error instanceof CustomAPIError) {
      throw new BadRequestError("Bad request");
    }
    console.log(error);
  }
};

const sendEmailSendGrid = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to, // Change to your recipient
    from: "Abuzar: <abuzardawar444@gmail.com>", // Change to your verified sender
    subject,
    html,
  };
  const info = await sgMail.send(msg);
  return info;
};

export default sendEmail;
