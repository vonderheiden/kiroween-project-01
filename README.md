# Full-Stack To-Do App

A modern to-do application built with React, Tailwind CSS, and Supabase.

## Features

- User authentication (sign up/sign in)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Real-time updates across devices
- Secure data storage with Row Level Security

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Realtime)
- **Deployment**: Render (or any static host)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-setup.sql`
3. Get your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Render

Update `render.yaml`:

```yaml
services:
  - type: web
    name: todo-app-supabase
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: dist
```

Then connect your repository to Render and add environment variables in the dashboard.

## Database Schema

```sql
tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  text TEXT,
  completed BOOLEAN,
  created_at TIMESTAMP
)
```

## Security

- Row Level Security (RLS) ensures users can only access their own tasks
- Authentication handled by Supabase Auth
- Environment variables keep credentials secure
