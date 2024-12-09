# Secret Santa

<p style="text-align: center">
<span>
<img width="45%" alt="pair preference" src="https://user-images.githubusercontent.com/8960757/206277890-c6f5b694-224e-4c61-a340-75f3d7bd06fa.png" />
</span>

<span>
<img width="45%" alt="pair-success" src="https://user-images.githubusercontent.com/8960757/206277896-e5009666-d3b0-4bf3-9d42-7eaa0757d6b5.png" />
</span>
</p>


So you wanna host a lovefeast, however participants need to dip and select their pairs randomly, as well as secretly. No one is supposed to know another person's pair.
This App is built with NextJs and uses Airtable as the Database.

- Users can set a secret code
- Users can Generate their pair randomly (using some lodash helpers)
- Users can Generate Random Pairs only (3times) to avoid abuse.




https://user-images.githubusercontent.com/8960757/206277873-b61d5923-c4ff-482d-821f-dd2f66fe09db.mp4


## Serverless

The APIs are a set of serverless functions, coupled with the delivery of Nextjs on Edge (a.k.a) Vercel and the power of Airtable as a User friendly database. This project was written within 24-hours 😉 So there might be a few edge cases not covered yet within the access and pairing algorithms, coupled with a bunch of if/else :(

## Prerequisites

- You need `git` installed locally
- You need `Nodejs` and `npm` installed
- You need a Code Editor (Vscode, webstorm, Atom) etc

```sh

git clone https://github.com/koolamusic/love-dip
$ cd love-dip
$ npm install && npm run dev

```

## Build and Deploy

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
