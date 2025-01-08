export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Refund Policy</h1>
      <p className="mb-6 text-lg">
        Before becoming a member of the Service carefully review the financial terms and other policies and documents.
        We will not issue refunds of usage fees.
      </p>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Chargeback Policy</h2>
        <p>
          {`You agree that You will not dispute or otherwise seek a "chargeback" from the company whose credit card You used to pay fees on the Service, except in the case of fraud.`}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Consequences of Chargebacks</h2>
        <p>
          Should You do so, LinkAI may, in its sole discretion, refuse to honor pending and future transactions or
          entries made from all credit card accounts or online accounts on which such chargebacks have been made and may
          prohibit all persons or businesses in whose name the credit card accounts exist and any person or business who
          accesses any associated online account or credit card or who otherwise breaches this provision from using the
          Service.
        </p>
      </section>
    </div>
  )
}
