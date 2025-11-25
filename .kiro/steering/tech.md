---
inclusion: always
---

# Technology Stack

## Core Technologies

- **React 18**: Component-based UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service (PostgreSQL + Auth + Realtime)

## Architecture

- Component-based React architecture
- `App.jsx`: Root component handling auth state
- `Auth.jsx`: Authentication UI (sign up/sign in)
- `TodoList.jsx`: Main task management component
- `supabase.js`: Supabase client configuration

## Database

- **PostgreSQL** via Supabase
- Row Level Security (RLS) for data isolation
- Realtime subscriptions for live updates
- User authentication with Supabase Auth

## Deployment

- **Platform**: Render (or any static host)
- **Config**: `render.yaml` defines deployment settings
- Build step: `npm install && npm run build`
- Output directory: `dist`

## Common Commands

```bash
# Install dependencies
npm install

# Local development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Create a `.env` file with:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run `supabase-setup.sql` in your Supabase SQL Editor to create the database schema.
