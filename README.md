# TingTing Tools - AI Office Automation Platform

## Setup

```bash
cd tingting-app
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub: `git init && git add . && git commit -m "init" && gh repo create tingting-tools --public --push`
2. Connect repo to vercel.com
3. Add env vars in Vercel dashboard
4. Deploy

## Stack
- Next.js 16 + Tailwind CSS
- better-auth (email/password)
- OpenRouter AI (MiniMax M3 free / GLM 5.2 free)
- Vercel deployment
