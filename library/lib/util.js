"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToNumber = exports.regularizeText = exports.wrapInCurlyBrackets = exports.wrapInSquareBrackets = void 0;
const cli_usage_error_1 = require("./cli-usage-error");
const redent = require("redent");
function wrapInSquareBrackets(str) {
    return `[${str}]`;
}
exports.wrapInSquareBrackets = wrapInSquareBrackets;
function wrapInCurlyBrackets(str) {
    return `{${str}}`;
}
exports.wrapInCurlyBrackets = wrapInCurlyBrackets;
function regularizeText(text) {
    if (!text) {
        return '';
    }
    const trailingCarriageReturnRegExp = /\r$/;
    const lines = text
        .split('\n')
        .map((line) => line.replace(trailingCarriageReturnRegExp, ''));
    const regularizedLines = [];
    for (const line of lines) {
        if (regularizedLines.length > 0 || line.trim().length > 0) {
            // ^^ Effectively this trims leading lines that are only whitespace
            // ^^ This is to support multi-line descriptions supplied as:
            // const foo = {
            //   description: `
            //     A line
            //     Another line
            //   `,
            // };
            regularizedLines.push(line);
        }
    }
    const regularized = redent(regularizedLines.join('\n'), 0).trimRight();
    return regularized;
}
exports.regularizeText = regularizeText;
function convertToNumber(rawValue) {
    let value = NaN;
    if (rawValue.length > 0) {
        value = Number(rawValue);
    }
    if (Number.isNaN(value)) {
        throw new cli_usage_error_1.CliUsageError(`"${rawValue}" is not a number`);
    }
    return value;
}
exports.convertToNumber = convertToNumber;
//# sourceMappingURL=util.js.map