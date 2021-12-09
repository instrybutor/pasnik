import {
  NavLink,
  NavLinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { ReactElement } from 'react';

export interface NavLinkWithParamChildrenProps {
  isActive: boolean;
}

export interface NavLinkWithParamProps extends NavLinkProps {
  children?: (props: NavLinkWithParamChildrenProps) => ReactElement;
}

export function NavLinkWithParam({
  children,
  to,
  end,
  ...rest
}: NavLinkWithParamProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end });

  return (
    <NavLink to={to} end={end} {...rest}>
      {children?.({ isActive: !!match })}
    </NavLink>
  );
}
