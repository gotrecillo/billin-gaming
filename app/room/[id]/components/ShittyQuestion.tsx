import IconBed from '@/components/icons/IconBed';
import IconCoffee from '@/components/icons/IconCoffee';
import IconCrown from '@/components/icons/IconCrown';
import IconPicture from '@/components/icons/IconPicture';
import IconMegaphone from '@/components/icons/IconMegaphone';
import IconHeart from '@/components/icons/IconHeart';

import { ShittyQuestionCategory } from '@prisma/client';

type ShittyQuestionProps = {
  question: string;
  category: ShittyQuestionCategory;
};

const categoryMap = {
  [ShittyQuestionCategory.BED]: <IconBed className="w-8 h-8" />,
  [ShittyQuestionCategory.COFFEE]: <IconCoffee className="w-8 h-8" />,
  [ShittyQuestionCategory.CROWN]: <IconCrown className="w-8 h-8" />,
  [ShittyQuestionCategory.PICTURE]: <IconPicture className="w-8 h-8" />,
  [ShittyQuestionCategory.MEGAPHONE]: <IconMegaphone className="w-8 h-8" />,
  [ShittyQuestionCategory.HEART]: <IconHeart className="w-8 h-8" />,
};

export default function ShittyQuestion(props: ShittyQuestionProps) {
  const { question, category } = props;

  return (
    <div className="border-2 rounded-lg bg-slate-50 p-4 items-center break-words border-slate-700 gap-2 grid grid-cols-[40px_1fr]">
      {categoryMap[category]}
      <p>{question}</p>
    </div>
  );
}
