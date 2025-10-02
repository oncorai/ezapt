'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDealForm from '@/components/AdminDealForm';
import { Deal, DealFormData } from '@/lib/types';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [deals, setDeals] = useState<Deal[]>([]);
  const [stats, setStats] = useState({ totalDeals: 0, totalEmails: 0, citiesCovered: 0 });
  const [loading, setLoading] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  useEffect(() => {
    if (authenticated) {
      fetchDeals();
      fetchStats();
    }
  }, [authenticated]);

  const fetchDeals = async () => {
    try {
      const response = await fetch('/api/deals');
      const data = await response.json();
      setDeals(data.deals || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check - in production, use proper authentication
    // Temporary hardcoded password for MVP testing
    if (password === 'ezapt2025') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleAddDeal = async (formData: DealFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchDeals();
        await fetchStats();
        alert('Deal added successfully!');
      } else {
        alert('Failed to add deal');
      }
    } catch (error) {
      console.error('Error adding deal:', error);
      alert('Error adding deal');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDeal = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      const response = await fetch(`/api/deals?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchDeals();
        await fetchStats();
        alert('Deal deleted successfully!');
      } else {
        alert('Failed to delete deal');
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      alert('Error deleting deal');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">RentDeals Admin</h1>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <button
                onClick={() => setAuthenticated(false)}
                className="text-gray-600 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalDeals}
            </div>
            <div className="text-gray-600">Total Deals</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.totalEmails}
            </div>
            <div className="text-gray-600">Email Signups</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.citiesCovered}
            </div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
        </div>

        {/* Add Deal Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {editingDeal ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <AdminDealForm
            onSubmit={handleAddDeal}
            initialData={editingDeal || undefined}
            onCancel={editingDeal ? () => setEditingDeal(null) : undefined}
          />
        </div>

        {/* Deals List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Deals ({deals.length})
          </h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deals.map(deal => (
                    <tr key={deal.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {deal.property_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deal.bedrooms} bed{deal.bedrooms !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {deal.city}, {deal.state}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {deal.deal_description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${deal.effective_rent}/mo
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${deal.regular_rent}/mo
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteDeal(deal.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
