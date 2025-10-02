import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Deal, EmailSignup, DataStore, DealFormData } from './types';
import { calculateEffectiveRent } from './utils';

const DATA_FILE = path.join(process.cwd(), 'lib', 'data', 'deals.json');

// File operations
async function readData(): Promise<DataStore> {
  try {
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist or is invalid, return empty structure
    return { deals: [], emails: [] };
  }
}

async function writeData(data: DataStore): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Deal CRUD operations
export async function getAllDeals(): Promise<Deal[]> {
  const data = await readData();
  return data.deals.filter(deal => deal.is_active);
}

export async function getDealsByCity(city: string): Promise<Deal[]> {
  const data = await readData();
  return data.deals.filter(
    deal => deal.is_active && deal.city.toLowerCase() === city.toLowerCase()
  );
}

export async function getDealById(id: string): Promise<Deal | null> {
  const data = await readData();
  return data.deals.find(deal => deal.id === id) || null;
}

export async function addDeal(formData: DealFormData): Promise<Deal> {
  const data = await readData();

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

  data.deals.push(newDeal);
  await writeData(data);

  return newDeal;
}

export async function updateDeal(id: string, formData: Partial<DealFormData>): Promise<Deal | null> {
  const data = await readData();
  const dealIndex = data.deals.findIndex(deal => deal.id === id);

  if (dealIndex === -1) return null;

  const existingDeal = data.deals[dealIndex];
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

  data.deals[dealIndex] = updatedDeal;
  await writeData(data);

  return updatedDeal;
}

export async function deleteDeal(id: string): Promise<boolean> {
  const data = await readData();
  const dealIndex = data.deals.findIndex(deal => deal.id === id);

  if (dealIndex === -1) return false;

  // Soft delete by marking as inactive
  data.deals[dealIndex].is_active = false;
  await writeData(data);

  return true;
}

// Email operations
export async function addEmail(email: string, city: string): Promise<EmailSignup> {
  const data = await readData();

  // Check if email already exists
  const existingEmail = data.emails.find(e => e.email === email);
  if (existingEmail) {
    return existingEmail;
  }

  const newEmail: EmailSignup = {
    email,
    city,
    subscribed_at: new Date().toISOString(),
  };

  data.emails.push(newEmail);
  await writeData(data);

  return newEmail;
}

export async function getAllEmails(): Promise<EmailSignup[]> {
  const data = await readData();
  return data.emails;
}

// Stats
export async function getStats() {
  const data = await readData();
  const activeDeals = data.deals.filter(deal => deal.is_active);

  if (activeDeals.length === 0) {
    return {
      totalDeals: 0,
      averageSavings: 0,
      totalEmails: data.emails.length,
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
    totalEmails: data.emails.length,
    citiesCovered: cities.size,
  };
}
