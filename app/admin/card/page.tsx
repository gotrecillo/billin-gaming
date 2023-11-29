'use client';
import SubmitButton from '@/components/SubmitButton';
import { CardSchema } from '@/lib/types';
import { Input } from '@nextui-org/react';
import { useRef, useState } from 'react';
import CategorySelector from './components/CategorySelector';
import { createCard } from './server-actions/create-card';

export default function CardCreatePage() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    setFieldErrors({});

    const newCard = {
      firstQuestionText: formData.get('firstQuestionText'),
      secondQuestionText: formData.get('secondQuestionText'),
      thirdQuestionText: formData.get('thirdQuestionText'),
      firstQuestionCategory: formData.get('firstQuestionCategory'),
      secondQuestionCategory: formData.get('secondQuestionCategory'),
      thirdQuestionCategory: formData.get('thirdQuestionCategory'),
    };

    const result = CardSchema.safeParse(newCard);

    if (!result.success) {
      const flattenErrors = result.error.flatten();
      setFieldErrors(flattenErrors.fieldErrors);
      return;
    }
    const response = await createCard(result.data);
    if (response.error) {
      alert(response.error);
      return;
    }
    formRef.current?.reset();
  };
  return (
    <>
      <section className="py-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Crear carta</h1>
        <form
          ref={formRef}
          noValidate
          action={handleSubmit}
          className="border-2 border-slate-700 rounded-lg bg-slate-50 p-8 grid grid-cols-3 gap-4"
        >
          <Input
            name="firstQuestionText"
            label="Primera pregunta"
            placeholder="Ej: ¿Cuál es tu color favorito?"
            className="col-span-2"
            isRequired
            isInvalid={!!fieldErrors.firstQuestionText}
            errorMessage={fieldErrors.firstQuestionText?.[0]}
          />
          <CategorySelector
            name="firstQuestionCategory"
            isInvalid={!!fieldErrors.firstQuestionCategory}
            errorMessage={fieldErrors.firstQuestionCategory?.[0]}
          />
          <Input
            name="secondQuestionText"
            label="Segunda pregunta"
            placeholder="Ej: ¿Cuál es tu color favorito?"
            className="col-span-2"
            isRequired
            isInvalid={!!fieldErrors.secondQuestionText}
            errorMessage={fieldErrors.secondQuestionText?.[0]}
          />
          <CategorySelector
            name="secondQuestionCategory"
            isInvalid={!!fieldErrors.secondQuestionCategory}
            errorMessage={fieldErrors.secondQuestionCategory?.[0]}
          />
          <Input
            name="thirdQuestionText"
            label="Tercera pregunta"
            placeholder="Ej: ¿Cuál es tu color favorito?"
            className="col-span-2"
            isRequired
            isInvalid={!!fieldErrors.thirdQuestionText}
            errorMessage={fieldErrors.thirdQuestionText?.[0]}
          />
          <CategorySelector
            name="thirdQuestionCategory"
            isInvalid={!!fieldErrors.thirdQuestionCategory}
            errorMessage={fieldErrors.thirdQuestionCategory?.[0]}
          />

          <SubmitButton
            className="col-span-3 sm:col-span-1"
            pendingText="Creando carta..."
          >
            Crear
          </SubmitButton>
        </form>
      </section>
    </>
  );
}
