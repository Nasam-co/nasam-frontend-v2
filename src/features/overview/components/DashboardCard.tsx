interface DashboardCardProps {
  title: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardCard({
  title,
  headerAction,
  children,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 flex-grow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {headerAction && (
          <div className="flex items-center gap-3">{headerAction}</div>
        )}
      </div>

      {children}
    </div>
  );
}
