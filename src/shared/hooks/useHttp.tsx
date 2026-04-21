import { useState, useCallback, useRef, useEffect } from "react";
import { useAppSelector } from '@store/store';

export const useHttpClient = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: BodyInit | null = null,
      headers: HeadersInit = {},
    ) => {
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      if(currentUser?.token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${currentUser.token}`,
        };
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        let responseData;
        try {
          responseData = await response.json();
        } catch {
          responseData = null;
        }

        if (!response.ok) {
          throw new Error(responseData?.message || "Request failed");
        }

        return responseData;
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
        throw err;
      } finally {
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl,
        );
      }
    },
    [],
  );

  const clearError = () => setError(null);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((ctrl) => ctrl.abort());
    };
  }, []);

  return { error, sendRequest, clearError };
};
