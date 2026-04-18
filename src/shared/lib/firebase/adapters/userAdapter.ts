import { User } from 'firebase/auth';
import { IUser } from '@entities/user/types';

export const mapFirebaseUser = (user: User): IUser => ({
  id: user.uid,
  email: user.email,
  name: user.displayName ?? undefined,
});