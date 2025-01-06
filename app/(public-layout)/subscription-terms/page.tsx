export default function SubscriptionTerms() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Subscription Terms</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Description of Membership Services</h2>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Free Plan:</h3>
        <p>
          Monthly: 100 messages per month, memory deleted after 7 days of inactivity, shared chat capacity which may be
          unavailable during peak times.
        </p>
        <p>Annually: Same as monthly.</p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Standard Plan:</h3>
        <p>Monthly: $5.99 per month for 2000 messages, limited memory, dedicated chat capacity with basic priority.</p>
        <p>Annually: $58.88 per year, equivalent to $4.91 per month, same benefits as the monthly plan.</p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Premium Plan (Most Popular):</h3>
        <p>Monthly: $14.99 per month for 6000 messages, good memory, dedicated chat capacity with basic priority.</p>
        <p>Annually: $94.88 per year, equivalent to $7.91 per month, same benefits as the monthly plan.</p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Deluxe Plan:</h3>
        <p>
          Monthly: $49.90 per month for unlimited messages, maximum memory, dedicated chat capacity with basic priority,
          options to adjust memory size and AI message lengths, and enhance immersion mode.
        </p>
        <p>Annually: $358.80 per year, equivalent to $29.90 per month, same benefits as the monthly plan.</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Membership Fee Frequency and Specific Prices</h2>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Monthly Subscription:</h3>
        <ul className="list-inside list-disc">
          <li>Free Plan: $0</li>
          <li>Standard Plan: $5.99</li>
          <li>Premium Plan: $14.99</li>
          <li>Deluxe Plan: $49.90</li>
        </ul>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Annual Subscription:</h3>
        <ul className="list-inside list-disc">
          <li>Free Plan: $0</li>
          <li>Standard Plan: $58.88</li>
          <li>Premium Plan: $94.88</li>
          <li>Deluxe Plan: $358.80</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Method to Cancel Automatic Renewal</h2>
        <p>To Cancel your subscription and prevent future Automatic renewals, please follow these simple steps:</p>
        <ol className="mt-2 list-inside list-decimal">
          <li>Go to your account settings.</li>
          <li>{`Click on the "Subscriptions" tab.`}</li>
          <li>{`Find your current subscription plan and click on "Manage Subscription."`}</li>
          <li>{`Select "Cancel Subscription."`}</li>
          <li>{`Confirm your cancellation by selecting "Yes, Cancel Subscription."`}</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Additional Information</h2>
        <ul className="list-inside list-disc">
          <li>All prices are listed in USD.</li>
          <li>Cancellations can be made at any time before the next billing cycle to avoid future charges.</li>
          <li>
            Upon cancellation, you will continue to have access to the benefits until the end of your current billing
            period.
          </li>
          <li>Please ensure to review these terms periodically as they are subject to change.</li>
          <li>
            Any modifications to these terms will be communicated through our website and to your registered email
            address.
          </li>
        </ul>
      </section>
    </div>
  )
}
