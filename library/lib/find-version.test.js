"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_version_1 = require("./find-version");
describe(find_version_1.findVersion.name, () => {
    it('finds a package version by looking upwards in the filesystem from require.main', async () => {
        // In the context of unit tests, this file is the entry point `require.main`.
        expect(await find_version_1.findVersion()).toBe(require('../package.json').version);
    });
});
//# sourceMappingURL=find-version.test.js.map