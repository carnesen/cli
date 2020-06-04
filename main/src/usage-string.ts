import redent = require('redent');

import { Node } from './cli-node';
import { CLI_BRANCH } from './constants';
import { TextList } from './text-list';
import { regularizeText, wrapInSquareBrackets } from './util';
import { getPathAndDescriptionOfLeaves } from './get-path-and-description-of-commands';
import { AnyArgParser } from './cli-arg-parser';

const INDENT_SIZE = 3;

export function UsageString({ current, parents }: Node): string {
  const commandPathString = [...parents, current].map(({ name }) => name).join(' ');
  let firstParagraph = `Usage: ${commandPathString}`;
  const otherParagraphs: string[] = [];

  function appendArgParserUsage(argParser?: AnyArgParser, prefix?: string) {
    if (argParser && !argParser.hidden) {
      const { placeholder, description, required } = argParser;
      if (prefix) {
        firstParagraph += ` ${prefix}`;
      }
      firstParagraph += ` ${required ? placeholder : wrapInSquareBrackets(placeholder)}`;
      if (description) {
        otherParagraphs.push(`${placeholder}:`);
        otherParagraphs.push(redent(regularizeText(description), INDENT_SIZE));
      }
    }
  }

  if (current.commandType === CLI_BRANCH) {
    // BRANCH
    firstParagraph += ' <subcommand> ...';
    otherParagraphs.push('Subcommands:');
    const nameAndDescriptionOfLeaves = getPathAndDescriptionOfLeaves(current, []);
    const items: Parameters<typeof TextList> = nameAndDescriptionOfLeaves.map(
      ({ path, description }) => ({
        name: path.join(' '),
        text: description,
      }),
    );
    const childrenParagraph = redent(TextList(...items), INDENT_SIZE);
    otherParagraphs.push(childrenParagraph);
  } else {
    // LEAF
    const { positionalArgParser, namedArgParsers, escapedArgParser } = current;

    appendArgParserUsage(positionalArgParser);

    if (namedArgParsers) {
      const entries = Object.entries(namedArgParsers).filter(
        ([_, argParser]) => !argParser.hidden,
      );
      if (entries.length > 0) {
        const optionsNotRequired = entries.every(
          ([_, namedArgParser]) => !namedArgParser.required,
        );
        firstParagraph += optionsNotRequired ? ' [<options>]' : ' <options>';
        otherParagraphs.push('Options:');
        const items: Parameters<typeof TextList> = entries.map(
          ([argParserName, argParser]) => {
            let name = `--${argParserName}`;
            if (argParser.placeholder) {
              name += ` ${argParser.placeholder}`;
            }
            if (!argParser.required) {
              name = wrapInSquareBrackets(name);
            }
            const text = argParser.description;
            return { name, text };
          },
        );
        const optionsParagraph = redent(TextList(...items), INDENT_SIZE);
        otherParagraphs.push(optionsParagraph);
      }
    }

    appendArgParserUsage(escapedArgParser, '--');
  }

  const paragraphs = [firstParagraph];

  const regularizedDescription = regularizeText(current.description);
  if (regularizedDescription) {
    paragraphs.push(redent(regularizedDescription, INDENT_SIZE));
  }

  paragraphs.push(...otherParagraphs);

  return paragraphs.join('\n\n');
}
