import { Outlet } from 'react-router';

export interface PublicOnlyProps {
  children: JSX.Element;
}

export function PublicOnly({ children }: PublicOnlyProps) {
  // const navigate = useNavigate();
  // const { isSuccess } = useCurrentUser({
  //   suspense: false,
  // });

  // useEffect(() => {
  //   console.log('mount');
  //   return () => {
  //     console.log('unmount');
  //   };
  // }, [isSuccess]);

  // if (isSuccess) {
  //   return <Navigate to="/" />;
  // }

  return children ?? <Outlet />;
}
