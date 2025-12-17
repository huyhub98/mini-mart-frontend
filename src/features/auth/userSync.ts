import type { KeycloakTokenParsed } from 'keycloak-js';
import api from '../../shared/api/http';

const userSyncEndpoint = '/auth/users/keycloak';

export interface UserRegistrationPayload {
  keycloakUserId: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

const buildPayloadFromProfile = (profile: KeycloakTokenParsed): UserRegistrationPayload | null => {
  if (!profile.sub) return null;

  const preferredUsername = (profile as { preferred_username?: string }).preferred_username;

  return {
    keycloakUserId: profile.sub,
    username: preferredUsername ?? profile.email ?? profile.sub,
    email: profile.email,
    firstName: (profile as { given_name?: string }).given_name,
    lastName: (profile as { family_name?: string }).family_name,
    fullName: profile.name,
  };
};

/**
 * Pushes the authenticated Keycloak user's profile to the backend for persistence.
 *
 * NOTE: `userSyncEndpoint` is the API that receives the new user payload. Replace this
 * path when wiring to the Spring Boot backend (e.g., `/api/users/keycloak-register`).
 */
export const syncUserWithBackend = async (profile: KeycloakTokenParsed) => {
  const payload = buildPayloadFromProfile(profile);
  if (!payload) {
    console.warn('Cannot sync user without a subject (sub) claim from Keycloak.');
    return;
  }

  console.info('Syncing Keycloak user to backend for persistence', {
    endpoint: userSyncEndpoint,
    payload,
  });

  await api.post(userSyncEndpoint, payload);
};

