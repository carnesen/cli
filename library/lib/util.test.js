"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const cli_usage_error_1 = require("./cli-usage-error");
describe(util_1.convertToNumber.name, () => {
    it('converts the provided string to a number', () => {
        expect(util_1.convertToNumber('1')).toBe(1);
    });
    it('throws a usage error if the string value cannot be converted', () => {
        try {
            util_1.convertToNumber('foo');
            throw new Error('This line should never be reached');
        }
        catch (ex) {
            expect(ex.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
            expect(ex.message).toMatch('not a number');
        }
    });
});
describe(util_1.regularizeText.name, () => {
    it('strips out a leading newline, trailing whitespace', () => {
        expect(util_1.regularizeText('\n   foo\n      bar\n   ')).toBe('foo\n   bar');
    });
});
//# sourceMappingURL=util.test.js.map