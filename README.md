# Pre-Yeah — MERN Monorepo

## Structure
- `server/` — Express + MongoDB API (deploy to Render)
- `client/` — React 19 + Vite SPA (deploy to Vercel)

## Local Development

```bash
npm run install:all   # installs both server and client deps
cp server/.env.example server/.env   # fill in MONGO_URI, JWT secrets
cp client/.env.example client/.env   # set VITE_API_URL
npm run dev            # runs server (5000) + client (5173) concurrently
```

Health check once server is running: `GET http://localhost:5000/api/health`

## Deployment
- **Render (server)**: root dir `server/`, build `npm install`, start `npm start`. Set env vars from `.env.example`.
- **Vercel (client)**: root dir `client/`, build `npm run build`, output `dist/`. Set `VITE_API_URL` to the Render URL + `/api`.
- **MongoDB Atlas**: create cluster, whitelist Render's outbound IP (or `0.0.0.0/0` for simplicity), put connection string in `MONGO_URI`.

## Status
Phase 1 complete: infra/scaffolding only. No business logic, no models, no routes yet.
