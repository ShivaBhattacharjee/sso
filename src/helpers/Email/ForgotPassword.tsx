import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
    VerifyLink: string;
};

export default function ForgotPasswordEmail(props: props) {
    const { username, VerifyLink } = props;
    return (
        <Html lang="en">
            <Head />
            <Preview> Reset Your Password</Preview>
            <Tailwind>
                <Html lang="en">
                    <Head>
                        <title>Reset Your Password</title>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                        <meta name="x-apple-disable-message-reformatting" />
                        <meta name="format-detection" content="telephone=no" />
                        <meta name="format-detection" content="date=no" />
                        <meta name="format-detection" content="address=no" />
                        <meta name="format-detection" content="email=no" />
                    </Head>
                    <Body className="dark:bg-black dark:text-white text-black bg-white my-auto mx-auto font-sans">
                        <Container className="border border-solid dark:border-[#eaeaea] border-black/50 rounded my-[40px] mx-auto p-[20px] w-[465px]">
                            <Heading className="dark:text-white text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Reset Your Password</Heading>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                                Hi <strong>{username || "Unknown"}</strong>,
                            </Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">We received a request to reset your password. Please click the button below to set a new password for your account.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">For security reasons, this link will expire in 3 hours</Text>
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button className=" p-4 bg-blue-600 rounded text-white text-[12px] font-semibold no-underline text-center" href={VerifyLink}>
                                    Reset Password
                                </Button>
                            </Section>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                                or copy and paste this URL into your browser:{" "}
                                <Link href={VerifyLink} className="text-purple-600 no-underline">
                                    {VerifyLink}
                                </Link>
                            </Text>
                        </Container>
                    </Body>
                </Html>
            </Tailwind>
        </Html>
    );
}
