'use server';
import prisma from '@/lib/prisma';
import { ToggleUserInvitationToRoomSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

type ToggleUserInvitationToRoomArgs = {
  roomId: unknown;
  userId: unknown;
  invited: unknown;
};

export const inviteUserToRoom = async (
  args: ToggleUserInvitationToRoomArgs
) => {
  const { roomId, userId, invited } = args;
  const result = ToggleUserInvitationToRoomSchema.safeParse({
    roomId,
    userId,
    invited,
  });

  if (!result.success) {
    let errorMessages = '';
    result.error.issues.forEach((issue) => {
      errorMessages += `${issue.path[0]}: ${issue.message}.\n`;
    });
    return {
      error: errorMessages,
    };
  }

  const roomUserPayload = invited
    ? {
        RoomUser_roomId_userId_unique: {
          userId: result.data.userId,
          roomId: result.data.roomId,
        },
      }
    : {
        userId: result.data.userId,
      };

  try {
    const room = await prisma.room.update({
      where: {
        id: result.data.roomId,
      },
      data: {
        RoomUser: {
          [invited ? 'delete' : 'create']: roomUserPayload,
        },
      },
    });

    revalidatePath(`/admin/room/${room.id}`);
    revalidatePath(`/room/${room.id}`);
    revalidatePath('/admin/room', 'layout');
    revalidatePath('/admin/room/archived');
    return {
      room,
    };
  } catch (error) {
    return {
      error: `Error al ${
        result.data.invited ? 'desinvitar' : 'invitar'
      } al usuario a la sala.`,
    };
  }
};
