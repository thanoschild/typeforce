import nodemailer from "nodemailer";
import { AUTH_VERIFICATION_LINK } from "@/constants";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function verificationEmailBody(token: string) {
  const confirmLink = `${AUTH_VERIFICATION_LINK}?token=${token}`;
  return `
   <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your TypeFast account</title>
        </head>
        <body style="background-color: #171717; color: #e5e5e5; font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: rgba(23, 23, 23, 0.5); border: 1px solid #404040; border-radius: 8px; padding: 32px; margin: 20px;">
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 16px;">
                Welcome to TypeFast
              </h1>
              <p style="color: #a3a3a3; font-size: 16px; line-height: 24px; text-align: center; margin-bottom: 24px;">
                Thanks for signing up! Please verify your email address to get started.
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${confirmLink}" 
                   style="display: inline-block; background-color: #34D399; color: #e5e5e5; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background-color 0.2s;">
                  Verify Email Address
                </a>
              </div>
              <p style="color: #737373; font-size: 14px; text-align: center; margin-top: 24px;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
      `;
}

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your TypeTest account",
      html: verificationEmailBody(token),
    };

    const info = await transporter.sendMail(mailOptions);
    return { sucess: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};
