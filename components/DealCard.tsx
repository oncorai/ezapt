import Image from 'next/image';
import { Deal } from '@/lib/types';
import { calculateSavings } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const savings = calculateSavings(deal.regular_rent, deal.effective_rent);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {deal.image_url ? (
          <Image
            src={deal.image_url}
            alt={deal.property_name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {deal.deal_description.match(/(\d+\s+(?:weeks?|months?)\s+free)/i)?.[0] || 'Special Deal'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{deal.property_name}</h3>
        <p className="text-sm text-gray-600 mb-3">{deal.address}, {deal.city}, {deal.state}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through text-sm">
              Regular: ${deal.regular_rent.toLocaleString()}/mo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${deal.effective_rent.toLocaleString()}/mo
            </span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-800 font-semibold">
            Save ${savings.totalSavings.toLocaleString()} total
          </p>
          <p className="text-green-600 text-sm">
            (${savings.monthlySavings.toLocaleString()}/month effective discount)
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span>{deal.bedrooms} bed{deal.bedrooms !== 1 ? 's' : ''}</span>
          {deal.deal_expires_at && (
            <span className="text-orange-600">
              Ends: {formatDate(deal.deal_expires_at)}
            </span>
          )}
        </div>

        <a
          href={deal.listing_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-semibold transition-colors"
        >
          View Deal on Apartments.com
        </a>
      </div>
    </div>
  );
}
