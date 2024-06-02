import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import ForgotPasswordEmail from "./ForgotPassword";
import RegisterEmail from "./RegisterEmail";
import PasswordResetSuccessEmail from "./VerifyForgotPasswordEmail";
import VerifiedEmail from "./VerifyRegistrationEmail";

import LoginEmail from "@/helpers/Email/LoginEmail";
type EmailProps = {
    email: string;
    emailType: string;
    verifyLink?: string;
};
export const sendEmail = async ({ email, emailType, verifyLink }: EmailProps) => {
    try {
        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "ulices25@ethereal.email",
                pass: "C44y7E96THpKHS57pZ",
            },
        });
        let renderHtml = "";
        if (emailType === "LOGIN") {
            renderHtml = render(<LoginEmail username={email} />);
        } else if (emailType === "REGISTER") {
            renderHtml = render(<RegisterEmail username={email} VerifyLink={verifyLink!} />);
        } else if (emailType === "FORGOT_PASSWORD") {
            renderHtml = render(<ForgotPasswordEmail username={email} VerifyLink={verifyLink!} />);
        } else if (emailType === "PASSWORD_RESET_SUCCESS") {
            renderHtml = render(<PasswordResetSuccessEmail username={email} />);
        } else if (emailType === "VERIFIED_EMAIL") {
            renderHtml = render(<VerifiedEmail username={email} />);
        }
        const mailOptions = {
            from: `${process.env.NEXT_PUBLIC_EMAIL!}`,
            to: email,
            subject: emailType === "LOGIN" ? "Login" : emailType === "REGISTER" ? "Register" : emailType === "FORGOT_PASSWORD" ? "Forgot Password" : emailType === "PASSWORD_RESET_SUCCESS" ? "Password Reset Success" : "Verified Email",
            html: renderHtml,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: unknown) {
        console.log("Error sending email", error);
    }
};
