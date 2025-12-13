# Mini Mart Frontend

React + TypeScript storefront with Keycloak SSO (OIDC Authorization Code + PKCE) wired for a Spring Boot backend.

## Stack & URLs
- Frontend: `http://localhost:5173`
- Backend (Spring Boot API): `http://localhost:8998`
- Keycloak: `http://localhost:8080`
  - Realm: `service`
  - Public client (PKCE): `mini-mart-fe`
  - Resource server client: `mini-mart-api`

## Environment
Create `.env.local` with the endpoints that match your local services:

```bash
VITE_BACKEND_URL=http://localhost:8998
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=service
VITE_KEYCLOAK_CLIENT_ID=mini-mart-fe
```

## Run locally
```bash
npm install
npm run dev
```

## Auth flow
- Uses `keycloak-js` with **Authorization Code Flow + PKCE (S256)** and `onLoad: "check-sso"`.
- Silent SSO is enabled via `public/silent-check-sso.html`.
- Access tokens are kept in memory through `AuthProvider`; refresh runs via `updateToken(30)` before calls.
- HTTP client attaches `Authorization: Bearer <token>` and retries once on 401 before logging out.
- Protected routes: `/checkout`, `/account`, `/admin` (admin UI requires `admin` role; backend must still enforce).

## Where to plug the backend
- API wrapper: `src/shared/api/http.ts` (Axios instance with refresh + retry logic).
- Keycloak bootstrap: `src/features/auth/keycloak.ts` and `src/features/auth/authService.ts`.
- React context + gates: `src/features/auth/AuthProvider.tsx`, `src/features/auth/AuthGate.tsx`.
- `/api/me` demo call is triggered once authenticated (see Home/Account pages in `src/App.tsx`).

Login via the header button to start the Keycloak redirect; after login you will see a greeting and the `/api/me` payload when the backend is reachable.
