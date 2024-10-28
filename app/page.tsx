'use client'
import { LetterFx } from "./once-ui/components"
import { RevealFx } from "./once-ui/components"
import Image from "next/image"
import Link from "next/link"
import Frame1 from "@/components/Frame1"
import { useState, useEffect, useRef } from "react"
import ExperienceComponent from "@/components/ExperienceComponent"

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [highlightedTabs, setHighlightedTabs] = useState(new Set([0]))
  const [inDemoSection, setInDemoSection] = useState(false)
  const demoSectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]) // Array of refs

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

  // Observe if videos are in the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    videoRefs.current.forEach((video, index) => {
      if (video) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              video.play() // Play video when in view
            } else {
              video.pause() // Pause video when out of view
            }
          },
          { threshold: 0.5 } // Trigger when at least 50% of the video is visible
        )
        observer.observe(video)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer, index) => {
        if (videoRefs.current[index]) {
          observer.unobserve(videoRefs.current[index]!)
        }
      })
    }
  }, [activeTab])

  // Add scroll event listeners
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex)
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
          <footer className="opacity-0 pointer-events-none py-6 flex justify-between items-center">
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
                  AI Powered All In One Conversation Management System
                </h1>
                <p className="text-sm sm:text-base tracking-wider">
                  Identify and extract everything that matters. 
                  <span className="opacity-80">Capture the invisible dynamics within every exchange—clarity, trust, emotion, reasoning, and relevance. We help organizations:</span>
                </p>
              </div>
              
              {/* Update the tabs rendering logic */}
              <div className="flex gap-4 w-full justify-center items-center">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(index)}
                    className={`px-3 py-1 rounded text-sm sm:text-base transition-colors duration-800 ${
                      activeTab === index ? "bg-white text-black" : "bg-opacity-15 border"
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
                      ref={(el) => { videoRefs.current[0] = el; }} // Attach ref for the first video
                      className="rounded-xl shadow-white" 
                      loop 
                      muted 
                      autoPlay
                      preload="metadata"
                    >
                      <source src="/demovids/1.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="flex max-w-[800px] mx-auto justify-center">
                    <video 
                      ref={(el) => { videoRefs.current[1] = el; }} // Attach ref for the second video
                      className="rounded-xl shadow-white" 
                      loop 
                      muted 
                      autoPlay
                      preload="metadata"
                    >
                      <source src="/demovids/3.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {activeTab === 2 && <div className="flex max-w-[800px] mx-auto justify-center">
                    <video 
                      ref={(el) => { videoRefs.current[1] = el; }} // Attach ref for the second video
                      className="rounded-xl shadow-white" 
                      loop 
                      muted 
                      autoPlay
                      preload="metadata"
                    >
                      <source src="/demovids/2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="demos bg-cover bg-center bg-[#101010] flex-grow" 
        ref={demoSectionRef}
      > 
        <div className="min-h-screen flex flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-grow items-center pt-[76px] justify-center">
            <div className="bg-black bg-opacity-50 rounded-2xl w-full p-6 sm:p-8">
              <div className="text-white mb-8">
                <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">
                Invite Structured, Meaningful Interactions
                </h1>
                <p className="text-sm sm:text-base tracking-wider">
                Whether in comments, chat or, debate, every conversation deserves clarity. 
                  <span className="opacity-80"> Personalize voting options and prevent trolls from rising to the top.</span>
                </p>
              </div>
              
              {/* Update the tabs rendering logic */}

              <div className="tabs mt-8">
              
                  <div className="flex max-w-[800px] mx-auto justify-center">
                    <video 
                      ref={(el) => { videoRefs.current[0] = el; }} // Attach ref for the first video
                      className="rounded-xl shadow-white" 
                      loop 
                      muted 
                      autoPlay
                      preload="metadata"
                    >
                      <source src="/demovids/4.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="demos bg-cover bg-center bg-[#101010] flex-grow" 
        ref={demoSectionRef}
      > 
        <div className="min-h-screen flex flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-grow items-center pt-[76px] justify-center">
            <div className="bg-black bg-opacity-50 rounded-2xl w-full p-6 sm:p-8">
              <div className="text-white mb-8">
                <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">
                Upvotes and Downvotes Create Illusions in Your Data
                </h1>
                <p className="text-sm sm:text-base tracking-wider">
                Pulp balances logic with empathy to foster better communication outcomes. 
                  <span className="opacity-80"> Our tools help to stop the polarization of your audience and customers.</span>
                </p>
              </div>
              
              {/* Update the tabs rendering logic */}

              <div className="tabs mt-8">
                
                  <div className="flex max-w-[800px] mx-auto justify-center">
              <div className="w-[650px] h-[274px] px-5 py-2.5 bg-gradient-to-r from-[#ffcccc] via-[#d1dcff] to-[#daffce] rounded-[10px] shadow justify-between items-center inline-flex">
                <div className="justify-center items-center gap-[5px] flex">
                              <span
                style={{
                  fontFamily: 'var(--font-family-code)'
                }}
              >
                <LetterFx
                className="text-black text-lg font-light font-['Helvetica Neue']"
                  speed="medium"
                  trigger="hover"
                  charset={[
                    'X',
                    '@',
                    '$',
                    'a',
                    'H',
                    'z',
                    'o',
                    '0',
                    'y',
                    '#',
                    '?',
                    '*',
                    '0',
                    '1',
                    '+'
                  ]}
                >
                  Invalid
                  </LetterFx>
                  </span>
                  <div className="justify-start items-center gap-2.5 flex">
                    <div className="w-[19px] h-[19px] relative">
                      {/* Example SVG */}
                      <Image src={'/icons/invalid.svg'} height={19} width={19} alt="Logo" />
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center gap-[5px] flex">
                <LetterFx
                className="text-black text-lg font-light font-['Helvetica Neue']"
                  speed="medium"
                  trigger="hover"
                  charset={[
                    'X',
                    '@',
                    '$',
                    'a',
                    'H',
                    'z',
                    'o',
                    '0',
                    'y',
                    '#',
                    '?',
                    '*',
                    '0',
                    '1',
                    '+'
                  ]}
                >
                  Abstain
                  </LetterFx>
                  <div className="w-[19px] flex h-[19px] relative">
                      {/* Example SVG */}
                      <Image src={'/icons/neutral.svg'} height={19} width={19} alt="Logo" />
                    </div>
                </div>
                <div className="justify-center items-center gap-[5px] flex">
                <LetterFx
                className="text-black text-lg font-light font-['Helvetica Neue']"
                  speed="medium"
                  trigger="hover"
                  charset={[
                    'X',
                    '@',
                    '$',
                    'a',
                    'H',
                    'z',
                    'o',
                    '0',
                    'y',
                    '#',
                    '?',
                    '*',
                    '0',
                    '1',
                    '+'
                  ]}
                >
                  Valid
                  </LetterFx>
                  <div className="w-[19px] h-[19px] relative">
                      {/* Example SVG */}
                      <Image src={'/icons/valid.svg'} height={19} width={19} alt="Logo" />
                    </div>
                </div>
              </div>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="demos bg-cover bg-center bg-[#101010] flex-grow" 
 
      > 
        <div className="min-h-screen flex flex-col max-w-screen-2xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-grow items-center pt-[76px] justify-center">
            <div className="bg-black bg-opacity-50 rounded-2xl w-full p-6 sm:p-8">
              <div className="text-white mb-8">
                <h1 className="text-1xl sm:text-2xl tracking-wide mb-4">
                Engagment Data Tells Stories
                </h1>
                <p className="text-sm sm:text-base tracking-wider">
                Pulp combines creativity with clarity to enhance user interactions. 
                  <span className="opacity-80"> Our custom text effects create engaging experiences, guiding your audience through your message with precision and appeal.</span>
                </p>
              </div>
              
              {/* Update the tabs rendering logic */}

              <div className="tabs mt-8">
                <ExperienceComponent />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
