# RepoSearch

## App Setup

- Clone this repo
- You need to generate a GitHub personal access token to use the GitHub GraphQL api
- You can do this at (https://github.com/settings/tokens)
- Use a "classic" token and set its scope to `public_repo`
- This token needs to be added to a `.env.local` file on the project root as `VITE_GITHUB_API_TOKEN=`
- Run the app using `npm run dev` and access it on `http://localhost:5173/` for development with hot reloading, React strictmode etc.
- Or build the app using `npm run build` then `npm run preview` to serve it on `http://localhost:4173/`

## Personal Notes

- First time setting up a GraphQL client
- First time using MaterialUI (Vuetify experience helped, MUI seems more modular)
- React Router has new options / ways of routing - went with closest to what I knew (recent React has been with Next enforcing routing...)
- Setback with cursor vs. offset based pagination, ui design choices for search... ended up being a really great bit of learning 👍
- MUI styling is a bit of a mess of built-in and overrides, would need more time studying / using the lib within existing project standards to internalise everything

## TODOs:

- Figure out how to have nice import aliasing for @components, @contexts etc. Config seems to be a bit different with new vite react-swc-ts template due to use of the newish SWC compiler
- Typing for RepoContext and the core query... find out best practice for typing in GraphQL
- Dockerize build

## TOLearns:

- ReactRouter > HashRouter, MemoryRouter
- GraphQL API setup, mutations &++
