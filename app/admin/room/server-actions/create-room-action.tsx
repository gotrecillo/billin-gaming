'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { RoomSchema } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const createRoom = async (newRoom: unknown) => {
  const result = RoomSchema.safeParse(newRoom);
  const session = await getServerSession(authOptions);

  if (!result.success) {
    let errorMessages = '';
    result.error.issues.forEach((issue) => {
      errorMessages += `${issue.path[0]}: ${issue.message}.\n`;
    });
    return {
      error: errorMessages,
    };
  }

  try {
    const room = await prisma.room.create({
      data: {
        name: result.data.name,
        ownerId: session?.user.id || '',
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/room');
    return {
      room,
    };
  } catch (error) {
    return {
      error: 'Error al crear la sala.',
    };
  }
};
