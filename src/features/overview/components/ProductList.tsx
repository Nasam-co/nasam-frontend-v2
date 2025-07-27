interface ProductListProps {
  children: React.ReactNode;
}

export function ProductList({ children }: ProductListProps) {
  return <div className="space-y-3">{children}</div>;
}
