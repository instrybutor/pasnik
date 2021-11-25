import { Dictionary, IdSelector } from './models';

export function toEntities<T>(
  entities: T[],
  idSelector: IdSelector<T> = (instance: any) => instance.id
): Dictionary<T> {
  return entities.reduce((acc, entity) => {
    acc[idSelector(entity)] = entity;
    return acc;
  }, {} as Dictionary<T>);
}
