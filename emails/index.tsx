import * as React from "react";
import { Body, Container, Head, Heading, Html, Preview, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
    VerifyLink: string;
    type?: string;
};

export default function RegisterEmail(props: props) {
    const { username } = props;
    return (
        <Html lang="en">
            <Head />
            <Preview>Login Alert: Your Account Accessed</Preview>
            <Tailwind>
                <Html lang="en">
                    <Head>
                        <title>Login Alert: Your Account Accessed</title>
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
                            <Heading className="dark:text-white text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Login Alert: Your Account Accessed</Heading>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                                Hi <strong>{username || "Unknown"}</strong>,
                            </Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">We noticed a recent login to your account . If this was you, no further action is needed.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">If you didn&apos;t authorize this login, please review your account activity immediately by logging in and checking your recent sessions.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">For your account&apos;s security, we recommend changing your password</Text>
                        </Container>
                    </Body>
                </Html>
            </Tailwind>
        </Html>
    );
}
