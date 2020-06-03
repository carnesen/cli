import { regularizeText } from './util';

type Item = {
  name: string;
  text?: string;
};

function TextListParagraph(item: Item, targetNameLength = 0): string {
  const { name, text } = item;
  const lines = regularizeText(text).split('\n');
  const paddedName = name.padEnd(targetNameLength);
  let firstLine = paddedName;
  if (lines[0]) {
    firstLine += ` : ${lines[0]}`;
  }
  const padding = ''.padEnd(targetNameLength + 3);
  const paddedLines = lines.slice(1).map((line) => `${padding}${line}`);
  return [firstLine, ...paddedLines].join('\n');
}

export function TextList(...items: Item[]): string {
  const targetNameLength = Math.max(...items.map(({ name }) => name.length));
  const paragraphs = items.map((item) => TextListParagraph(item, targetNameLength));
  return paragraphs.join('\n');
}
