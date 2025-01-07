import React from 'react'

export default function AboutUs() {
  const teamBackgrounds = [
    'Former Engineering Lead at Google',
    'Ex-Senior Architect at TikTok',
    'Previously UX Director at Apple',
    'Former Tech Lead at Amazon'
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-12 text-center text-5xl font-bold">About Us</h1>

      <div className="mb-16">
        <h2 className="mb-6 text-center text-3xl font-semibold">Our Mission</h2>
        <p className="mx-auto max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
          {`At LinkAI, we're on a mission to revolutionize communication through cutting-edge AI technology.
          Our team of industry veterans from world-renowned tech giants is dedicated to creating innovative solutions
          that empower businesses and individuals alike.`}
        </p>
      </div>

      <div className="mb-16">
        <h2 className="mb-10 text-center text-3xl font-semibold">Our Team</h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
          Our team consists of industry veterans from world-leading tech companies, including:
        </p>
        <ul className="mx-auto max-w-2xl list-inside list-disc text-lg text-gray-600 dark:text-gray-400">
          {teamBackgrounds.map((background, index) => (
            <li key={index} className="mb-2">
              {background}
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
          {`Empowering conversations with AI. Experience the future of communication with LinkAI.
          Our team of experts from Google, TikTok, Apple, Amazon, and other tech giants is dedicated to
          pushing the boundaries of what's possible in AI-driven communication.`}
        </p>
      </div>
    </div>
  )
}
