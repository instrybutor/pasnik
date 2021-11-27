export type IdSelectorStr<T> = (model: T) => string;
export type IdSelectorNum<T> = (model: T) => number;

export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export interface DictionaryNum<T> {
  [id: number]: T;
}

export abstract class Dictionary<T> implements DictionaryNum<T> {
  [id: string]: T;
}
