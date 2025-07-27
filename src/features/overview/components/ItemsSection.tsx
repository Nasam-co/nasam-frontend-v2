import { DashboardCard } from "./DashboardCard";
import { ProductList } from "./ProductList";

interface ItemsSectionProps<T> {
  title: string;
  headerAction?: React.ReactNode;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function ItemsSection<T>({
  title,
  headerAction,
  items,
  renderItem,
  keyExtractor,
}: ItemsSectionProps<T>) {
  return (
    <DashboardCard title={title} headerAction={headerAction}>
      <ProductList>
        {items.map((item, index) => (
          <div key={keyExtractor(item)}>
            {renderItem(item, index)}
          </div>
        ))}
      </ProductList>
    </DashboardCard>
  );
}