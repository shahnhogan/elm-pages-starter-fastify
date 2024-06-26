import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyFormbody from "@fastify/formbody";
import path from "path";
import elmPagesPlugin from "./plugin.mjs";

const fastify = Fastify({ logger: true });
const port = process.env.PORT || 3000;
const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');

fastify.register(elmPagesPlugin);
fastify.register(fastifyFormbody)

fastify.register(fastifyStatic, { root });

fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    reply.code(500).send("Unexpected Error");
});

fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) throw err;
    fastify.log.info(`Server is listening on ${address}`)
});