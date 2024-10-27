'use client'

import { RevealFx } from "./once-ui/components"
import Image from "next/image"
import Link from "next/link"
import Frame1 from "@/components/Frame1"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [highlightedTabs, setHighlightedTabs] = useState(new Set([0]))
  const [inDemoSection, setInDemoSection] = useState(false)
  const demoSectionRef = useRef<HTMLDivElement>(null)

  const tabs = ["Tab1", "Tab2", "Tab3"]
  const tabChangeDelay = 80 // Delay in milliseconds

  // Handle tab cycling logic
  const handleScroll = (e: WheelEvent) => {
    if (inDemoSection) {
      const direction = e.deltaY > 0 ? 1 : -1
      let newIndex = activeTab + direction

      // Allow vertical scrolling at boundaries
      if ((newIndex < 0 && direction < 0) || (newIndex >= tabs.length && direction > 0)) {
        return // Exit if scrolling beyond boundaries
      }

      e.preventDefault() // Prevent default scrolling only when within bounds

      // Highlight tabs when scrolling forward
      if (direction > 0 && newIndex < tabs.length) {
        setTimeout(() => {
          setActiveTab(newIndex)
          setHighlightedTabs((prev) => new Set([...prev, newIndex]))
        }, tabChangeDelay)
      }

      // Unhighlight when scrolling backward
      if (direction < 0 && newIndex >= 0) {
        setTimeout(() => {
          setActiveTab(newIndex)
          setHighlightedTabs((prev) => {
            const updated = new Set(prev)
            updated.delete(activeTab) // Remove the current tab from highlighted set
            return updated
          })
        }, tabChangeDelay)
      }
    }
  }

  // Observe if the demo section is fully visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInDemoSection(entry.isIntersecting),
      { threshold: 1.0 } // Trigger only when fully visible
    )

    if (demoSectionRef.current) {
      observer.observe(demoSectionRef.current)
    }

    return () => {
      if (demoSectionRef.current) {
        observer.unobserve(demoSectionRef.current)
      }
    }
  }, [])

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [activeTab, inDemoSection])

  const handleTabChange = (tabIndex: number) => {
    setTimeout(() => {
      setActiveTab(tabIndex)
      setHighlightedTabs((prev) => new Set([...prev, tabIndex]))
    }, tabChangeDelay)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add your form submission logic here
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full py-6 bg-transparent z-10">
        <div className="max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto flex justify-between items-center">
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
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-cover bg-center bg-[url('/images/background.png')] flex-grow"> 
        <div className="min-h-screen flex flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Centered RevealFx */}
          <div className="flex flex-grow items-center pt-[76px] justify-center">
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

      {/* Demo Section */}
      <div 
        className="demos bg-cover bg-center bg-[#101010] flex-grow" 
        ref={demoSectionRef}
      > 
        <div className="min-h-screen flex flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-grow items-center pt-[76px] justify-center">
            <div className="bg-black bg-opacity-50 rounded-2xl w-full p-6 sm:p-8">
              <div className="text-white mb-8">
                <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">
                  The Ultimate Conversation Toolkit. Reveal The True Value Of Being Deliberate.
                </h1>
                <p className="text-sm sm:text-base tracking-wider">
                  Identify and extract everything that matters. 
                  <span className="opacity-80"> Discover opportunities in the engagement happening around your organization, audience, and stakeholders.</span>
                </p>
              </div>
              
              <div className="flex gap-4 w-full justify-center items-center">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`px-3 py-1 rounded text-sm sm:text-base transition-colors duration-800 ${
                      highlightedTabs.has(index) ? "bg-white text-black" : "bg-opacity-15 border"
                    }`}
                  >
                    {tab === "Tab1" ? "Inspire Dialogue" : tab === "Tab2" ? "Listen For Details" : "See The Big Picture"}
                  </button>
                ))}
              </div>
              <div className="tabs mt-8">
                {activeTab === 0 && (
                  <div className="flex max-w-[800px] mx-auto justify-center">
                    <video 
                      className="rounded-xl shadow-white" 
                      autoPlay 
                      loop 
                      muted 
                      preload="metadata"
                    >
                      <source src="/demovids/1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {activeTab === 1 && <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">Content for Tab 2</h1>}
                {activeTab === 2 && <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">Content for Tab 3</h1>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
