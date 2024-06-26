<a href="https://github.com/ShivaBhattacharjee/SSO">
<p align="center">
    <img src="https://github.com/ShivaBhattacharjee/sso/assets/95211406/8c54dce4-3578-4e91-90b7-d4fe1e5bea63" width="240px"  alt="animetrix logo" align="center">
  </a>
<br/>
  <h3 align="center">SSO</h3>

<div align="center" >




![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
[![Deno](https://github.com/ShivaBhattacharjee/sso/actions/workflows/deno.yml/badge.svg)](https://github.com/ShivaBhattacharjee/sso/actions/workflows/deno.yml)
![jwt token](http://jwt.io/img/badge-compatible.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub repo size](https://img.shields.io/github/repo-size/shivabhattacharjee/sso)


  </div>

  <p align="center">
    A Single Sign-On (SSO) system built with Next.js, PostgreSQL, Prisma, and Tailwind CSS.
    <br/>
    <br/>
    <a href="http://demosso.theshiva.xyz/">View Demo</a>
    .
    <a href="https://github.com/ShivaBhattacharjee/SSO/issues">Report Bug</a>
    .
    <a href="https://github.com/ShivaBhattacharjee/SSO/issues">Request Feature</a>
  </p>
</p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local](#local)
    - [Update allowed domain after cloning](#update-allowed-domain-after-cloning)
    - [Start db through docker](#start-db-through-docker)
  - [Prisma studio](#prisma-studio)
  - [React-Email Dev Mode](#react-email-dev-mode)
- [Usage Demo](#usage-demo)
- [Host your own](#host-your-own)
- [Contributing](#contributing)
  - [Creating A Pull Request](#creating-a-pull-request)
- [Raising an issue](#raising-an-issue)
- [Code of conduct](#code-of-conduct)
- [License](#license)
- [ScreenShots](#screenshots)
  - [Login](#login)
  - [Register](#register)
    - [Visit SSO](#visit-sso)
- [Authors](#authors)

## About The Project
![image](https://github.com/ShivaBhattacharjee/sso/assets/95211406/1ec7a2fd-eb07-4180-be05-9cb478249b4c)


SSO is a Single Sign-On (SSO) system that allows users to seamlessly authenticate across multiple applications using a single set of credentials. Built with Next.js, PostgreSQL, Prisma, and Tailwind CSS, SSO offers a secure and efficient way to manage user authentication.

## Built With

SSO is built using:

* [NextJS](https://nextjs.org)
* [TailwindCSS](https://tailwindcss.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma](https://www.prisma.io/)

## Getting Started

### Prerequisites

<a href="https://git-scm.com/downloads">Git</a> is a distributed version control system used for software development. It allows multiple developers to work on the same codebase simultaneously, keeping track of changes and managing versions. It also enables users to revert changes and collaborate more effectively.

<a href="https://bun.sh/">BunJS</a> is a JavaScript runtime, package manager, test runner, and bundler built from scratch using the Zig programming language. It was designed by Jarred Sumner as a drop-in replacement for Node.js. Bun uses WebKit's JavaScriptCore as the JavaScript engine, unlike Node.js and Deno, which both use V8.

### Installation

### Local
```Rename .env.example to .env.local and fill the required fields```

#### Update allowed domain after cloning

[middleware.ts](https://github.com/ShivaBhattacharjee/sso/blob/main/src/middleware.ts)

Update this function

```bash
const isAllowedDomain = (hostname: string, port: string): boolean => {
    return hostname.endsWith(".theshiva.xyz") || hostname === "theshiva.xyz" || (hostname === "localhost" && (port === "" || port === "3000"));
};
```

```bash
git clone https://github.com/ShivaBhattacharjee/SSO
```
```
cd SSO
```
```
bun install
```

#### Start db through docker

```bash
docker compose up 
```

```
bun migrate:dev
```
```
bun dev
```
Server will start at http://localhost:3000/

### Prisma studio
```
bun prisma:studio
```

### React-Email Dev Mode 

```bash
bun email:dev
```


## Usage Demo

Visit this [REPO](https://github.com/ShivaBhattacharjee/sso-auth-demo) to get a grasp of implementing it in your own project.

## Host your own

* ## Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShivaBhattacharjee%2FSSO)
<br/>
<br/>

* ## Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ShivaBhattacharjee/SSO)
<br/>
<br/>

* ## Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ShivaBhattacharjee/SSO)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/ShivaBhattacharjee/SSO/issues) to discuss it

* Please make sure you check your spelling and grammar.

### Creating A Pull Request

Wanna contribute to SSO?

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request

## Raising an issue

If you're experiencing any problems with SSO, please be sure to review our [issue template](https://github.com/ShivaBhattacharjee/SSO/tree/main/.github/ISSUE_TEMPLATE) before opening a new issue. The template includes a list of questions and prompts that will help us better understand the issue you're experiencing, and it will ensure that we have all of the necessary information to investigate the problem.

We kindly ask that you provide as much detail as possible when submitting an issue, including steps to reproduce the problem, any error messages that you have seen, and any other relevant information. This will help us to identify and fix the issue more quickly.

Thank you for your cooperation, and we look forward to hearing from you!

## Code of conduct

Developers are requested to go through our <a href="https://github.com/ShivaBhattacharjee/SSO/blob/main/CODE_OF_CONDUCT.md">code of conduct</a> thoroughly to maintain a peaceful environment within our project.

## License

Distributed under the Apache License 2.0. See [LICENSE](https://github.com/ShivaBhattacharjee/SSO/blob/main/LICENSE) for more information.

## ScreenShots

### Login
![image](https://github.com/ShivaBhattacharjee/sso/assets/95211406/65a1f562-2525-46ab-a2be-b959e12ba5b7)

### Register
![image](https://github.com/ShivaBhattacharjee/sso/assets/95211406/fc269476-88d1-4dc6-b3be-42181e6dfa35)


#### Visit <a href = "http://demosso.theshiva.xyz/" target="_blank">SSO</a>

## Authors

- **Shiva Bhattacharjee** - [Shiva Bhattacharjee](https://github.com/ShivaBhattacharjee) - *SSO*

See also the list of [contributors](https://github.com/ShivaBhattacharjee/SSO/contributors) who participated in this project.