'use server';

import prisma from '@/lib/prisma';
import { CardSchema } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const createCard = async (newCard: unknown) => {
  const result = CardSchema.safeParse(newCard);

  if (!result.success) {
    let errorMessages = '';
    result.error.issues.forEach((issue) => {
      errorMessages += `${issue.path[0]}: ${issue.message}.\n`;
    });
    return {
      error: errorMessages,
    };
  }

  const questions = [
    {
      question: result.data.firstQuestionText,
      category: result.data.firstQuestionCategory,
    },
    {
      question: result.data.secondQuestionText,
      category: result.data.secondQuestionCategory,
    },
    {
      question: result.data.thirdQuestionText,
      category: result.data.thirdQuestionCategory,
    },
  ];

  try {
    const card = await prisma.card.create({
      data: {
        ShittyQuestions: {
          createMany: {
            data: questions,
          },
        },
      },
      include: {
        ShittyQuestions: true,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/card');
    return {
      card,
    };
  } catch (error) {
    console.log(error, 'error');
    return {
      error: 'Error al crear la carta.',
    };
  }
};
