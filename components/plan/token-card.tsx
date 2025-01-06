import UpgradeChat from './upgrade-chat'

interface TokenPackageProps {
  title: string
  description: string
  price: string
  products: string
}

export function TokenPackage({ title, description, price, products }: TokenPackageProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card p-6">
      <h3 className="mb-2 text-xl font-bold text-card-foreground">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="mb-4 text-3xl font-bold text-card-foreground">{price}</div>
      <UpgradeChat products={products} />
    </div>
  )
}
