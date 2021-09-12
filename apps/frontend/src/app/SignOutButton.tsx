import { useAuth } from '@pasnik/shared/utils-auth';

export default function SignOutButton() {
  const { signOut } = useAuth();

  return <button onClick={signOut}>Sign Out</button>;
}
