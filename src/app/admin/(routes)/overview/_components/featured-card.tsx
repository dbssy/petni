import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FeaturedCardProps {
  iconBg: string;
  icon: LucideIcon;
  title: string;
  value: string | number;
  change: string;
  changeColor: string;
}

export function FeaturedCard({
  iconBg,
  icon: Icon,
  title,
  value,
  change,
  changeColor,
}: FeaturedCardProps) {
  return (
    <div className="flex space-x-4 mt-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg min-w-full">
        <div className="relative">
          <div
            className={cn(
              'shadow-md rounded-lg p-4 absolute -top-4 left-3',
              iconBg,
            )}
          >
            <Icon className="text-white w-12 h-12" />
          </div>
        </div>

        <div className="flex flex-col items-end p-4">
          <span className="text-gray-500 text-xs">{title}</span>
          <h2 className="text-3xl font-semibold">{value}</h2>
        </div>

        <div className="border-t border-gray-200 py-4 px-6">
          <p className={cn('text-sm font-medium', changeColor)}>
            {change}% {''}
            <span className="text-gray-500 text-xs">
              comparado ao mês passado
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
