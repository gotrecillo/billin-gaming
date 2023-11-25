'use client';
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@nextui-org/react';

type SubmitButtonProps = { pendingText: string } & ButtonProps;

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" disabled={pending} {...props}>
      {pending ? props.pendingText : props.children}
    </Button>
  );
}
