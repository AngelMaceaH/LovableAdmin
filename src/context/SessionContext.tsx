"use client";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { createContext, useContext } from "react";

interface SessionContextProps {
  sessionToken: RequestCookie | undefined;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export function SessionProvider({
  sessionToken,
  children,
}: {
  sessionToken: RequestCookie | undefined;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={{ sessionToken }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
