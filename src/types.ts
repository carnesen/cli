import { LEAF, BRANCH } from './constants';
export type TypeName = 'string' | 'string[]' | 'boolean' | 'number' | 'number[]';

export type Value<T extends TypeName> = T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'number'
  ? number
  : T extends 'string[]'
  ? string[]
  : T extends 'number[]'
  ? number[]
  : never;

export type DefaultValue<T extends TypeName> = T extends 'boolean' ? false : Value<T>;

export type Option<T extends TypeName> = {
  typeName: T;
  description?: string;
  defaultValue?: DefaultValue<T>;
};

export type Options = {
  [optionName: string]: Option<TypeName>;
};

export type NamedArgs<O extends Options> = { [K in keyof O]: Value<O[K]['typeName']> };

export type Command = Branch | Leaf<Options>;

export type Branch = {
  commandType: typeof BRANCH;
  commandName: string;
  description?: string;
  subcommands: (Branch | Leaf<any>)[];
};

export type Leaf<O extends Options> = {
  commandType: typeof LEAF;
  commandName: string;
  description?: string;
  options?: O;
  action: (namedArgs: NamedArgs<O>) => any;
};

export type RawNamedArgs = {
  [optionName: string]: string[] | undefined;
};
