'use client'

function UpgradeChat({ products }: { products: string }) {
  const toUpgradeChat = () => {
    let src = `https://upgrade.chat/view-embed/041a0657-a5f9-40f6-b4af-bfd4b2ec449c`
    const queryParams = [`embedder_url=${encodeURIComponent(window.location.href)}`]
    if (products) {
      for (const product of products.split(',')) {
        queryParams.push(`productId=${product}`)
      }
    }
    if (queryParams.length > 0) {
      src += `?${queryParams.join('&')}`
    }

    const width = 350
    const height = 450

    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2

    window.open(src, '_blank', `width=${width},height=${height},top=${top},left=${left}`)
  }

  return (
    <button
      onClick={toUpgradeChat}
      className="mt-6 w-full rounded-full bg-primary px-4 py-3 font-bold text-primary-foreground transition duration-200 hover:bg-primary/90"
    >
      PayPal
    </button>
  )
}

export default UpgradeChat
