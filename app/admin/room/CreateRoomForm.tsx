'use client';
import { useState } from 'react';
import { Input } from '@nextui-org/react';
import SubmitButton from '@/components/SubmitButton';
import { RoomSchema } from '@/lib/types';
import { createRoom } from './create-room-action';

export default function CreateRoomForm() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const handleSubmit = async (formData: FormData) => {
    setFieldErrors({});
    const newRoom = {
      name: formData.get('name'),
    };
    const result = RoomSchema.safeParse(newRoom);
    if (!result.success) {
      const flattenErrors = result.error.flatten();
      setFieldErrors(flattenErrors.fieldErrors);
      return;
    }
    const response = await createRoom(result.data);

    if (response.error) {
      alert(response.error);
      return;
    }
  };

  return (
    <section className="py-4">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">Crear sala</h1>
      <form
        noValidate
        action={handleSubmit}
        className="border-2 border-slate-700 rounded-lg bg-slate-50 p-8 grid grid-cols-3 gap-4"
      >
        <Input
          name="name"
          label="Nombre de la sala"
          placeholder="Ej: Sala de Among Us"
          className="col-span-3"
          isRequired
          isInvalid={!!fieldErrors.name}
          errorMessage={fieldErrors.name?.[0]}
        />
        <SubmitButton
          className="col-span-3 sm:col-span-1"
          pendingText="Creando sala..."
        >
          Crear
        </SubmitButton>
      </form>
    </section>
  );
}
