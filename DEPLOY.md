## Deploy to Vercel (one‑click)

1. Push this repo to GitHub.
2. Go to Vercel and import the repository.
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy. Done.

### Notes
- No server needed; mock API is dev-only. For production, connect EmailJS/Firebase and deploy serverless functions if required.
- Add environment variables in Vercel Settings → Environment Variables (see `.env.example`).


