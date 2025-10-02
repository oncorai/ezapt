'use client';

import { SortOption } from '@/lib/types';

interface FilterSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  bedroomFilter: number | null;
  onBedroomChange: (bedrooms: number | null) => void;
  minRent: number | null;
  maxRent: number | null;
  onMinRentChange: (min: number | null) => void;
  onMaxRentChange: (max: number | null) => void;
}

export default function FilterSort({
  sortBy,
  onSortChange,
  bedroomFilter,
  onBedroomChange,
  minRent,
  maxRent,
  onMinRentChange,
  onMaxRentChange,
}: FilterSortProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="savings">Biggest Savings</option>
            <option value="rent">Lowest Rent</option>
            <option value="ending">Ending Soon</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <select
            value={bedroomFilter ?? ''}
            onChange={(e) => onBedroomChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="">All</option>
            <option value="0">Studio</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3+ Beds</option>
          </select>
        </div>

        {/* Min Rent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Rent
          </label>
          <input
            type="number"
            value={minRent ?? ''}
            onChange={(e) => onMinRentChange(e.target.value ? Number(e.target.value) : null)}
            placeholder="$0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {/* Max Rent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Rent
          </label>
          <input
            type="number"
            value={maxRent ?? ''}
            onChange={(e) => onMaxRentChange(e.target.value ? Number(e.target.value) : null)}
            placeholder="Any"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
      </div>
    </div>
  );
}
