import nodemailer from "nodemailer";
import { AUTH_VERIFICATION_LINK } from "@/constants";
import { APP_NAME } from "@/constants";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function verificationEmailBody(username: string, token: string) {
  const confirmLink = `${AUTH_VERIFICATION_LINK}?token=${token}`;
  return `
   <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Verify Your Email</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #313131; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2b2b2b; padding: 40px; border-radius: 10px;">

              <tr>
                <td align="center" style="padding-bottom: 20px;">
                  <div style="background: #f66e0d; width: 64px; height: 64px; border-radius: 50%; display: inline-block; margin-bottom: 20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 24 24" style="margin: 16px;">
                      <path d="M22 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4zM4 6l8 5 8-5v2l-8 5-8-5V6z"/>
                    </svg>
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding-bottom: 20px; color: #cccccc; font-size: 18px; text-align: center;">
                  Hey, <strong>${username}</strong>
                </td>
              </tr>

              <tr>
                <td style="padding-bottom: 20px; color: #bbbbbb; font-size: 16px; text-align: center;">
                  Welcome to ${APP_NAME}!<br>
                  To complete your registration, please verify your email address by clicking the button below.
                </td>
              </tr>
              
              <tr>
                <td align="center" style="padding-bottom: 30px;">
                  <a href="${confirmLink}"
                    style="background-color: #f66e0d; color: #f5e6c8; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-size: 16px; font-weight: bold; display: inline-block;">
                    Verify Email Address
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding-bottom: 30px; padding-top: 30px; color: #777777; font-size: 14px; text-align: center;">
                  If you didn't create an account, you can safely ignore this email.
                </td>
              </tr>

              <tr>
                <td style="padding: 0 40px;">
                    <div style="border-top: 1px solid #404040; margin: 20px 0;"></div>
                </td>
              </tr>
              
              <tr>
                <td style="padding-top: 10px; color: #666666; font-size: 12px; text-align: center;">
                  Alternatively, you can copy and paste the link below into your browser:
                </td>
              </tr>
              
              <tr>
                <td style="padding-top: 10px; padding-bottom: 30px; font-size: 12px; text-align: center;">
                  <a href="https://monkeytype.com/email-handler?mode=verifyEmail&oobCode=aMJFPSfVg6PhYrWPJ3Mmf-02UhhNdVBs4C3t-oMRRlkAAAGWd_recQ&apiKey=AIzaSyB5m_AnO575kvWriahcF1SFIWp8Fj3gQno&continueUrl=https%3A%2F%2Fmonkeytype.com&lang=en" 
                    style="color: #4da6ff; word-break: break-word;">
                    ${confirmLink}
                  </a>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
      `;
}

export const sendVerificationEmail = async (username: string, email: string, token: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your TypeTest account",
      html: verificationEmailBody(username, token),
    };

    const info = await transporter.sendMail(mailOptions);
    return { sucess: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: ", error);
    throw new Error("Failed to send email");
  }
};
