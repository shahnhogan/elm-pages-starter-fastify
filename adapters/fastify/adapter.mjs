// An elm-pages v3 adapter for fastify
// See <https://elm-pages.com/docs/adapters>

import * as fs from "fs";

export default async function run({
    renderFunctionFilePath,
    // routePatterns,
    // apiRoutePatterns,
}) {
    console.log("Running elm-pages fastify adapter");
    ensureDirSync("dist-server");
    fs.copyFileSync(renderFunctionFilePath, "./dist-server/elm-pages.mjs");
    fs.copyFileSync("./adapters/fastify/server.mjs", "./dist-server/server.mjs");
    fs.copyFileSync("./adapters/fastify/plugin.mjs", "./dist-server/plugin.mjs");
}

function ensureDirSync(dirpath) {
    try {
        fs.mkdirSync(dirpath, { recursive: true });
    } catch (err) {
        if (err.code !== "EEXIST") throw err;
    }
}