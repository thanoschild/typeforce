import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  className?: string;
}

const StatCard = ({
  icon,
  title,
  value,
  className
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-theme-bg rounded-lg",
      className
    )}>
      <div className="flex items-center justify-center p-6 gap-x-2">
        <span className="text-theme-text text-4xl">
          {icon}
        </span>
        <div>
          <p className="text-xl text-theme-sub font-medium uppercase">
            {title}
          </p>
          <p className="text-2xl font-bold text-theme-main">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;