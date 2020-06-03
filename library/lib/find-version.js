"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVersion = void 0;
const readPkgUp = require("read-pkg-up");
const path_1 = require("path");
async function findVersion() {
    const mainModule = require.main;
    if (!mainModule) {
        // We not sure under what circumstances require.main would be undefined but
        // the NodeJS types say it might be.
        return undefined;
    }
    const found = await readPkgUp({
        cwd: path_1.dirname(mainModule.filename),
        normalize: false,
    });
    if (!found) {
        return undefined;
    }
    if (!found.packageJson.version) {
        return undefined;
    }
    return found.packageJson.version;
}
exports.findVersion = findVersion;
//# sourceMappingURL=find-version.js.map