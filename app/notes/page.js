'use client';
import Link from 'next/link';
import Nav from '../components/Nav';
import { Atom, TestTube, Calculator, Dna, Cpu, Book, CheckCircle, Download, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotesPage() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subjects = [
    { icon: Atom, name: 'Physics', chapters: '15+', color: 'from-blue-500 to-blue-700', id: 'physics' },
    { icon: TestTube, name: 'Chemistry', chapters: '12+', color: 'from-green-500 to-green-700', id: 'chemistry' },
    { icon: Calculator, name: 'Mathematics', chapters: '20+', color: 'from-purple-500 to-purple-700', id: 'math' },
    { icon: Dna, name: 'Biology', chapters: '18+', color: 'from-teal-500 to-teal-700', id: 'biology' },
    { icon: Cpu, name: 'Computer Science', chapters: '10+', color: 'from-indigo-500 to-indigo-700', id: 'cs' },
    { icon: Book, name: 'English', chapters: 'Multiple Topics', color: 'from-red-500 to-red-700', id: 'english' },
    { icon: Book, name: 'Other', chapters: 'Various', color: 'from-gray-400 to-gray-600', id: 'other' },
  ];

  useEffect(() => {
    fetchPublicFiles();
  }, []);

  const fetchPublicFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/public-files');
      const contentType = res.headers.get('content-type') || '';

      if (!res.ok) {
        // Try to read body as JSON first, fallback to text
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const jsonErr = await res.json();
          console.error('API /api/public-files returned non-OK (json):', res.status, jsonErr);
          setError(jsonErr?.error || `Failed to load files: ${res.status}`);
        } else {
          const text = await res.text();
          console.error('API /api/public-files returned non-OK:', res.status, text);
          setError(`Failed to load files: ${res.status}`);
        }
        setFiles([]);
        return;
      }

      if (!contentType.includes('application/json')) {
        const text = await res.text();
        console.error('API /api/public-files returned non-JSON response:', text);
        setError('Unexpected response from server');
        setFiles([]);
        return;
      }

      const json = await res.json();
      setFiles(json.files || []);
    } catch (err) {
      console.error('Failed to load public files', err);
      setError(err?.message || 'Unknown error');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Browse Notes by Subject</h1>
          <p className="text-xl text-gray-200">Find organized, concise, and exam-focused notes for all major subjects.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="font-semibold text-gray-700">Filter by Grade:</label>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900">
                <option value="all">All Grades</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div className="relative w-full md:w-96">
              <input type="text" placeholder="Search subjects..." className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900" />
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => {
              const IconComponent = subject.icon;
              const subjectFiles = files.filter((f) => (f.subject || 'Other') === subject.name || (subject.name === 'Other' && !f.subject));

              return (
                <div key={subject.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                  <div className={`bg-gradient-to-br ${subject.color} p-8 text-white`}>
                    <div className="mb-4">
                      <IconComponent size={64} />
                    </div>
                    <h3 className="text-3xl font-bold">{subject.name}</h3>
                  </div>
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Grade 9-12</span>
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">{subject.chapters} Chapters</span>
                      </div>
                    </div>

                    {/* Show uploaded files for this subject */}
                    {(() => {
                      if (loading) return <p className="text-gray-400">Loading files...</p>;
                      if (subjectFiles.length === 0) {
                        return error ? (
                          <div className="text-red-500 text-sm">{error}</div>
                        ) : (
                          <p className="text-gray-500">No uploads for this subject yet.</p>
                        );
                      }

                      return (
                        <ul className="space-y-3 mb-6">
                          {subjectFiles.slice(0, 6).map((f) => (
                            <li key={f.id} className="flex items-center justify-between border border-gray-100 rounded p-3">
                              <div>
                                <div className="font-semibold text-gray-800">{f.filename}</div>
                                <div className="text-xs text-gray-500">{f.uploader ? `Uploaded by ${f.uploader}` : ''} • {new Date(f.created_at).toLocaleDateString()}</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => router.push(`/notes/view?fileId=${f.id}&subject=${encodeURIComponent(subject.name)}`)} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition">View</button>
                                <button onClick={() => router.push(`/pricing?fileId=${f.id}&subject=${encodeURIComponent(subject.name)}`)} className="bg-amber-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-amber-500 transition">Download</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      );
                    })()}

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-950 transition">View Online</button>
                      <button className="bg-amber-400 text-blue-900 px-6 py-3 rounded-lg hover:bg-amber-500 transition">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-950 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Can't find what you're looking for?</h2>
          <p className="text-xl mb-8 text-gray-200">Request notes for specific topics and we'll add them!</p>
          <Link href="/contact" className="bg-amber-400 text-blue-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-amber-500 transition inline-block">
            Contact Us
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">&copy; 2025 Edusphere Central. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
