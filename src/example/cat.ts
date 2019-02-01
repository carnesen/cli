import { option, leaf, cli } from '..';

import { promisify } from 'util';
import { readFile } from 'fs';
import { basename, isAbsolute, join } from 'path';

export const cat = leaf({
  commandName: 'cat',
  description: "Print a file's contents",
  options: {
    path: option({
      typeName: 'string',
      nullable: false,
      description: 'An absolute or relative file path',
      defaultValue: basename(__filename),
    }),
  },
  action: async ({ path }) => {
    let absoluteFilePath = path;
    if (!isAbsolute(path)) {
      absoluteFilePath = join(__dirname, path);
    }
    const contents = await promisify(readFile)(absoluteFilePath, { encoding: 'utf8' });
    return contents;
  },
});

if (module === require.main) {
  cli(cat)();
}
