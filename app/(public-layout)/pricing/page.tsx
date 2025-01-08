import { PlanComponent } from '@/components/plan/plan-card'
import { Tabs } from '@/components/plan/tabs'
import { TokenPackage } from '@/components/plan/token-card'
import { YearlyPlanComponent } from '@/components/plan/yealy-card'
import { PRICING_CONSTANTS } from '@/constant/config'

function Pricing() {
  return (
    <div className="mb-20 flex flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Choose Your Plan</h1>
      <Tabs labels={['Yearly', 'Monthly']}>
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <YearlyPlanComponent
            title="Essential Plan"
            products={PRICING_CONSTANTS.YEARLY_ESSENTIAL_PLAN_ID}
            monthlyPrice="$5.99"
            yearlyPrice="$4.99"
            totalPrice="$58.88"
            features={[
              '3M tokens ≈ 2000 messages per month',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            discount="20%"
            ctaText="Choose Essential"
          />
          <YearlyPlanComponent
            title="Pro Plan"
            products={PRICING_CONSTANTS.YEARLY_PRO_PLAN_ID}
            monthlyPrice="$14.99"
            yearlyPrice="$7.99"
            totalPrice="$94.88"
            features={[
              '10M tokens ≈ 6000 messages per month',
              '8% Off Premium Models',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            discount="50%"
            ctaText="Choose Pro"
          />
          <YearlyPlanComponent
            title="Ultimate Plan"
            products={PRICING_CONSTANTS.YEARLY_ULTIMATE_PLAN_ID}
            monthlyPrice="$49.99"
            yearlyPrice="$29.99"
            totalPrice="$358.88"
            features={[
              '40M tokens ≈ 24000 messages per month',
              '15% Off Premium Models',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            discount="$240"
            popular={true}
            ctaText="Choose Ultimate"
          />
        </div>
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <PlanComponent
            title="Essential Plan"
            products={PRICING_CONSTANTS.MONTHLY_ESSENTIAL_PLAN_ID}
            price="$5.99"
            features={[
              '3M tokens ≈ 2000 messages per month',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            popular={true}
            ctaText="Choose Essential"
          />
          <PlanComponent
            title="Pro Plan"
            products={PRICING_CONSTANTS.MONTHLY_PRO_PLAN_ID}
            price="$14.99"
            features={[
              '10M tokens ≈ 6000 messages per month',
              '8% Off Premium Models',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            ctaText="Choose Pro"
          />
          <PlanComponent
            title="Ultimate Plan"
            products={PRICING_CONSTANTS.MONTHLY_ULTIMATE_PLAN_ID}
            price="$49.99"
            features={[
              '40M tokens ≈ 24000 messages per month',
              '15% Off Premium Models',
              'Memory Size (Up to 16K)',
              'Adjustable Response Length (Up to 1K)'
            ]}
            ctaText="Choose Ultimate"
          />
        </div>
      </Tabs>

      <h1 className="mb-8 text-3xl font-bold text-foreground">Flow Tokens</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <TokenPackage
          title="300K Tokens"
          products={PRICING_CONSTANTS.TOKEN_PACKAGE_300K_ID}
          description="200 messages"
          price="$1.99"
        />
        <TokenPackage
          title="1M Tokens"
          products={PRICING_CONSTANTS.TOKEN_PACKAGE_1M_ID}
          description="600 messages"
          price="$3.99"
        />
        <TokenPackage
          title="2M Tokens"
          products={PRICING_CONSTANTS.TOKEN_PACKAGE_2M_ID}
          description="1200 messages"
          price="$4.99"
        />
      </div>
    </div>
  )
}

export default Pricing
