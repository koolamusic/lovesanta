# Love Dip x 21

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

To build this project run `npm run build` and deploy to vercel
