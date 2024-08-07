import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const formData = await request.formData();

    const newContacts = await prisma.contact.create({
        data: {
            name: formData.get('name') as string,
            phone: formData.get('phone') as string
        }
    })

    return NextResponse.json({ pesan: 'berhasil', newContacts });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    try {
        const contacts = await prisma.contact.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdAt: 'desc', // Adjust the order if needed
        },
        });

        const totalContacts = await prisma.contact.count();

        return NextResponse.json({ contacts, totalContacts });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}