export interface IUser {
  isLoggedIn: boolean;
  userId: string;
  token: string | null;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  metadata?: {
    creationTime: string;
    lastSignInTime: string;
  };
}