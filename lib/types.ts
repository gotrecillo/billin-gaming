import { z } from 'zod';

export const RoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Room name must be at least 3 character long.' })
    .max(100, { message: 'Room name must be at most 100 character long.' }),
  id: z.string().optional(),
});

export const ToggleUserInvitationToRoomSchema = z.object({
  roomId: z.string(),
  userId: z.string(),
  invited: z.boolean(),
});
