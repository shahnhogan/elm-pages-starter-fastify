import fp from 'fastify-plugin'
import * as elmPages from './elm-pages.mjs'

const requestToElmPagesJson = (request) => {
    const url = new URL(request.url, `${request.protocol}://${request.hostname}`).href;
    const { method, headers, body = {} } = request;

    const elmPagesRequest = {
        requestTime: Math.round(new Date().getTime()),
        method,
        headers,
        rawUrl: url,
        body,
        multiPartFormData: null,
    };

    return elmPagesRequest;
};

const elmPagesHandler = async (request, reply) => {
    try {
        const renderResult = await elmPages.render(requestToElmPagesJson(request))
        const { headers, statusCode, body } = renderResult;

        // set headers and status code
        reply
            .code(statusCode)
            .headers(headers);

        if (renderResult.kind === "bytes") {
            // send binary data
            reply.send(Buffer.from(body));
        } else {
            // send html
            reply.type('text/html').send(body);
        }
    } catch (error) {
        fastify.log.error(error);
        reply.code(500).send(`Unexpected Error:`);
    }
}

const elmPagesPlugin = fp((fastify, opts, done) => {
    fastify.setNotFoundHandler(elmPagesHandler);
    done();
});

export default elmPagesPlugin