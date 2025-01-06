'use client'

import { PlanType, Subscription } from '@prisma/client'
import { Progress } from '@radix-ui/react-progress'
import { useMemo } from 'react'

import { Label } from './ui/label'

interface SubscriptionProps {
  subscriptions: Subscription[]
}

const planOrder = [PlanType.FREE, PlanType.ESSENTIAL, PlanType.PRO, PlanType.ULTIMATE] as const
type OrderedPlanType = (typeof planOrder)[number]

export default function Subscriptions({ subscriptions }: SubscriptionProps) {
  const { highestTier, totalUsedTokens, totalTokens } = useMemo(() => {
    let highestTier: OrderedPlanType = PlanType.FREE
    let totalUsedTokens = 0
    let totalTokens = 0

    subscriptions.forEach((sub) => {
      if (planOrder.includes(sub.planType as OrderedPlanType)) {
        const currentIndex = planOrder.indexOf(sub.planType as OrderedPlanType)
        const highestIndex = planOrder.indexOf(highestTier)
        if (currentIndex > highestIndex) {
          highestTier = sub.planType as OrderedPlanType
        }
      }
      totalUsedTokens += sub.usedTokens
      totalTokens += sub.totalTokens
    })

    return { highestTier, totalUsedTokens, totalTokens }
  }, [subscriptions])

  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <Label>Current Highest Tier</Label>
        <div className="text-lg font-semibold capitalize">{highestTier}</div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label>Total Token Usage</Label>
        <Progress value={(totalUsedTokens / totalTokens) * 100} className="w-full" />
        <div className="text-sm text-gray-500">
          {totalUsedTokens.toLocaleString()} / {totalTokens.toLocaleString()} tokens used (
          {((totalUsedTokens / totalTokens) * 100).toFixed(2)}%)
        </div>
      </div>

      {/* {currentSubscriptions.map((subscription) => {
        const tokenUsagePercentage = (subscription.usedTokens / subscription.totalTokens) * 100;

        return (
          <div key={subscription.id} className="grid w-full items-center gap-4 border p-4 rounded-lg">
            <Label>Subscription Plan: {subscription.planType}</Label>
            <div>
              <Label>Token Usage</Label>
              <Progress value={tokenUsagePercentage} className="w-full" />
              <div className="text-sm text-gray-500">
                {subscription.usedTokens.toLocaleString()} / {subscription.totalTokens.toLocaleString()} tokens used
                ({tokenUsagePercentage.toFixed(2)}%)
              </div>
            </div>
          </div>
        );
      })} */}
    </>
  )
}
