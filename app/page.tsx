'use client'

import { RevealFx } from "./once-ui/components"
import Image from "next/image"
import Link from "next/link"
import Frame1 from "@/components/Frame1"

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Meet you at your inbox!') // Replace this with your actual submission logic
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="bg-cover bg-center bg-[url('/images/background.png')] flex-grow">
        <div className="min-h-screen flex  flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          <nav className="py-6 flex justify-between items-center">
            <Link href={'/'}>
              <Image src={'/images/logo.svg'} height={8} width={68} alt="Logo" />
            </Link>
            <div className="flex gap-4">
              <button className="px-3 py-1 text-sm sm:text-base rounded transition-opacity">
                Contact
              </button>
              <button className="px-3 py-1 bg-white bg-opacity-15 hover:bg-opacity-25 text-sm sm:text-base rounded transition-colors duration-300">
                Sign Up
              </button>
            </div>
          </nav>

          {/* Centered RevealFx */}
          <div className="flex flex-grow items-center justify-center">
            <RevealFx className="w-full max-w-md" speed="medium" delay={0} translateY={0}>
              <div className="bg-black bg-opacity-50 rounded-2xl p-6 sm:p-8">
                <div className="text-white mb-8">
                  <h1 className="text-2xl sm:text-3xl tracking-wide mb-4">
                    The Ultimate Conversation Toolkit. Reveal The True Value Of Being Deliberate.
                  </h1>
                  <p className="text-sm sm:text-base tracking-wider">
                    Identify and extract everything that matters. 
                    <span className="opacity-80"> Discover opportunities in the engagement happening around your organization, audience, and stakeholders.</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-3 py-2 rounded bg-white bg-opacity-15 border border-white text-sm sm:text-base w-full" 
                    required 
                  />
                  <button 
                    type="submit" 
                    className="px-3 py-2 bg-black text-white text-sm sm:text-base rounded hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Join Waitlist
                  </button>
                </form>
              </div>
            </RevealFx>
          </div>

          <footer className="py-6 flex justify-between items-center">
            <button className="px-3 py-1 bg-white bg-opacity-15 hover:bg-opacity-25 text-sm sm:text-base rounded transition-colors duration-300">
              Features
            </button>
            <button className="px-3 py-1 bg-white bg-opacity-15 hover:bg-opacity-25 text-sm sm:text-base rounded transition-colors duration-300">
              Scroll to Bottom
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
