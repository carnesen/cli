import { Server } from 'http';
import { app } from './app';
import { consoleLog } from './util';

const PORT = Number(process.env.PORT) || 8000;

export function start(port = PORT): Server {
	consoleLog(`Starting server`);
	return app.listen(port, () => {
		consoleLog(`Listening http://localhost:${port}/`);
	});
}
