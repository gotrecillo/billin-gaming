'use server';

import prisma from '@/lib/prisma';
import { RoomSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const deleteRoom = async (id: unknown) => {
  const result = RoomSchema.partial().safeParse({ id });

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
    const room = await prisma.room.delete({
      where: {
        id: result.data.id,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/room', 'layout');
    revalidatePath('/admin/room/archived');
    return {
      room,
    };
  } catch (error) {
    return {
      error: 'Error al borrar la sala.',
    };
  }
};
