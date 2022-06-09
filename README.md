# todo-app-nextjs

Demo [HERE](https://todo-app-nextjs-d1ql6i88e-adrianescat.vercel.app/)

_The link can change because of vercel automated builds. Look for Vercel comments in the main thread to find the last URL_

The Front-end application is located in `/todo-app-fe`

## About the FE application

This a Next.js application using `12.1.6` version, _DESKTOP_ oriented

To install it locally you will require:

- node `v16.14.0` (used to develop the app)
- yarn `1.22.18` (used to develop the app)

The following comands will run the application as it's run in `PROD` (demo link above)

```bash
> cd todo-app-fe/
> yarn install
> yarn build
> yarn start
```

If you want to run the app in `DEV` mode you will need to run:

```bash
> cd cd todo-app-fe/
> yarn install
> yarn dev
```
You will also need to run the Back-end if you choose `DEV` mode, you can find it here: [https://github.com/higo-app/task-manager-api](https://github.com/higo-app/task-manager-api)

_You may need to change the port to something else than `3000` (that is the default port for Next.js apps). See the `puma.rb` file_

## Appication characteristics

- Next.js `v12.1.6`
- React.js `v18.1.0`
- TypeScript `v4.7.3`
- Prettier `v^2.6.2`
- Eslint `v^8.17.0`
- Recoil ([state management library](https://recoiljs.org/))
- Styled components ([CSS-In-JS](https://styled-components.com/))
- Ant Design Icons ([Modular SVG icons](https://ant.design/components/icon/))
- dotenv (Environmental variables)

## Design & Architectural decisions

- Using `dotenv` and Next.js `publicRuntimeConfig` to easily handle multiple environenments
- Using Typescript, Node.js Typescript. You can see clear defined types in `src/types`, interfaces for components `Props` and typed API responses
- I use `recoil` as the state management library. Organizing correctly the domains in the `src/store` folder. I use `recoil-persist` too so the data is cached between browser reloads
- I organized data fetching logic and domains with services, they are reusable. See `src/services`
- `/pages` contains the pages created by the Next.js router, `src/PagesComponents` contains the real HTML for each page. This way I can separate SSR logic from the page content itself
- The rest of the components are located in `src/components`. I tried to create them the most _atomic_ possible
- I'm using React `Portal` [docs here](https://reactjs.org/docs/portals.html#gatsby-focus-wrapper). So modals, popups or tooltips can be handled easily without css issues, `z-index` issues and so on.
- functional components and hooks


### Backlog (Improvements)

- Add Jest and Enzyme to test components, config to get coverage too. Components without logic can be tested just with snapshots
- Better error handling related to API responses, some toast notification could look very nice, even for successful calls
- CSS responsiveness
- Tasks' due-date field is supported but not used, the `moment` library was installed. We can use that to show dates and tinme remaining to complete tasks

### Errors found in the Back-End

- The BE does not allow to create Tasks or Collections with the same name, even if they are from different users. That generates some bugs while using the app
- The `UPDATE` method for Tasks does not work 
