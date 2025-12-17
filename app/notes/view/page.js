'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { ArrowLeft, Download, FileText, AlertCircle } from 'lucide-react';

function DocumentViewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileId = searchParams.get('fileId');
  const filePath = searchParams.get('path');
  const subject = searchParams.get('subject');

  useEffect(() => {
    if (!fileId && !filePath) {
      setError('No file specified');
      setLoading(false);
      return;
    }

    const fetchFileData = async () => {
      try {
        if (fileId) {
          const infoRes = await fetch(`/api/public-files?id=${fileId}`);
          if (!infoRes.ok) throw new Error('Failed to fetch file info');
          const infoData = await infoRes.json();
          setFileInfo(infoData.file);

          if (infoData.file?.file_path) {
            const viewRes = await fetch(`/api/public-files?view=${encodeURIComponent(infoData.file.file_path)}`);
            if (!viewRes.ok) throw new Error('Failed to get view URL');
            const viewData = await viewRes.json();
            setFileUrl(viewData.url);
          }
        } else if (filePath) {
          const viewRes = await fetch(`/api/public-files?view=${encodeURIComponent(filePath)}`);
          if (!viewRes.ok) throw new Error('Failed to get view URL');
          const viewData = await viewRes.json();
          setFileUrl(viewData.url);
        }
      } catch (err) {
        console.error('Error loading file:', err);
        setError(err.message || 'Failed to load file');
      } finally {
        setLoading(false);
      }
    };

    fetchFileData();
  }, [fileId, filePath]);

  const handleDownload = () => {
    if (fileInfo?.file_path) {
      window.open(`/api/public-files?download=${encodeURIComponent(fileInfo.file_path)}`, '_blank');
    } else if (filePath) {
      window.open(`/api/public-files?download=${encodeURIComponent(filePath)}`, '_blank');
    }
  };

  const getFileExtension = (filename) => {
    return filename?.split('.').pop()?.toLowerCase() || '';
  };

  const isPdf = (filename) => getFileExtension(filename) === 'pdf';
  const isImage = (filename) => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(getFileExtension(filename));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Document</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const filename = fileInfo?.filename || filePath?.split('/').pop() || 'Document';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="border-l border-blue-700 pl-4">
              <h1 className="font-semibold text-lg truncate max-w-md">{filename}</h1>
              {subject && <p className="text-sm text-blue-200">{decodeURIComponent(subject)}</p>}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-amber-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-amber-500 transition font-medium"
          >
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </header>

      {/* Document Viewer */}
      <main className="flex-1 p-4">
        <div className="container mx-auto h-full">
          {fileUrl ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[calc(100vh-140px)]">
              {isPdf(filename) ? (
                <iframe
                  src={fileUrl}
                  className="w-full h-full"
                  title={filename}
                />
              ) : isImage(filename) ? (
                <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
                  <img
                    src={fileUrl}
                    alt={filename}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="text-gray-400 mb-4" size={64} />
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Preview not available</h2>
                  <p className="text-gray-500 mb-6">This file type cannot be previewed in the browser.</p>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition"
                  >
                    <Download size={20} />
                    <span>Download to View</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
              <p className="text-gray-600">Unable to load document preview</p>
            </div>
          )}
        </div>
      </main>

      {/* File Info Footer */}
      {fileInfo && (
        <footer className="bg-white border-t py-3 px-6">
          <div className="container mx-auto flex flex-wrap items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              {fileInfo.uploader && <span>Uploaded by: <strong>{fileInfo.uploader}</strong></span>}
              {fileInfo.created_at && <span>Date: {new Date(fileInfo.created_at).toLocaleDateString()}</span>}
              {fileInfo.file_size && <span>Size: {(fileInfo.file_size / 1024).toFixed(1)} KB</span>}
            </div>
            {fileInfo.description && (
              <p className="text-gray-500 italic">{fileInfo.description}</p>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <DocumentViewer />
    </Suspense>
  );
}
