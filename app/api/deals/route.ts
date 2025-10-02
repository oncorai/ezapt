import { NextRequest, NextResponse } from 'next/server';
import { getAllDeals, getDealsByCity, addDeal, updateDeal, deleteDeal } from '@/lib/deals';
import type { DealFormData } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');

    if (city) {
      const deals = await getDealsByCity(city);
      return NextResponse.json({ deals });
    }

    const deals = await getAllDeals();
    return NextResponse.json({ deals });
  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const formData: DealFormData = body;

    // Basic validation
    if (!formData.property_name || !formData.city || !formData.regular_rent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newDeal = await addDeal(formData);
    return NextResponse.json({ deal: newDeal }, { status: 201 });
  } catch (error) {
    console.error('Error adding deal:', error);
    return NextResponse.json(
      { error: 'Failed to add deal' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...formData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Deal ID is required' },
        { status: 400 }
      );
    }

    const updatedDeal = await updateDeal(id, formData);

    if (!updatedDeal) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ deal: updatedDeal });
  } catch (error) {
    console.error('Error updating deal:', error);
    return NextResponse.json(
      { error: 'Failed to update deal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Deal ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteDeal(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Deal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting deal:', error);
    return NextResponse.json(
      { error: 'Failed to delete deal' },
      { status: 500 }
    );
  }
}
