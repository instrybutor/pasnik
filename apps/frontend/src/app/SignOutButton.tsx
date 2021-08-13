import { useAuth } from './utils/useAuth';

export default function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <button onClick={signOut}>Sign Out</button>
  );
}
