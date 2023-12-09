# RepoSearch

## App Setup

- You need to generate a GitHub personal access token to use the GitHub GraphQL api. On a classic token set scope: public_repo
- This token needs to be added to a .env.local file as `VITE_GITHUB_API_TOKEN=`

## Notes

- First time setting up a GraphQL client
- First time using MaterialUI (Vuetify experience helps)
- Starting with a small component and working up in scale is a good way to learn the lib
- Chose Emotion due to warning that styled components aren't compatible with server-rendering; as various personal projects use Next I wanted to take the chance to learn MUI's reccomended option
- React Router has a ton more options than last time (Next = lazy routing win!)
- Cursor vs. offset based pagination vs. ui design choices... really great bit of learning 👍
- MUI styling is a mess of built-in and overrides, would need more time studying / using the lib within existing project standards to internalise everything

## TODOs:

- Remove default css files
- Figure out how to have nice import aliasing for @components, @contexts etc. Config seems to be a bit different with new vite react-swc-ts template due to use of the newish SWC compiler
- Typing for RepoContext - adding in GraphQL pagination starts to make this type a bit unweildy, find out best practice for typing in GraphQL
- Test build
- Dockerize build

## TOLearns:

- HashRouter, MemoryRouter
- GraphQL API setup
- GraphQL mutations
