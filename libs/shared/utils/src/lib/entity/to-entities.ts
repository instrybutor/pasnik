import { Dictionary, IdSelector } from './models';

export interface BaseEntity {
  id: number;
}

export function toEntities<T extends BaseEntity>(
  entities: T[],
  idSelector: IdSelector<T> = (instance) => instance.id
): Dictionary<T> {
  return entities.reduce((acc, entity) => {
    acc[idSelector(entity)] = entity;
    return acc;
  }, {} as Dictionary<T>);
}
