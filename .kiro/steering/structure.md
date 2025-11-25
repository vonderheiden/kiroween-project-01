---
inclusion: always
---

# Project Structure

## File Organization

```
.
├── index.html              # Vite entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── supabase-setup.sql      # Database schema and RLS policies
├── render.yaml             # Render deployment configuration
├── .env.example            # Environment variables template
├── src/
│   ├── main.jsx            # React app entry point
│   ├── App.jsx             # Root component (auth state management)
│   ├── index.css           # Tailwind imports and global styles
│   ├── lib/
│   │   └── supabase.js     # Supabase client configuration
│   └── components/
│       ├── Auth.jsx        # Authentication component
│       └── TodoList.jsx    # Task management component
└── .kiro/
    └── steering/           # AI assistant guidance documents
```

## Code Organization

### src/App.jsx

- Root component managing authentication state
- Handles session initialization and auth state changes
- Conditionally renders Auth or TodoList based on session

### src/components/Auth.jsx

- Sign up and sign in forms
- Email/password authentication via Supabase Auth
- Toggle between sign up and sign in modes
- Error and success message handling

### src/components/TodoList.jsx

- Main task management interface
- CRUD operations via Supabase client
- Realtime subscriptions for live updates
- Inline editing with save/cancel
- Sign out functionality

### src/lib/supabase.js

- Supabase client initialization
- Environment variable validation
- Exported client for use across components

## Conventions

- React functional components with hooks
- Tailwind utility classes for styling
- Supabase client SDK for all backend operations
- Realtime subscriptions for data synchronization
- Row Level Security enforced at database level
- Environment variables prefixed with `VITE_`
