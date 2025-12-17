import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { KeycloakTokenParsed } from 'keycloak-js';
import keycloak from './keycloak';
import {
  addAuthChangeListener,
  getAccessToken,
  getUserProfile,
  initAuth,
  login,
  logout,
  refreshTokenIfNeeded,
} from './authService';
import { syncUserWithBackend } from './userSync';

export interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  user: KeycloakTokenParsed | null;
  roles: string[];
  login: () => void;
  logout: () => void;
  refresh: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<KeycloakTokenParsed | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const lastSyncedUser = useRef<string | null>(null);

  useEffect(() => {
    const load = async () => {
      await initAuth();
      updateState();
    };

    const unsubscribe = addAuthChangeListener(() => updateState());

    void load();
    return unsubscribe;
  }, []);

  useEffect(() => {
    const pushUserToBackend = async () => {
      if (!isAuthenticated || !user?.sub) return;
      if (lastSyncedUser.current === user.sub) return;

      try {
        await syncUserWithBackend(user);
        lastSyncedUser.current = user.sub;
      } catch (error) {
        console.error('Failed to sync Keycloak registration to backend', error);
      }
    };

    void pushUserToBackend();
  }, [isAuthenticated, user]);

  const updateState = () => {
    setIsAuthenticated(!!keycloak.authenticated);
    setToken(getAccessToken());
    const profile = getUserProfile();
    setUser(profile);
    const detailedProfile = profile as (KeycloakTokenParsed & {
      realm_access?: { roles?: string[] };
      resource_access?: Record<string, { roles?: string[] }>;
    }) | null;
    const realmRoles = detailedProfile?.realm_access?.roles ?? [];
    const clientRoles = detailedProfile?.resource_access?.[keycloak.clientId ?? '']?.roles ?? [];
    setRoles([...(realmRoles as string[]), ...(clientRoles as string[])]);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      token,
      user,
      roles,
      login: () => login(),
      logout: () => logout(),
      refresh: () => refreshTokenIfNeeded(),
    }),
    [isAuthenticated, token, user, roles]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
