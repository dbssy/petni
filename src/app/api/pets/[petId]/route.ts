import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

type Params = Promise<{ petId: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { petId } = resolvedParams;

    const values = await req.json();

    const pet = await db.pet.update({
      where: {
        id: petId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(pet);
  } catch (error) {
    console.log('[PET_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const resolvedParams = await params;
    const { petId } = resolvedParams;

    const pet = await db.pet.findUnique({
      where: {
        id: petId,
      },
      include: {
        customer: true,
        services: true,
      },
    });

    if (!pet) {
      return new NextResponse('Not found', { status: 404 });
    }

    const deletedCustomer = await db.pet.delete({
      where: {
        id: pet.id,
      },
    });

    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log('[PET_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
