# elm-pages-starter-fastify
This is an example of using [elm-pages 3.0](https://elm-pages.com) with [Fastify](https://fastify.dev).

See the discussion on elm-pages-v3 adapters at <https://github.com/dillonkearns/elm-pages/discussions/378>

## Fastify Adapter for elm-pages
The Fastify adapter is located in `adapters/fastify/adapter.mjs` plays an important role during the build process. It combines the `elm-pages` renderer, Fastify plugin, and server components, placing them into the `dist-server/` directory. You can find detailed information about `elm-pages` adapters at https://elm-pages.com/docs/adapters/.

After executing the npm run build command, the adapter generates the following key files:

dist-server/server.mjs: This file contains a Node.js Fastify server configured specifically for Elm-Pages. To run the server, you can use the command node dist-server/server.mjs. We've set up the repository to start the server using npm start for your convenience.

dist-server/middleware.mjs: This file exports a default function, serving as a way to integrate the Elm-Pages app into Fastify via middleware. This is especially useful if you want to incorporate the generated server into your existing Fastify service or if the generated server doesn't fully meet your requirements.

An important consideration: Any routes you intend to exclude from Elm-Pages' control must be defined before this middleware. Additionally, make sure to direct the Fastify static middleware to the dist directory.

`adapters/fastify/adapter.mjs` runs at build time and puts the elm-pages renderer and Fastify plugin and server into `dist-server/`. See <https://elm-pages.com/docs/adapters/> for details on elm-pages adapters.

After `npm run build`, the adapter will have generated the following files:

- `dist-server/server.mjs` - a node Fastify server configured for elm-pages.
This can be run directly with `node dist-server/server.mjs`.
This repo is set up to do that via `npm start`.

- `dist-server/plugin.mjs` exports a default function that can be used to serve the elm-pages app via [Fastify Plugin](https://fastify.dev/docs/latest/Reference/Plugins/). You can use this to integrate into your existing Fastify service, or if the generated server doesn't work for your needs.

**Note:** Any routes you don't want by elm-pages must come _before_ this plugin. You will also need to point [Fastify static middleware](https://github.com/fastify/fastify-static) at `dist`.

## Setup Instructions

You can clone this repo with `git clone https://github.com/shahnhogan/elm-pages-starter-fastify.git`.

`npm install` from the cloned repo. Before running the dev server or build, make sure to install Lamdera (see below).

`npm run dev` starts the dev server with hot reloading.

`npm run build` builds the app for production.

`npm start` starts the production server at `server.mjs`.

### Install Lamdera

[Install Lamdera with these instructions](https://dashboard.lamdera.app/docs/download).

`elm-pages` 3.0 uses the lamdera compiler, which is a superset of the Elm compiler with some extra functionality to automatically serialize Elm types to Bytes.

### Debugging Lamdera Errors

Sometimes Lamdera will give compiler errors due to corrupted dependency cache. These messages will display a note at the bottom:

```
-- PROBLEM BUILDING DEPENDENCIES ---------------

...


Note: Sometimes `lamdera reset` can fix this problem by rebuilding caches, so
give that a try first.
```

Be sure to use `lamdera reset` to reset the caches for these cases. See more info about that in the Lamdera docs: https://dashboard.lamdera.app/docs/ides-and-tooling#problem-corrupt-caches

### Docs

Check out [the Package Docs](https://package.elm-lang.org/packages/dillonkearns/elm-pages/latest/). You can also use `npx elm-pages docs` from your project to view the documentation for the `RouteBuilder` module.

## Running Scripts with `elm-pages run`

- `npm install`
- `npx elm-pages run script/src/AddRoute.elm User.Id_` - now you can try out the generator! And you can tweak it, or even define new generator modules in the `script/` folder! You can also shorten this command to `npx elm-pages run AddRoute User.Id_` if you prefer.


## Thank You & Inspiration

Thank you to [dillonkearns](https://github.com/dillonkearns) for [elm-pages](https://github.com/dillonkearns/elm-pages)! Thank you [blaix](https://github.com/blaix) as this adapter was heavily inspired by @blaix and his [elm-pages-starter-express](https://github.com/blaix/elm-pages-starter-express) project!