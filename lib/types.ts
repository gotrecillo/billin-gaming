import { ShittyQuestionCategory } from '@prisma/client';
import { z } from 'zod';

export const RoomSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'La sala tiene que tener al menos 3 caracteres' })
    .max(100, { message: 'La sala tiene que tener menos de 100 caracteres' }),
  id: z.string().optional(),
});

export const ToggleUserInvitationToRoomSchema = z.object({
  roomId: z.string(),
  userId: z.string(),
  invited: z.boolean(),
});

export const CardSchema = z.object({
  firstQuestionText: z
    .string()
    .min(3, { message: 'La pregunta tiene que tener al menos 3 caracteres' })
    .max(255, {
      message: 'La pregunta tiene que tener menos de 255 caracteres',
    }),
  secondQuestionText: z
    .string()
    .min(3, { message: 'La pregunta tiene que tener al menos 3 caracteres' })
    .max(255, {
      message: 'La pregunta tiene que tener menos de 255 caracteres',
    }),
  thirdQuestionText: z
    .string()
    .min(3, { message: 'La pregunta tiene que tener al menos 3 caracteres' })
    .max(255, {
      message: 'La pregunta tiene que tener menos de 255 caracteres',
    }),
  firstQuestionCategory: z.nativeEnum(ShittyQuestionCategory, {
    invalid_type_error: 'Categoria invalida',
    required_error: 'La categoria es requerida',
  }),
  secondQuestionCategory: z.nativeEnum(ShittyQuestionCategory, {
    invalid_type_error: 'Categoria invalida',
    required_error: 'La categoria es requerida',
  }),
  thirdQuestionCategory: z.nativeEnum(ShittyQuestionCategory, {
    invalid_type_error: 'Categoria invalida',
    required_error: 'La categoria es requerida',
  }),
});
