import { ReactNode } from 'react';

interface TitleGridProps {
  children: ReactNode;
  title?: string;
}

export default function TitleGrid({ children, title }: TitleGridProps) {
  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-accent">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {children}
      </div>
    </div>
  );
}
