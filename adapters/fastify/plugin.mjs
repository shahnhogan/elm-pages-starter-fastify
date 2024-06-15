import fp from 'fastify-plugin'
import * as elmPages from './elm-pages.mjs'

const requestToElmPagesJson = (request) => {
    const { body, headers, method } = request;
    const rawUrl = new URL(request.url, `${request.protocol}://${request.hostname}`).href;

    return {
        requestTime,
        method,
        headers,
        rawUrl,
        body: body && isFormData(headers) ? toFormData(body) : body && JSON.stringify(body) || null,
        multiPartFormData: null,
    };
};

const requestTime = Math.round(new Date().getTime())

const isFormData = (headers) => headers['content-type'] === 'application/x-www-form-urlencoded';

const toFormData = (body) => typeof body === 'string'
    ? body
    : Object.entries(body).reduce((formData, [key, value]) => {
        formData.append(key, value);
        return formData;
    }, new URLSearchParams()).toString() || null;

const elmPagesHandler = (fastify) => async (request, reply) => {
    try {
        const { body, headers, kind, statusCode } = await elmPages.render(requestToElmPagesJson(request));

        // set headers and status code
        reply
            .code(statusCode)
            .headers(headers);

        if (kind === "bytes") {
            // send bytes
            reply.send(Buffer.from(body));
        } else {
            // send html
            reply.type('text/html').send(body);
        }
    } catch (error) {
        fastify.log.error(error);
        reply.code(500).send('Internal Server Error');
    }
}

const elmPagesPlugin = fp((fastify, opts, done) => {
    fastify.setNotFoundHandler(elmPagesHandler(fastify));
    done();
});

export default elmPagesPlugin