import { BadRequestError } from "../errors";
import sendEmail from "./sendEmail";

const sendVerificationEmail = async ({
  username,
  email,
  verificationToken,
  origin,
}: {
  username: string;
  email: string;
  verificationToken: string;
  origin: string;
}) => {
  const verifyEmail = `${origin}/verify?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link:
    <a href="${verifyEmail}">Verify Email</a></p>`;
  try {
    await sendEmail({
      to: email,
      subject: "Email Confirmation",
      html: `<h4>Hello, ${username}</h4>${message}`,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new BadRequestError("Email delivery failed.");
  }
};

export default sendVerificationEmail;
