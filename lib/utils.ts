import type { Deal, DealSavings, DealFilters, SortOption } from './types';

// Calculation functions (client-safe)
export function calculateEffectiveRent(
  regularRent: number,
  dealDescription: string,
  leaseTerm: number = 12
): number {
  // Parse "X weeks free" or "X months free"
  const weeksMatch = dealDescription.match(/(\d+)\s+weeks?\s+free/i);
  const monthsMatch = dealDescription.match(/(\d+)\s+months?\s+free/i);

  let freeMonths = 0;
  if (weeksMatch) {
    freeMonths = parseInt(weeksMatch[1]) / 4;
  } else if (monthsMatch) {
    freeMonths = parseInt(monthsMatch[1]);
  }

  const totalPaid = regularRent * (leaseTerm - freeMonths);
  return Math.round(totalPaid / leaseTerm);
}

export function calculateSavings(
  regularRent: number,
  effectiveRent: number,
  leaseTerm: number = 12
): DealSavings {
  return {
    monthlySavings: regularRent - effectiveRent,
    totalSavings: (regularRent - effectiveRent) * leaseTerm,
    percentageSavings: Math.round(((regularRent - effectiveRent) / regularRent) * 100),
  };
}

// Filtering and sorting (client-safe)
export function filterDeals(deals: Deal[], filters: DealFilters): Deal[] {
  let filtered = [...deals];

  if (filters.bedrooms) {
    filtered = filtered.filter(deal => deal.bedrooms === filters.bedrooms);
  }

  if (filters.minRent) {
    filtered = filtered.filter(deal => deal.effective_rent >= filters.minRent!);
  }

  if (filters.maxRent) {
    filtered = filtered.filter(deal => deal.effective_rent <= filters.maxRent!);
  }

  return filtered;
}

export function sortDeals(deals: Deal[], sortBy: SortOption): Deal[] {
  const sorted = [...deals];

  switch (sortBy) {
    case 'savings':
      return sorted.sort((a, b) => {
        const savingsA = a.regular_rent - a.effective_rent;
        const savingsB = b.regular_rent - b.effective_rent;
        return savingsB - savingsA;
      });

    case 'rent':
      return sorted.sort((a, b) => a.effective_rent - b.effective_rent);

    case 'ending':
      return sorted.sort((a, b) => {
        if (!a.deal_expires_at) return 1;
        if (!b.deal_expires_at) return -1;
        return new Date(a.deal_expires_at).getTime() - new Date(b.deal_expires_at).getTime();
      });

    case 'newest':
      return sorted.sort((a, b) => {
        return new Date(b.found_at).getTime() - new Date(a.found_at).getTime();
      });

    default:
      return sorted;
  }
}
