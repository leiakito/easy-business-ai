import { PlanType, SubscriptionStatus } from '@prisma/client'

export const FreePlan = {
  planType: PlanType.FREE,
  status: SubscriptionStatus.ACTIVE,
  totalTokens: 50000,
  usedTokens: 0,
  endDate: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)
}
