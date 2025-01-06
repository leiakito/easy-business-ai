import { Check } from 'lucide-react'

import UpgradeChat from './upgrade-chat'

interface PlanComponentProps {
  title: string
  price: string
  features: string[]
  products: string
  popular?: boolean
  ctaText?: string
}

export function PlanComponent({ title, price, features, popular = false, products }: PlanComponentProps) {
  return (
    <div
      className={`w-full max-w-sm border ${popular ? 'border-accent' : 'border-border'} overflow-hidden rounded-lg bg-card`}
    >
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-card-foreground">{title}</h3>
        {popular && (
          <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </span>
        )}
        <div className="mb-6 mt-4">
          <span className="text-4xl font-bold text-card-foreground">{price}</span>
          <span className="ml-2 text-muted-foreground">/ mo</span>
        </div>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6">
        <UpgradeChat products={products} />
      </div>
    </div>
  )
}
