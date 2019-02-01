import { option, leaf, cli } from '..';

import { promisify } from 'util';
import { readFile } from 'fs';
import { isAbsolute } from 'path';

export const absoluteCat = leaf({
  commandName: 'absolute-cat',
  description: "Print a file's contents",
  options: {
    path: option({
      typeName: 'string',
      nullable: false,
      description: 'An absolute path',
      defaultValue: __filename,
      validate(str) {
        if (!isAbsolute(str)) {
          return 'path must be absolute';
        }
        return '';
      },
    }),
  },
  action: async ({ path }) => {
    const contents = await promisify(readFile)(path, { encoding: 'utf8' });
    return contents;
  },
});

if (module === require.main) {
  cli(absoluteCat)();
}
