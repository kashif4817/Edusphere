import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

function createSupabaseClient(key) {
  if (!key) return null
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } })
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const download = searchParams.get('download')
    const id = searchParams.get('id')

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const serviceClient = createSupabaseClient(serviceKey)
    const anonClient = createSupabaseClient(anonKey)
    const client = serviceClient ?? anonClient

    if (!client) {
      return NextResponse.json({ error: 'Supabase keys are not configured. Set SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.' }, { status: 500 })
    }

    if (download) {
      const { data, error } = await client.storage.from('user-files').createSignedUrl(download, 60)
      if (error) {
        console.error('createSignedUrl error', error)
        return NextResponse.json({ error: 'Failed to create signed URL' }, { status: 500 })
      }
      const signedUrl = data?.signedUrl || data?.signedURL
      if (!signedUrl) return NextResponse.json({ error: 'Signed URL not available' }, { status: 500 })
      return NextResponse.redirect(signedUrl)
    }

    const view = searchParams.get('view')
    if (view) {
      const { data, error } = await client.storage.from('user-files').createSignedUrl(view, 300)
      if (error) {
        console.error('createSignedUrl error for view', error)
        return NextResponse.json({ error: 'Failed to create signed URL' }, { status: 500 })
      }
      const signedUrl = data?.signedUrl || data?.signedURL
      if (!signedUrl) return NextResponse.json({ error: 'Signed URL not available' }, { status: 500 })
      return NextResponse.json({ url: signedUrl })
    }

    if (id) {
      const { data: single, error: singleErr } = await client
        .from('files')
        .select('id, filename, file_path, file_size, subject, grade, description, created_at, users(name)')
        .eq('id', id)
        .single()

      if (singleErr) {
        console.error('Error fetching single file', singleErr)
        return NextResponse.json({ error: singleErr.message || 'Failed to fetch file' }, { status: 500 })
      }

      const fileObj = single
        ? {
            id: single.id,
            filename: single.filename,
            file_path: single.file_path,
            file_size: single.file_size,
            subject: single.subject,
            grade: single.grade,
            description: single.description,
            created_at: single.created_at,
            uploader: single.users && single.users.length ? single.users[0].name : null,
          }
        : null

      return NextResponse.json({ file: fileObj })
    }

    const { data, error } = await client
      .from('files')
      .select('id, filename, file_path, file_size, subject, grade, description, created_at, users(name)')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.error('Error fetching files', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch files' }, { status: 500 })
    }

    const files = (data || []).map((f) => ({
      id: f.id,
      filename: f.filename,
      file_path: f.file_path,
      file_size: f.file_size,
      subject: f.subject,
      grade: f.grade,
      description: f.description,
      created_at: f.created_at,
      uploader: f.users && f.users.length ? f.users[0].name : null,
    }))

    return NextResponse.json({ files })
  } catch (err) {
    console.error('public-files impl error', err)
    return NextResponse.json({ error: err?.message || 'Unknown server error' }, { status: 500 })
  }
}
