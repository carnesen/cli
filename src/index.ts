/** This module is the main entrypoint for the **@carnesen/cli** package */

// The `c` namespace object is a compact, convenient API
export * as c from './c';

// The full API
export * from './c-cli-command';
export * from './c-cli-command-group';
export * from './c-cli';

// Argument group factories
export * from './arg-groups/c-cli-flag-arg-group';
export * from './arg-groups/c-cli-json-arg-group';
export * from './arg-groups/c-cli-number-arg-group';
export * from './arg-groups/c-cli-number-array-arg-group';
export * from './arg-groups/c-cli-string-arg-group';
export * from './arg-groups/c-cli-string-array-arg-group';
export * from './arg-groups/c-cli-string-choice-arg-group';

// The rest of the exports in this module support "advanced" features
export * from './c-cli-ansi-color';
export * from './c-cli-color-factory';
export * from './c-cli-color';
export * from './c-cli-console-logger';
export * from './c-cli-description';
export * from './c-cli-logger';
export * from './c-cli-noop-color';
export * from './c-cli-noop-logger';
export * from './c-cli-process';

// Error constructors
export * from './c-cli-terse-error';
export * from './c-cli-usage-error';

// Custom argument group
export * from './c-cli-arg-group';

// FOR INTERNAL USE ONLY
export * from './navigate-cli-tree';
export * from './c-cli-word-mark';
export * from './c-cli-tree';
