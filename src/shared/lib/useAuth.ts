import { firebaseAuth } from "./firebase";
// import { createUserWithEmailAndPassword } from '@firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useHttpClient } from "@shared/hooks/useHttp";

export const useAuth = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const provider = new GoogleAuthProvider();

  // const loginByAuth = async (email: string, password: string) => {
  //   const token = 'I_AM_THE_TOKEN';
  //   localStorage.setItem('token', token);
  //   removeWindowClass('login-page');
  //   removeWindowClass('hold-transition');
  //   return token;
  // };

  // const registerByAuth = async (email: string, password: string) => {
  //   const token = 'I_AM_THE_TOKEN';
  //   localStorage.setItem('token', token);
  //   removeWindowClass('register-page');
  //   removeWindowClass('hold-transition');
  //   return token;
  // };

  const registerWithEmail = async (email: string, password: string) => {
    try {
      // const result = await createUserWithEmailAndPassword(
      //   firebaseAuth,
      //   email,
      //   password
      // );
      // return result;
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        },
      );
      return response;
    } catch {
      throw error || new Error("Failed to register");
    } finally {
      clearError();
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        "POST",
        JSON.stringify({
          email,
          password,
        }),
        {
          "Content-Type": "application/json",
        },
      );
      return response;
    } catch {
      throw error || new Error("Failed to login");
    } finally {
      clearError();
    }
  };

  const signInByGoogle = async () => {
    try {
      return await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      throw error;
    }
  };

  return { registerWithEmail, loginWithEmail, signInByGoogle, error };
};
