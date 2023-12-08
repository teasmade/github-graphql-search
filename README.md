# RepoSearch

## App Setup

- You need to generate a GitHub personal access token to use the GitHub GraphQL api. On a classic token set scope: public_repo
- This token needs to be added to a .env.local file as `VITE_GITHUB_API_TOKEN=`

## Notes

- First time setting up a GraphQL client
- First time using MaterialUI (Vuetify experience helps)
- Chose Emotion due to warning that styled components aren't compatible with server-rendering; as various personal projects use Next I wanted to take the chance to learn MUI's reccomended option
- React Router has a ton more options than last time (Next = lazy routing win!)

## TODOs:

- Remove default css files
- Figure out how to have nice import aliasing for @components, @contexts etc. Config seems to be a bit different with new vite react-swc-ts template due to use of the newish SWC compiler

## TOLearns:

- HashRouter, MemoryRouter
- GraphQL API setup
- GraphQL mutations
