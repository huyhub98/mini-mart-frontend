import keycloak from './keycloak';

export type AuthChangeListener = (authenticated: boolean) => void;

const listeners = new Set<AuthChangeListener>();

const notify = (authenticated: boolean) => {
  listeners.forEach((listener) => listener(authenticated));
};

export const initAuth = async () => {
  const authenticated = await keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    checkLoginIframe: true,
  });

  keycloak.onAuthSuccess = () => notify(true);
  keycloak.onAuthError = () => notify(false);
  keycloak.onAuthLogout = () => notify(false);
  keycloak.onTokenExpired = () => {
    void refreshTokenIfNeeded();
  };

  notify(authenticated);
  return authenticated;
};

export const addAuthChangeListener = (listener: AuthChangeListener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const login = (options?: Parameters<typeof keycloak.login>[0]) => keycloak.login(options);

export const logout = () => keycloak.logout();

export const getAccessToken = () => keycloak.token ?? null;

export const getIdToken = () => keycloak.idToken ?? null;

export const getUserProfile = () => keycloak.tokenParsed ?? null;

export const refreshTokenIfNeeded = async () => {
  try {
    const refreshed = await keycloak.updateToken(30);
    if (refreshed) {
      notify(true);
    }
    return refreshed;
  } catch (error) {
    notify(false);
    await logout();
    return false;
  }
};

export default {
  initAuth,
  login,
  logout,
  getAccessToken,
  getIdToken,
  getUserProfile,
  refreshTokenIfNeeded,
  addAuthChangeListener,
};
