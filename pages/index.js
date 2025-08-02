import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Based Pixel Gang Mint</title>
      </Head>
      <main style={{ textAlign: 'center', padding: '3rem' }}>
        <img src="/based.png" alt="Based Pixel Gang" style={{ width: 200 }} />
        <h1>Mint your Based Pixel Gang NFT</h1>
        <p>Connect your wallet and mint on Base.</p>
      </main>
    </>
  )
}
