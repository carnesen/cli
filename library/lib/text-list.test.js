"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_list_1 = require("./text-list");
describe(text_list_1.TextList.name, () => {
    it('Creates a usage string for a branch', () => {
        const usageString = text_list_1.TextList({ name: 'foo', text: 'hi\n   bye' }, { name: 'barrio', text: 'bye' });
        expect(usageString).toMatchSnapshot();
    });
});
//# sourceMappingURL=text-list.test.js.map