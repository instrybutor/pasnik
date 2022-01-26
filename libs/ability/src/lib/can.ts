import { createContext, useContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AnyAbility, defineAbility } from '@casl/ability';

const defaultAbility = defineAbility(() => {
  // No actions
});

export const AbilityContext = createContext<AnyAbility>(defaultAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
export function useAbility() {
  return useContext(AbilityContext);
}
