'use server';

import prisma from '@/lib/prisma';
import { RoomSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const createRoom = async (newRoom: unknown) => {
  const result = RoomSchema.safeParse(newRoom);

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
