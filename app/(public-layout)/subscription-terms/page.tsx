export default function SubscriptionTerms() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Subscription Terms</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Description of Membership Services</h2>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Essential Plan:</h3>
        <p>
          Monthly: <strong className="text-primary">$5.99</strong> per month for:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <span>3M tokens (approximately 2000 messages per month)</span>
          </li>
          <li>
            <span>Memory Size (Up to 16K)</span>
          </li>
          <li>
            <span>Adjustable Response Length (Up to 1K)</span>
          </li>
        </ul>
        <p>
          Annually: <strong className="text-primary">$58.88</strong> per year (
          <strong className="text-primary">$4.99</strong> per month), same benefits as the monthly plan with a{' '}
          <span>20% discount</span>.
        </p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Pro Plan:</h3>
        <p>
          Monthly: <strong className="text-primary">$14.99</strong> per month for:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <span>10M tokens (approximately 6000 messages per month)</span>
          </li>
          <li>
            <span>8% Off Premium Models</span>
          </li>
          <li>
            <span>Memory Size (Up to 16K)</span>
          </li>
          <li>
            <span>Adjustable Response Length (Up to 1K)</span>
          </li>
        </ul>
        <p>
          Annually: <strong className="text-primary">$94.88</strong> per year (
          <strong className="text-primary">$7.99</strong> per month), same benefits as the monthly plan with a{' '}
          <span>50% discount</span>.
        </p>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Ultimate Plan:</h3>
        <p>
          Monthly: <strong className="text-primary">$49.99</strong> per month for:
        </p>
        <ul className="list-inside list-disc">
          <li>
            <span>40M tokens (approximately 24000 messages per month)</span>
          </li>
          <li>
            <span>15% Off Premium Models</span>
          </li>
          <li>
            <span>Memory Size (Up to 16K)</span>
          </li>
          <li>
            <span>Adjustable Response Length (Up to 1K)</span>
          </li>
        </ul>
        <p>
          Annually: <strong className="text-primary">$358.88</strong> per year (
          <strong className="text-primary">$29.99</strong> per month), same benefits as the monthly plan with a{' '}
          <span>$240 discount</span>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Membership Fee Frequency and Specific Prices</h2>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Monthly Subscription:</h3>
        <ul className="list-inside list-disc">
          <li>
            Essential Plan: <strong className="text-primary">$5.99</strong>
          </li>
          <li>
            Pro Plan: <strong className="text-primary">$14.99</strong>
          </li>
          <li>
            Ultimate Plan: <strong className="text-primary">$49.99</strong>
          </li>
        </ul>

        <h3 className="mb-2 mt-4 text-xl font-semibold">Annual Subscription:</h3>
        <ul className="list-inside list-disc">
          <li>
            Essential Plan: <strong className="text-primary">$58.88</strong> (equivalent to{' '}
            <strong className="text-primary">$4.99</strong> per month)
          </li>
          <li>
            Pro Plan: <strong className="text-primary">$94.88</strong> (equivalent to{' '}
            <strong className="text-primary">$7.99</strong> per month)
          </li>
          <li>
            Ultimate Plan: <strong className="text-primary">$358.88</strong> (equivalent to{' '}
            <strong className="text-primary">$29.99</strong> per month)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Flow Tokens</h2>
        <p>In addition to our subscription plans, we offer the following token packages:</p>
        <ul className="list-inside list-disc">
          <li>
            <span>300K Tokens</span> (approximately 200 messages): <strong className="text-primary">$1.99</strong>
          </li>
          <li>
            <span>1M Tokens</span> (approximately 600 messages): <strong className="text-primary">$3.99</strong>
          </li>
          <li>
            <span>2M Tokens</span> (approximately 1200 messages): <strong className="text-primary">$4.99</strong>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Method to Cancel Automatic Renewal</h2>
        <p>To cancel your subscription and prevent future automatic renewals, please follow these simple steps:</p>
        <ol className="mt-2 list-inside list-decimal">
          <li>Click the menu button in the top right corner, then select "My Account" from the dropdown menu.</li>
          <li>Find your current subscription plan and click on "Cancel Subscription."</li>
          <li>Review the cancellation details and confirm by clicking "Yes, Cancel Subscription."</li>
          <li>You will receive a confirmation message once the cancellation is complete.</li>
        </ol>
        <p className="mt-4">
          Note: After cancellation, you will continue to have access to your subscription benefits until the end of your
          current billing period.
        </p>
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
