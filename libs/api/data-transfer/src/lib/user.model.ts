export interface UserModel {
  id: number;
  givenName?: string;
  familyName?: string;
  email: string;
  avatarImg?: string | null;
}
