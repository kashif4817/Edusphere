# Edusphere Central - Next.js Application

A clean Next.js implementation of Edusphere Central with Supabase backend.

## ✅ All Features Implemented

**Authentication**
- Login/Signup with Supabase
- No password hashing (as requested)
- Multi-user support with user.id filtering
- API calls inline in components

**File Management**
- PDF upload/download (max 10MB)
- User-specific files (filtered by user.id)
- Subject and grade metadata
- Delete functionality

**Pages** (All matching HTML design):
- /login - Login and signup
- /home - Home page
- /my-files - File management
- /notes - Notes and subjects
- /about - About page
- /contact - Contact page
- /pricing - Pricing page

## 🚀 Quick Start

1. Your Supabase credentials are already configured in `.env.local`!

2. Create tables in Supabase (SQL Editor):

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  subject TEXT,
  grade TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON files FOR ALL USING (true) WITH CHECK (true);
```

3. Create storage bucket "user-files" in Supabase Storage (make it public)

4. Run the app:

```bash
cd my-app
npm run dev
```

Visit http://localhost:3000

## 📝 Notes

- Same UI as your HTML files
- Tailwind CSS with exact colors (royal-blue, teal, yellow)
- No API folder - all calls inline as requested
- Users only see their own files

See SUPABASE_SETUP.md for detailed instructions.
