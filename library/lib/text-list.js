"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextList = void 0;
const util_1 = require("./util");
function TextListParagraph(item, targetNameLength = 0) {
    const { name, text } = item;
    const lines = util_1.regularizeText(text).split('\n');
    const paddedName = name.padEnd(targetNameLength);
    let firstLine = paddedName;
    if (lines[0]) {
        firstLine += ` : ${lines[0]}`;
    }
    const padding = ''.padEnd(targetNameLength + 3);
    const paddedLines = lines.slice(1).map((line) => `${padding}${line}`);
    return [firstLine, ...paddedLines].join('\n');
}
function TextList(...items) {
    const targetNameLength = Math.max(...items.map(({ name }) => name.length));
    const paragraphs = items.map((item) => TextListParagraph(item, targetNameLength));
    return paragraphs.join('\n');
}
exports.TextList = TextList;
//# sourceMappingURL=text-list.js.map