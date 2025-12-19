"use client";
import Nav from '../components/Nav';
import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PricingContent() {
  const searchParams = useSearchParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    const fileId = searchParams?.get('fileId');
    if (!fileId) return;
    setLoadingFile(true);
    fetch(`/api/public-files?id=${encodeURIComponent(fileId)}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server returned ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((json) => {
        setSelectedFile(json.file || null);
      })
      .catch((err) => {
        console.error('Failed to load file', err);
        setFileError(err.message || 'Failed to load file');
      })
      .finally(() => setLoadingFile(false));
  }, [searchParams]);

    return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Choose the Plan That Fits Your Study Needs</h1>
          <p className="text-xl text-gray-200">Flexible pricing options designed for every student.</p>
        </div>
      </section>

      {selectedFile && (
        <div className="container mx-auto px-6 py-6">
          <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Selected File</div>
              <div className="font-semibold text-gray-800">{selectedFile.filename}</div>
              <div className="text-xs text-gray-500">{selectedFile.subject} • {new Date(selectedFile.created_at).toLocaleDateString()}</div>
            </div>
            <div>
              <a href={`/api/public-files?download=${encodeURIComponent(selectedFile.file_path)}`} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition">Download file</a>
            </div>
          </div>
        </div>
      )}

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h3>
                <div className="text-5xl font-bold text-blue-900 mb-2">$0</div>
                <p className="text-gray-600">Forever Free</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Limited notes access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Basic downloads (5/month)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="text-gray-300 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-400">Past papers</span>
                </li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-bold hover:bg-gray-300 transition">Get Started</button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform scale-105">
              <div className="text-center mb-6">
                <div className="bg-teal-600 text-white px-4 py-1 rounded-full inline-block text-sm font-semibold mb-4">POPULAR</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Standard Plan</h3>
                <div className="text-5xl font-bold text-blue-900 mb-2">$9.99</div>
                <p className="text-gray-600">Per Month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">Full access to all notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">All solved past papers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-600">100 downloads/month</span>
                </li>
              </ul>
              <button className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-blue-950 transition">Choose Standard</button>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition">
              <div className="text-center mb-6">
                <div className="bg-amber-400 text-blue-900 px-4 py-1 rounded-full inline-block text-sm font-semibold mb-4">RECOMMENDED</div>
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="text-5xl font-bold mb-2">$19.99</div>
                <p className="text-gray-200">Per Month</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                  <span>Everything in Standard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                  <span>Unlimited downloads</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full bg-amber-400 text-blue-900 py-4 rounded-lg font-bold hover:bg-amber-500 transition">Choose Premium</button>
            </div>
          </div>
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

export default function PricingPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="bg-gray-50 min-h-screen"><div className="container mx-auto px-6 py-12">Loading...</div></div>}>
        <PricingContent />
      </Suspense>
    </>
  );
}
