import Koa = require('koa');
import { OK } from 'http-status-codes';
import serveStatic = require('koa-static');
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

const carnesenCliWebsiteDir = dirname(
	require.resolve('@carnesen/cli-website/package.json'),
);

const staticMiddleware = serveStatic(path.join(carnesenCliWebsiteDir, 'dist/'));

const app = new Koa();

app.use(loggerMiddleware);
app.use(googleCloudAppEngineMiddleware);
app.use(staticMiddleware);

export { app };
