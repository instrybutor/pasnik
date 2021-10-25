export interface UserModel {
  id: number;
  isAdmin: boolean;
  givenName?: string;
  familyName?: string;
  email: string;
  avatarImg?: string | null;
}
