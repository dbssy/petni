import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function GET() {
  try {
    const pets = await db.pet.findMany({
      orderBy: { name: 'asc' },
      include: { customer: true },
    });
    return NextResponse.json(pets);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch pets' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, customerId, age, species, breed, gender } = await req.json();

    const pet = await db.pet.create({
      data: {
        name,
        customerId,
        age,
        species,
        breed,
        gender,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.log('[PETS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
