"use client";
import Nav from '../components/Nav';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [plan, setPlan] = useState(searchParams.get('plan') || 'standard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fileId = searchParams.get('fileId');
    if (!fileId) return;
    setLoading(true);
    fetch(`/api/public-files?id=${encodeURIComponent(fileId)}`)
      .then((r) => r.json())
      .then((json) => setFile(json.file))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const confirmPurchase = () => {
    // Placeholder: In a real app this would call a payments API
    alert(`Confirmed purchase of ${plan} plan for file ${file?.filename || ''}`);
    router.push('/');
  };

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {loading && <p>Loading selected file...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {file && (
        <div className="bg-white rounded p-4 mb-6">
          <div className="font-semibold">{file.filename}</div>
          <div className="text-sm text-gray-500">{file.subject} • {new Date(file.created_at).toLocaleDateString()}</div>
        </div>
      )}

      <div className="bg-white rounded p-6">
        <h2 className="font-semibold text-lg mb-4">Choose Plan</h2>
        <select value={plan} onChange={(e) => setPlan(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded">
          <option value="free">Free</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>

        <button onClick={confirmPurchase} className="bg-blue-900 text-white px-6 py-3 rounded-lg">Confirm Purchase</button>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Nav />
      <Suspense fallback={<div className="container mx-auto px-6 py-12">Loading...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
