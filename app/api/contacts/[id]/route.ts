import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
        const { name, phone } = await request.json();

        const updatedContact = await prisma.contact.update({
            where: {
                id: Number(params.id),
            },
            data: {
                name,
                phone
            },
        });
    
        return NextResponse.json(updatedContact);
    }

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const deletedKategori = await prisma.contact.delete({
      where: {
        id: Number(params.id),
      },
    });
  
    return NextResponse.json(deletedKategori);
  }