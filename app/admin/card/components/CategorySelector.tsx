import IconBed from '@/components/icons/IconBed';
import IconCoffee from '@/components/icons/IconCoffee';
import IconCrown from '@/components/icons/IconCrown';
import IconHeart from '@/components/icons/IconHeart';
import IconMegaphone from '@/components/icons/IconMegaphone';
import IconPicture from '@/components/icons/IconPicture';
import { Select, SelectItem } from '@nextui-org/react';
import { ShittyQuestionCategory } from '@prisma/client';

type CategorySelectorProps = {
  className?: string;
  name: string;
  isInvalid?: boolean;
  errorMessage?: string;
};

export default function CategorySelector(props: CategorySelectorProps) {
  const { name, className, errorMessage, isInvalid } = props;
  return (
    <div className={className}>
      <Select
        name={name}
        isRequired
        items={Object.values(ShittyQuestionCategory)}
        label="Categoría"
        placeholder="Selecciona una categoría"
        labelPlacement="inside"
        isInvalid={isInvalid}
        errorMessage={errorMessage}
      >
        <SelectItem
          key={ShittyQuestionCategory.HEART}
          value={ShittyQuestionCategory.HEART}
          textValue="Corazón"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconHeart className="w-8 h-8" />
            <span>Corazón</span>
          </div>
        </SelectItem>
        <SelectItem
          key={ShittyQuestionCategory.BED}
          value={ShittyQuestionCategory.BED}
          textValue="Cama"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconBed className="w-8 h-8" />
            <span>Cama</span>
          </div>
        </SelectItem>
        <SelectItem
          key={ShittyQuestionCategory.CROWN}
          value={ShittyQuestionCategory.CROWN}
          textValue="Corona"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconCrown className="w-8 h-8" />
            <span>Corona</span>
          </div>
        </SelectItem>
        <SelectItem
          key={ShittyQuestionCategory.MEGAPHONE}
          value={ShittyQuestionCategory.MEGAPHONE}
          textValue="Megáfono"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconMegaphone className="w-8 h-8" />
            <span>Megáfono</span>
          </div>
        </SelectItem>
        <SelectItem
          key={ShittyQuestionCategory.PICTURE}
          value={ShittyQuestionCategory.PICTURE}
          textValue="Cuadro"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconPicture className="w-8 h-8" />
            <span>Cuadro</span>
          </div>
        </SelectItem>
        <SelectItem
          key={ShittyQuestionCategory.COFFEE}
          value={ShittyQuestionCategory.COFFEE}
          textValue="Café"
        >
          <div className="grid grid-cols-[40px_1fr] place-items-center">
            <IconCoffee className="w-8 h-8" />
            <span>Café</span>
          </div>
        </SelectItem>
      </Select>
    </div>
  );
}
