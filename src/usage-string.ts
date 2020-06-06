import redent = require('redent');

import { Node } from './cli-node';
import { CLI_BRANCH } from './cli-branch';
import { TextList } from './text-list';
import { regularizeText, wrapInSquareBrackets } from './util';
import { getPathAndDescriptionOfLeaves } from './get-path-and-description-of-commands';
import { AnyParser } from './cli-arg-parser';

const INDENT_SIZE = 3;

export function UsageString({ current, parents }: Node): string {
  const commandPathString = [...parents, current].map(({ name }) => name).join(' ');
  let firstParagraph = `Usage: ${commandPathString}`;
  const otherParagraphs: string[] = [];

  function appendValuedParserUsage(parser?: AnyParser, prefix?: string) {
    if (parser && !parser.hidden) {
      const { placeholder, description, required } = parser;
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

  if (current.kind === CLI_BRANCH) {
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
    const {
      positionalParser: positionalValuedParser,
      namedParsers: namedValuedParsers,
      escapedParser: escapedValuedParser,
    } = current;

    appendValuedParserUsage(positionalValuedParser);

    if (namedValuedParsers) {
      const entries = Object.entries(namedValuedParsers).filter(
        ([_, parser]) => !parser.hidden,
      );
      if (entries.length > 0) {
        const optionsNotRequired = entries.every(
          ([_, namedValuedParser]) => !namedValuedParser.required,
        );
        firstParagraph += optionsNotRequired ? ' [<options>]' : ' <options>';
        otherParagraphs.push('Options:');
        const items: Parameters<typeof TextList> = entries.map(([parserName, parser]) => {
          let name = `--${parserName}`;
          if (parser.placeholder) {
            name += ` ${parser.placeholder}`;
          }
          if (!parser.required) {
            name = wrapInSquareBrackets(name);
          }
          const text = parser.description;
          return { name, text };
        });
        const optionsParagraph = redent(TextList(...items), INDENT_SIZE);
        otherParagraphs.push(optionsParagraph);
      }
    }

    appendValuedParserUsage(escapedValuedParser, '--');
  }

  const paragraphs = [firstParagraph];

  const regularizedDescription = regularizeText(current.description);
  if (regularizedDescription) {
    paragraphs.push(redent(regularizedDescription, INDENT_SIZE));
  }

  paragraphs.push(...otherParagraphs);

  return paragraphs.join('\n\n');
}
