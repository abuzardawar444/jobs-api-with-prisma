import sendEmail from "./sendEmail";

const sendResetPasswordEmail = async ({
  passwordToken,
  origin,
  email,
  username,
}: {
  passwordToken: string;
  origin: string;
  email: string;
  username: string;
}) => {
  const resetURL = `${origin}/reset?token=${passwordToken}&email=${email}`;
  const message = `<p>Please reset the password by clicking on the link <a href="${resetURL}">Reset Passwor</a></p>`;
  console.log(resetURL);
  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${username} </h4> ${message}`,
  });
};
export default sendResetPasswordEmail;
