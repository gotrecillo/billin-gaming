import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

type RoomPageProps = {
  params: {
    id: string;
  };
};

export default async function RoomPage(props: RoomPageProps) {
  const { id } = props.params;

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  if (!room) {
    notFound();
  }

  const shittyQuestions = await prisma.shittyQuestion.findMany();

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{room.name}</h1>
      <section className="grid col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shittyQuestions.map((shittyQuestion) => (
          <div
            key={shittyQuestion.id}
            className="border-2 border-slate-700 rounded-lg bg-slate-50 p-4 break-words"
          >
            <h2 className="text-xl font-bold text-slate-900">
              {shittyQuestion.question}
            </h2>
          </div>
        ))}
      </section>
    </>
  );
}
