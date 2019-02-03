import { LEAF, BRANCH } from './constants';
export type TypeName = 'string' | 'string[]' | 'boolean' | 'number' | 'number[]' | 'json';

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
  : T extends 'json'
  ? any
  : never;

export type DefaultValue<T extends TypeName> = T extends 'boolean' ? false : Value<T>;

type AllowedValues<T extends TypeName> = T extends 'number' | 'string'
  ? Value<T>[]
  : never;

type ValidationMessage = string | undefined;

export type Validate<T extends TypeName> = (
  value: Value<T>,
) => Promise<ValidationMessage> | ValidationMessage;

export type Option<T extends TypeName, U extends boolean> = {
  typeName: T;
  nullable: U;
  description?: string;
  defaultValue?: DefaultValue<T>;
  allowedValues?: AllowedValues<T>;
  validate?: Validate<T>;
};

export type Options = {
  [optionName: string]: Option<TypeName, boolean>;
};

export type NamedArg<T extends TypeName, U extends boolean> =
  | Value<T>
  | (U extends true ? null : never);

export type NamedArgs<O extends Options> = {
  [K in keyof O]: NamedArg<O[K]['typeName'], O[K]['nullable']>
};

export type Command = Branch | Leaf<Options>;

export type Branch = {
  commandType: typeof BRANCH;
  commandName: string;
  description?: string;
  version?: string;
  subcommands: (Branch | Leaf<any>)[];
};

export type Leaf<O extends Options> = {
  commandType: typeof LEAF;
  commandName: string;
  description?: string;
  options?: O;
  version?: string;
  action: (namedArgs: NamedArgs<O>) => any;
};

export type RawNamedArgs = {
  [optionName: string]: string[] | undefined;
};
