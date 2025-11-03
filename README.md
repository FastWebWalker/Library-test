# Library Test — Full‑Stack Interview Project

A small full‑stack library app used as a coding exercise for interview. It demonstrates a pragmatic React + Node/Express + PostgreSQL stack with Docker, a production‑style client served by Nginx, and a simple REST API powered by Prisma.

## Features
- Landing page with a clean library theme (MUI)
- Browse books and view book details
- CRUD REST API for books (title, author, imageUrl, description)
- PostgreSQL via Prisma
- Docker Compose for local development
- Client tests with Vitest + React Testing Library

## Tech Stack
- Client: React 19, Vite, TypeScript, React Router, MUI
- Server: Node 20, Express 5, Prisma, Zod
- DB: PostgreSQL 15
- Infra: Docker Compose, Nginx (templated), Render (example deploy)

## Repository Structure
- `client/` — React app served by Nginx in production
- `server/` — Express API, Prisma client
- `docker-compose.yml` — local stack (client + server + postgres + pgAdmin)
- `.env` — local development defaults

## Quick Start (Docker Compose)
Prereqs: Docker Desktop (or Docker + Compose).

1) From repo root, build and run:
```
docker compose up -d --build
```
2) Open the app:
- Client: http://localhost (Nginx on port 80)
- Server API: http://localhost:5000/api
- pgAdmin: http://localhost:5050 (user: `admin@example.com`, pass: `admin`)
- Postgres: localhost:5433 (mapped to container 5432)

The client proxies `/api/*` to the server in Docker using Nginx. The server reads `DATABASE_URL` from Compose and will create the schema on first run if no migrations are present.

## Environment Variables
- Server
  - `DATABASE_URL` — PostgreSQL connection string
  - `PORT` — API port (defaults to `5000`)
  - `DEBUG_ERRORS` — set to `true` to return detailed error JSON (development only)
- Client (Nginx)
  - `API_URL` — base URL of the server (no trailing slash, no `/api`).
    - Local (Compose): `http://server:5000` (already set in docker-compose)
    - Render (example): `https://<your-server>.onrender.com`

## Render Deployment Notes
- Client image uses Nginx templates. Set `API_URL` in the client service environment.
- Server service must have a valid `DATABASE_URL`:
  - If server runs on Render and DB is Render Postgres, use the Internal Database URL.
  - If using the External URL, append `sslmode=require`.
- On server startup, if `prisma/migrations` exists it runs `prisma migrate deploy`; otherwise it runs `prisma db push` to create the schema. This keeps the demo simple for interviews. For production, prefer checked‑in migrations.

## API
Base URL: `/api`
- `GET /api/health` → `{ ok: true }`
- `GET /api/books` → `Book[]`
- `GET /api/books/:id` → `Book`
- `POST /api/books` → create (JSON: `{ title, author, imageUrl?, description? }`)
- `PUT /api/books/:id` → update (partial)
- `DELETE /api/books/:id` → 204

Prisma `Book` model:
```
id: string (uuid)
title: string
author: string
imageUrl?: string | null
description?: string | null
createdAt: Date
```

## Local Dev (without Docker)
- Server
  - Ensure a Postgres instance and set `server/.env` or shell env `DATABASE_URL`.
  - From `server/`:
    - `npm i`
    - `npm run build`
    - `npx prisma db push`
    - `npm start`
- Client
  - From `client/`:
    - `npm i`
    - `npm run dev`
  - Vite dev server proxies `/api` to `http://localhost:5000` (see `vite.config.ts`).

## Tests (Client)
From `client/`:
```
npm i
npm run test       # watch
npm run test:run   # single run
```
Notes:
- Tests run under JSDOM (`vitest.config.ts`).
- Tests are excluded from the production TypeScript build.

## Troubleshooting
- 502 from client `/api/*`:
  - Ensure client `API_URL` points to the server and the server is reachable.
  - Nginx sets `proxy_ssl_server_name on` and `Host $proxy_host` for HTTPS upstreams.
- 500 with Prisma codes (e.g., P2021 — table not found):
  - Check server logs. Ensure `DATABASE_URL` is correct and reachable.
  - The server will provision the schema on start (migrate deploy or db push). Redeploy if needed.
- Postgres connection (external): add `?sslmode=require` to the URL if your provider enforces SSL.

## Why this project
This is a compact, interview‑ready project that shows:
- Clean separation of client and server
- Reasonable production concerns (reverse proxy, env‑driven configuration)
- Type‑safe API validation (Zod) and a simple data layer (Prisma)
- Basic test coverage on the UI

