"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  email: String;
  password: String;
  username: String;
  bio: String | null;
  profilePicture: String | null;
};

type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
};

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const values = {
    user: user,
    setUser: setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "Auth context ashiglahin tuld zaavl provider dotor bh hergtei"
    );
  }

  return authContext;
};
