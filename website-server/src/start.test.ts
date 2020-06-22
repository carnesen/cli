import { start } from './start';

describe(__filename, () => {
	it('starts and stops', async () => {
		const server = start();
		await new Promise((resolve, reject) => {
			server.on('listening', resolve);
			server.on('error', reject);
		});
		server.close();
	});
});
