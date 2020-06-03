#!/usr/bin/env node

import { runCliAndExit, CliCommand, CliBranch } from '@carnesen/cli';
import path = require('path');
import { execFileSync } from 'child_process';

const PROJECT_DIR = path.resolve(__dirname, '..');

const TYPEDOC_EXECUTABLE_PATH = path.join(PROJECT_DIR, 'node_modules', '.bin', 'typedoc');

const CARNESEN_CLI_DIR = path.dirname(require.resolve('@carnesen/cli/package.json'));

const dist = CliCommand({
  name: 'dist',
  action() {
    const args = [
      '--mode',
      'library',
      '--readme',
      path.join(PROJECT_DIR, 'readme.md'),
      '--inputFiles',
      path.join('src', 'index.ts'),
      '--out',
      path.resolve('dist'),
    ];
    return execFileSync(TYPEDOC_EXECUTABLE_PATH, args, {
      encoding: 'utf-8',
      cwd: CARNESEN_CLI_DIR,
    });
  },
});

const branch = CliBranch({ name: 'carnesen-cli-web', subcommands: [dist] });

if (require.main === module) {
  runCliAndExit(branch);
}
