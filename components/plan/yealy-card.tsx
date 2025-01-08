import { Check } from 'lucide-react'

import UpgradeChat from './upgrade-chat'

interface YearlyPlanComponentProps {
  title: string
  monthlyPrice: string
  yearlyPrice: string
  totalPrice: string
  features: string[]
  popular?: boolean
  discount: string
  products: string
  ctaText?: string
}

export function YearlyPlanComponent({
  title,
  monthlyPrice,
  yearlyPrice,
  totalPrice,
  features,
  popular = false,
  discount,
  products
}: YearlyPlanComponentProps) {
  return (
    <div
      className={`flex w-full max-w-sm flex-col justify-between border ${popular ? 'border-accent' : 'border-border'} overflow-hidden rounded-lg bg-card`}
    >
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-card-foreground">{title}</h3>
        {popular && (
          <span className="mb-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Best Value
          </span>
        )}
        <div className="mb-2 mt-4">
          <span className="text-4xl font-bold text-card-foreground">{yearlyPrice}</span>
          <span className="ml-2 text-muted-foreground">/ mo</span>
        </div>
        <div className="mb-4">
          <span className="text-muted-foreground line-through">{monthlyPrice} / mo</span>
          <span className="ml-2 rounded-md bg-primary/10 px-2 py-1 font-semibold text-primary">Save {discount}</span>
        </div>
        <div className="mb-6 text-sm text-muted-foreground">For a total {totalPrice}</div>
        <ul className="mb-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-muted-foreground">
              <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
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
