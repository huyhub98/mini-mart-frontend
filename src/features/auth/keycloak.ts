import Keycloak from 'keycloak-js';

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL ?? 'http://localhost:8080';
const realm = import.meta.env.VITE_KEYCLOAK_REALM ?? 'service';
const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? 'mini-mart-fe';

const keycloak = new Keycloak({
  url: keycloakUrl,
  realm,
  clientId,
});

export default keycloak;
