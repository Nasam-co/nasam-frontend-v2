import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/shared/hooks/useLanguage";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName = "h-5 w-5",
}: StatCardProps) {
  const { isRTL } = useLanguage();
  return (
    <Card>
      <div className="flex flex-row items-center justify-between">
        <div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex flex-col space-y-1">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </div>
        <CardContent
          className={cn("rounded-full bg-sky-100 p-2", isRTL ? "ml-4" : "mr-4")}
        >
          <Icon className={`${iconClassName} text-sky-600`} />
        </CardContent>
      </div>
    </Card>
  );
}
