import { kv } from '@vercel/kv';
import { v4 as uuidv4 } from 'uuid';
import type { Deal, EmailSignup, DealFormData } from './types';
import { calculateEffectiveRent } from './utils';

// KV Storage Keys
const DEALS_KEY = 'deals';
const EMAILS_KEY = 'emails';

// Data operations using Vercel KV
async function getDealsFromKV(): Promise<Deal[]> {
  try {
    const deals = await kv.get<Deal[]>(DEALS_KEY);
    return deals || [];
  } catch (error) {
    console.error('Error reading deals from KV:', error);
    return [];
  }
}

async function setDealsInKV(deals: Deal[]): Promise<void> {
  try {
    await kv.set(DEALS_KEY, deals);
  } catch (error) {
    console.error('Error writing deals to KV:', error);
    throw error;
  }
}

async function getEmailsFromKV(): Promise<EmailSignup[]> {
  try {
    const emails = await kv.get<EmailSignup[]>(EMAILS_KEY);
    return emails || [];
  } catch (error) {
    console.error('Error reading emails from KV:', error);
    return [];
  }
}

async function setEmailsInKV(emails: EmailSignup[]): Promise<void> {
  try {
    await kv.set(EMAILS_KEY, emails);
  } catch (error) {
    console.error('Error writing emails to KV:', error);
    throw error;
  }
}

// Deal CRUD operations
export async function getAllDeals(): Promise<Deal[]> {
  const deals = await getDealsFromKV();
  return deals.filter(deal => deal.is_active);
}

export async function getDealsByCity(city: string): Promise<Deal[]> {
  const deals = await getDealsFromKV();
  return deals.filter(
    deal => deal.is_active && deal.city.toLowerCase() === city.toLowerCase()
  );
}

export async function getDealById(id: string): Promise<Deal | null> {
  const deals = await getDealsFromKV();
  return deals.find(deal => deal.id === id) || null;
}

export async function addDeal(formData: DealFormData): Promise<Deal> {
  const deals = await getDealsFromKV();

  const effectiveRent = calculateEffectiveRent(
    formData.regular_rent,
    formData.deal_description
  );

  const newDeal: Deal = {
    id: uuidv4(),
    ...formData,
    effective_rent: effectiveRent,
    found_at: new Date().toISOString().split('T')[0],
    is_active: true,
  };

  deals.push(newDeal);
  await setDealsInKV(deals);

  return newDeal;
}

export async function updateDeal(id: string, formData: Partial<DealFormData>): Promise<Deal | null> {
  const deals = await getDealsFromKV();
  const dealIndex = deals.findIndex(deal => deal.id === id);

  if (dealIndex === -1) return null;

  const existingDeal = deals[dealIndex];
  const updatedDeal: Deal = {
    ...existingDeal,
    ...formData,
  };

  // Recalculate effective rent if regular_rent or deal_description changed
  if (formData.regular_rent || formData.deal_description) {
    updatedDeal.effective_rent = calculateEffectiveRent(
      updatedDeal.regular_rent,
      updatedDeal.deal_description
    );
  }

  deals[dealIndex] = updatedDeal;
  await setDealsInKV(deals);

  return updatedDeal;
}

export async function deleteDeal(id: string): Promise<boolean> {
  const deals = await getDealsFromKV();
  const dealIndex = deals.findIndex(deal => deal.id === id);

  if (dealIndex === -1) return false;

  // Soft delete by marking as inactive
  deals[dealIndex].is_active = false;
  await setDealsInKV(deals);

  return true;
}

// Email operations
export async function addEmail(email: string, city: string): Promise<EmailSignup> {
  const emails = await getEmailsFromKV();

  // Check if email already exists
  const existingEmail = emails.find(e => e.email === email);
  if (existingEmail) {
    return existingEmail;
  }

  const newEmail: EmailSignup = {
    email,
    city,
    subscribed_at: new Date().toISOString(),
  };

  emails.push(newEmail);
  await setEmailsInKV(emails);

  return newEmail;
}

export async function getAllEmails(): Promise<EmailSignup[]> {
  return await getEmailsFromKV();
}

// Stats
export async function getStats() {
  const deals = await getDealsFromKV();
  const emails = await getEmailsFromKV();
  const activeDeals = deals.filter(deal => deal.is_active);

  if (activeDeals.length === 0) {
    return {
      totalDeals: 0,
      averageSavings: 0,
      totalEmails: emails.length,
      citiesCovered: 0,
    };
  }

  const totalSavings = activeDeals.reduce((sum, deal) => {
    return sum + (deal.regular_rent - deal.effective_rent);
  }, 0);

  const cities = new Set(activeDeals.map(deal => deal.city));

  return {
    totalDeals: activeDeals.length,
    averageSavings: Math.round(totalSavings / activeDeals.length * 12), // Annual savings
    totalEmails: emails.length,
    citiesCovered: cities.size,
  };
}
