import Koa = require('koa');
import { OK } from 'http-status-codes';
import serveStatic = require('koa-static');
import mount = require('koa-mount');
import path = require('path');
import { dirname } from 'path';
import { consoleLog } from './util';

const loggerMiddleware: Koa.Middleware = async (ctx, next) => {
	const message = `${ctx.method} ${ctx.url}`;
	const startTimestamp = Date.now();
	await next();
	consoleLog(`${ctx.status} ${message} - ${Date.now() - startTimestamp}ms`);
};

// Google Cloud App Engine-specific health check response
const googleCloudAppEngineMiddleware: Koa.Middleware = async (ctx, next) => {
	if (ctx.path === '/_ah/start') {
		ctx.status = OK;
	} else {
		await next();
	}
};

function RedirectMiddleware(from: string, to: string): Koa.Middleware {
	return async function redirectMiddleware(ctx, next) {
		if (ctx.method === 'GET' && ctx.path === from) {
			ctx.redirect(to);
			return;
		}
		await next();
	};
}

const carnesenCliWebsiteDir = dirname(
	require.resolve('@carnesen/cli-website/package.json'),
);

const websiteStaticMiddleware = serveStatic(
	path.join(carnesenCliWebsiteDir, 'dist/'),
);

const carnesenCliDir = dirname(require.resolve('@carnesen/cli/package.json'));

const docsStaticMiddleware = serveStatic(path.join(carnesenCliDir, 'dist/'));

const app = new Koa();

app.use(loggerMiddleware);
app.use(googleCloudAppEngineMiddleware);
app.use(websiteStaticMiddleware);
app.use(RedirectMiddleware('/docs', '/docs/latest/'));
app.use(RedirectMiddleware('/docs/latest', '/docs/latest/'));
app.use(mount('/docs/latest', docsStaticMiddleware));
app.use(RedirectMiddleware('/docs/0.5.x', '/docs/0.5.x/'));
app.use(mount('/docs/0.5.x', docsStaticMiddleware));

export { app };
