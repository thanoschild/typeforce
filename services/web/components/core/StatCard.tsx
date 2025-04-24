import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}) => {
  return (
    <Card className="bg-theme-bg !shadow-none !border-0">
      <CardContent className="flex items-center justify-center p-6 gap-x-2">
        {icon}
        <div>
          <p className="text-xl text-theme-sub font-medium uppercase">
            {title}
          </p>
          <p className="text-2xl font-bold text-theme-main">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatCard;
