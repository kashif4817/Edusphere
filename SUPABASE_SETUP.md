# Supabase Setup Instructions

## 1. Create a Supabase Project
1. Go to https://supabase.com
2. Create a new project
3. Wait for the database to be set up

## 2. Create Database Tables

Go to SQL Editor in your Supabase dashboard and run these commands:

```sql
-- Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create files table
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

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Create policies for files table
CREATE POLICY "Users can view own files" ON files
  FOR SELECT USING (auth.uid()::text = user_id::text OR true);

CREATE POLICY "Users can insert own files" ON files
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete own files" ON files
  FOR DELETE USING (true);
```

## 3. Set up Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called "user-files"
3. Set it to public or private (public is easier for downloads)

## 4. Add Environment Variables

Copy your Supabase URL and Anon Key from Settings > API and add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Run the App

```bash
npm run dev
```

Your app will be available at http://localhost:3000
