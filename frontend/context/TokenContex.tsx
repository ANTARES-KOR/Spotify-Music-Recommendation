import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext<string | null>(null);
const SetTokenContext = createContext<(token: string | null) => void>(() => {});

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <TokenContext.Provider value={token}>
      <SetTokenContext.Provider value={setToken}>{children}</SetTokenContext.Provider>
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const token = useContext(TokenContext);

  return token;
};

export const useSetToken = () => {
  const setToken = useContext(SetTokenContext);

  return setToken;
};
