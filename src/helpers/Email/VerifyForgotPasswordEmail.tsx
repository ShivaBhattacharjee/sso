import { Body, Container, Head, Heading, Html, Preview, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
};

export default function PasswordResetSuccessEmail(props: props) {
    const { username } = props;
    return (
        <Html lang="en">
            <Head />
            <Preview>Password Reset Successful</Preview>
            <Tailwind>
                <Html lang="en">
                    <Head>
                        <title>Password Reset Successful</title>
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
                            <Heading className="dark:text-white text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Password Reset Successful</Heading>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                                Hi <strong>{username || "User"}</strong>,
                            </Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">We wanted to let you know that your password has been successfully reset.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">You can now log in to your account using your new password.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">For additional security, consider enabling two-factor authentication if you haven&apos;t already done so.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">Thank you for taking steps to keep your account secure.</Text>
                        </Container>
                    </Body>
                </Html>
            </Tailwind>
        </Html>
    );
}
