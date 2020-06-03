"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageString = void 0;
const redent = require("redent");
const constants_1 = require("./constants");
const text_list_1 = require("./text-list");
const util_1 = require("./util");
const get_path_and_description_of_commands_1 = require("./get-path-and-description-of-commands");
const INDENT_SIZE = 3;
function UsageString(commandStack) {
    const { current, parents } = commandStack;
    const lastCommand = current;
    const commandPathString = [...parents, current].map(({ name }) => name).join(' ');
    let firstParagraph = `Usage: ${commandPathString}`;
    const otherParagraphs = [];
    function appendArgParserUsage(argParser, prefix) {
        if (argParser && !argParser.hidden) {
            const { placeholder, description, required } = argParser;
            if (prefix) {
                firstParagraph += ` ${prefix}`;
            }
            firstParagraph += ` ${required ? placeholder : util_1.wrapInSquareBrackets(placeholder)}`;
            if (description) {
                otherParagraphs.push(`${placeholder}:`);
                otherParagraphs.push(redent(util_1.regularizeText(description), INDENT_SIZE));
            }
        }
    }
    if (lastCommand.commandType === constants_1.CLI_BRANCH) {
        // BRANCH
        firstParagraph += ' <subcommand> ...';
        otherParagraphs.push('Subcommands:');
        const nameAndDescriptionOfLeaves = get_path_and_description_of_commands_1.getPathAndDescriptionOfLeaves(lastCommand, []);
        const items = nameAndDescriptionOfLeaves.map(({ path, description }) => ({
            name: path.join(' '),
            text: description,
        }));
        const subcommandsParagraph = redent(text_list_1.TextList(...items), INDENT_SIZE);
        otherParagraphs.push(subcommandsParagraph);
    }
    else {
        // LEAF
        const { positionalArgParser, namedArgParsers, escapedArgParser } = lastCommand;
        appendArgParserUsage(positionalArgParser);
        if (namedArgParsers) {
            const entries = Object.entries(namedArgParsers).filter(([_, argParser]) => !argParser.hidden);
            if (entries.length > 0) {
                const optionsNotRequired = entries.every(([_, namedArgParser]) => !namedArgParser.required);
                firstParagraph += optionsNotRequired ? ' [<options>]' : ' <options>';
                otherParagraphs.push('Options:');
                const items = entries.map(([argParserName, argParser]) => {
                    let name = `--${argParserName}`;
                    if (argParser.placeholder) {
                        name += ` ${argParser.placeholder}`;
                    }
                    if (!argParser.required) {
                        name = util_1.wrapInSquareBrackets(name);
                    }
                    const text = argParser.description;
                    return { name, text };
                });
                const optionsParagraph = redent(text_list_1.TextList(...items), INDENT_SIZE);
                otherParagraphs.push(optionsParagraph);
            }
        }
        appendArgParserUsage(escapedArgParser, '--');
    }
    const paragraphs = [firstParagraph];
    const regularizedDescription = util_1.regularizeText(lastCommand.description);
    if (regularizedDescription) {
        paragraphs.push(redent(regularizedDescription, INDENT_SIZE));
    }
    paragraphs.push(...otherParagraphs);
    return paragraphs.join('\n\n');
}
exports.UsageString = UsageString;
//# sourceMappingURL=usage-string.js.map