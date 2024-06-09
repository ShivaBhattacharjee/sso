import { Body, Button, Container, Head, Heading, Html, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
    VerifyLink: string;
};

export default function RegisterEmail(props: props) {
    const { username, VerifyLink } = props;
    return (
        <Html lang="en">
            <Head />
            <Preview>Please Verify Your Account </Preview>
            <Tailwind>
                <Html lang="en">
                    <Head>
                        <title>Just One More Step: Verify Your Email </title>
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
                            <Heading className="dark:text-white text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">Verify Your Email Address</Heading>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">
                                Hi <strong>{username || "Unknown"}</strong>,
                            </Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">Welcome aboard! Before you can dive into everything, we just need to verify your email address.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">To complete your registration, please click the button below to confirm your email.</Text>
                            <Text className="dark:text-white text-black text-[14px] leading-[24px]">For security reasons, this link will expire in 3 hours</Text>
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button className=" p-4 bg-blue-600 rounded text-white text-[12px] font-semibold no-underline text-center" href={VerifyLink}>
                                    Verify Email
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
