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
            service: process.env.NEXT_PUBLIC_EMAIL_SERVICE,
            auth: {
                user: process.env.NEXT_PUBLIC_EMAIL,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
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
            subject: emailType === "VERIFY_USER" ? "Please Verify Your Account" : "Reset Your Password",
            html: renderHtml,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: unknown) {
        console.log("Error sending email", error);
    }
};
