'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DealCard from '@/components/DealCard';
import EmailCapture from '@/components/EmailCapture';
import FilterSort from '@/components/FilterSort';
import { Deal, SortOption, DealFilters } from '@/lib/types';
import { filterDeals, sortDeals } from '@/lib/utils';

export default function CityDealsPage() {
  const params = useParams();
  const cityParam = params.city as string;
  const cityName = cityParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('savings');
  const [filters, setFilters] = useState<DealFilters>({});

  useEffect(() => {
    async function fetchDeals() {
      try {
        const response = await fetch(`/api/deals?city=${encodeURIComponent(cityName)}`);
        const data = await response.json();
        setDeals(data.deals || []);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, [cityName]);

  const filteredDeals = filterDeals(deals, filters);
  const sortedDeals = sortDeals(filteredDeals, sortBy);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              EzApt
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Apartment Deals in {cityName}
          </h1>
          <p className="text-gray-600">
            {loading
              ? 'Loading deals...'
              : sortedDeals.length > 0
              ? `Found ${sortedDeals.length} deal${sortedDeals.length !== 1 ? 's' : ''} with move-in specials`
              : 'No deals found in this city yet'}
          </p>
        </div>

        {!loading && sortedDeals.length > 0 && (
          <>
            {/* Filters and Sorting */}
            <FilterSort
              sortBy={sortBy}
              onSortChange={setSortBy}
              bedroomFilter={filters.bedrooms || null}
              onBedroomChange={(bedrooms) =>
                setFilters(prev => ({ ...prev, bedrooms: bedrooms || undefined }))
              }
              minRent={filters.minRent || null}
              maxRent={filters.maxRent || null}
              onMinRentChange={(min) =>
                setFilters(prev => ({ ...prev, minRent: min || undefined }))
              }
              onMaxRentChange={(max) =>
                setFilters(prev => ({ ...prev, maxRent: max || undefined }))
              }
            />

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {sortedDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </>
        )}

        {!loading && sortedDeals.length === 0 && deals.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              No deals match your current filters. Try adjusting your search criteria.
            </p>
          </div>
        )}

        {!loading && deals.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Deals Yet in {cityName}
            </h2>
            <p className="text-gray-600 mb-6">
              We haven&apos;t found any move-in specials in this city yet, but we&apos;re always adding new deals.
            </p>
            <p className="text-gray-600 mb-6">
              Sign up below to get notified when deals become available in {cityName}!
            </p>
          </div>
        )}

        {/* Email Capture */}
        <EmailCapture city={cityName} />

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Search Another City
          </Link>
        </div>
      </div>
    </div>
  );
}
