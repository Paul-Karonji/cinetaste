import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx('max-w-7xl mx-auto px-6 py-8', className)}>
      {children}
    </div>
  );
}
