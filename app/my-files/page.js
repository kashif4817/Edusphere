'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Nav from '../components/Nav';
import { Upload, Filter, FolderOpen, File, Database, Book, Download, Trash2, RefreshCw } from 'lucide-react';

export default function MyFilesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterSubject, setFilterSubject] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('edusphere_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user, filterSubject, filterGrade]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('files')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (filterSubject) {
        query = query.eq('subject', filterSubject);
      }
      if (filterGrade) {
        query = query.eq('grade', filterGrade);
      }

      const { data, error } = await query;

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      alert('Error loading files: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const fileInput = e.target['file-input'];
    const subject = e.target['subject-input'].value;
    const grade = e.target['grade-input'].value;
    const description = e.target['description-input'].value;
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file');
      setUploading(false);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      setUploading(false);
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      alert('Only PDF, DOC, and DOCX files are allowed');
      setUploading(false);
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: fileRecord, error: dbError } = await supabase
        .from('files')
        .insert([{
          user_id: user.id,
          filename: file.name,
          file_path: fileName,
          file_size: file.size,
          subject: subject || null,
          grade: grade || null,
          description: description || null
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      alert('File uploaded successfully!');
      e.target.reset();
      loadFiles();
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (file) => {
    try {
      const { data, error } = await supabase.storage
        .from('user-files')
        .download(file.file_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  const handleDelete = async (file) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('user-files')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      alert('File deleted successfully!');
      loadFiles();
    } catch (error) {
      alert('Delete failed: ' + error.message);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (!user) return null;

  const totalFiles = files.length;
  const totalSize = files.reduce((sum, f) => sum + (f.file_size || 0), 0);
  const totalSubjects = new Set(files.map(f => f.subject).filter(Boolean)).size;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Nav />

      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Files</h1>
          <p className="text-gray-600">Upload, manage, and download your study materials</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-blue-900">{totalFiles}</p>
              </div>
              <File className="text-blue-900 opacity-20" size={48} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Size</p>
                <p className="text-3xl font-bold text-teal-600">{formatFileSize(totalSize)}</p>
              </div>
              <Database className="text-teal-600 opacity-20" size={48} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Subjects</p>
                <p className="text-3xl font-bold text-amber-400">{totalSubjects}</p>
              </div>
              <Book className="text-amber-400 opacity-20" size={48} />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Upload className="text-blue-900" size={24} />
            Upload New File
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                <input type="file" id="file-input" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900" />
                <p className="text-xs text-gray-500 mt-1">Max 10MB. Allowed: PDF, DOC, DOCX</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select id="subject-input" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900">
                  <option value="">Select Subject</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select id="grade-input" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900">
                  <option value="">Select Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input type="text" id="description-input" placeholder="Optional description" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900" />
              </div>
            </div>
            <button type="submit" disabled={uploading} className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition flex items-center gap-2">
              <Upload size={20} />
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </form>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Filter className="text-blue-900" size={24} />
            Filter Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900">
              <option value="">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
              <option value="Other">Other</option>
            </select>
            <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900">
              <option value="">All Grades</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
            <button onClick={loadFiles} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition flex items-center gap-2">
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Files List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FolderOpen className="text-blue-900" size={24} />
            Your Files
          </h2>
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
              <p>Loading your files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FolderOpen className="mx-auto mb-4" size={48} />
              <p>No files uploaded yet. Upload your first file above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">{file.filename}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {file.subject && (
                          <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs">{file.subject}</span>
                        )}
                        {file.grade && (
                          <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs">Grade {file.grade}</span>
                        )}
                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">{formatFileSize(file.file_size)}</span>
                      </div>
                      {file.description && (
                        <p className="text-gray-600 text-sm mt-2">{file.description}</p>
                      )}
                      <p className="text-gray-400 text-xs mt-2">
                        Uploaded: {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => handleDownload(file)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <Download size={20} />
                      </button>
                      <button onClick={() => handleDelete(file)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-4 mt-6">
        <div className="container mx-auto px-4 text-center text-sm text-zinc-500">&copy; Edusphere Central</div>
      </footer>
    </div>
  );
}
