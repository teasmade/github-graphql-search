# RepoSearch

A small React (Vite - Typescript - SWC) / GraphQL app to search Github repositories.

Favorites / ratings are demo functionality - they won't persist between sessions.

You can test the app at https://repo-search.teallen.com

## Requirements

- Node.js version 18+
- Docker / Docker Compose if desired for deployment

## Setup

- Clone this repo
- Install dependencies from the project root `npm install`
- You need to generate a GitHub personal access token to use the GitHub GraphQL api
- You can do this at https://github.com/settings/tokens
- Use a "classic" token and set its scope to `public_repo`
- This token needs to be added to a `.env.local` file on the project root as `VITE_GITHUB_API_TOKEN=`

### Development

- Run the app using `npm run dev` and access it on `http://localhost:5173/` for development with hot reloading, React strictmode etc.

### Production

- Build the app using `npm run build` then `npm run preview` to serve it on `http://localhost:4173/`

### Deployment with Docker Compose

- Add a `.env` file on the project root with the variable `CONTAINERIZED=true`
- Build and mount the Dockerized app with `sudo docker compose up -d --build repo-search` , access it on `http://localhost:4173/`
- The demo app is deployed on an OVH vps (LetsEncrypt for wildcard https on subdomains, Apache reverse proxy to the app container)

## NextSteps

- User auth / accounts (probably Clerk for quick setup)
- Favorites / ratings save to db (probably Prisma / Postgres)

## Personal Notes

- First time setting up a GraphQL client
- First time using MaterialUI (Vuetify experience helped, MUI seems more modular and deeply featured)
- React Router has new options / ways of routing - went with closest to what I knew (recent React has been with Next enforcing routing setup...)
- Setback with cursor vs. offset based pagination, ui design choices for search... ended up being a really great bit of learning 👍
- MUI styling is a bit of a mess of built-in and overrides, need more time studying / using the lib within existing project standards to internalise everything

## TODOs:

- Figure out how to have nice import aliasing for @components, @contexts etc. Config seems to be a bit different with new vite react-swc-ts template due to use of the newish SWC compiler
- Typing organisation for RepoContext and the core query... find out best practices for query org / typing in GraphQL as projects grow

## TOLearns:

- ReactRouter > HashRouter, MemoryRouter
- GraphQL API setup, mutations &++
