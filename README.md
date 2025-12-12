# Mini Mart Frontend

A React single-page experience inspired by the provided mock, built to pair with a Java Spring Boot backend and SSO authentication.

## Getting started

```bash
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173` by default.

## Notes
- The Login button launches a modal with username/password, forgot password, register, and Keycloak SSO entry points. Update `VITE_BACKEND_URL` and `VITE_KEYCLOAK_URL` in your environment (or `.env.local`) to point at your Spring Boot and Keycloak servers.
- The modal handlers include inline comments showing where to POST or redirect to backend URLs for login, registration, and password recovery.
- Cart and navigation buttons are visually styled and ready for backend integration.
