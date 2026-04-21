import { IUser } from "@root/entities/user/types";
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from '@store/store';
import { setCurrentUser } from '@root/app/store/reducers/user';

let logoutTimer: NodeJS.Timeout;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null,
  );

  const login = useCallback((user: IUser, expiration: Date) => {
    dispatch(setCurrentUser(user));

    const tokenExpirationDate =
      expiration || new Date(new Date().getTime() + parseInt(import.meta.env.VITE_APP_LOGIN_TIMEOUT));
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...user,
        isLoggedIn: true,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setTokenExpirationDate(null);
    dispatch(setCurrentUser(null));
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("userData") || "null",
    ) as (IUser & { expiration: Date }) | null;
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (currentUser && currentUser.token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, logout, tokenExpirationDate]);

  return { tokenExpirationDate, login, logout };
};
