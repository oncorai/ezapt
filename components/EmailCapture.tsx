'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  city?: string;
}

export default function EmailCapture({ city }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city: city || '' }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks for subscribing! We\'ll notify you of new deals.');
        setEmail('');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2 text-gray-900">
        Get Notified of New Deals
      </h3>
      <p className="text-gray-600 mb-4">
        Sign up to receive email alerts when new move-in specials are found in your area.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
