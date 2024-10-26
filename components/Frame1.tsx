import React from 'react'
import { Flex, RevealFx, Text, Button } from '@/app/once-ui/components'
const Frame1 = () => {
  return (
    <div className="bg-white bg-gradient-to-b from-[#e169ff15] to-transparent">
        <div className='h-screen max-w-[1700px] py-[20px] px-[20px] mx-auto w-full flex items-center'>
            <div className="demo flex flex-col gap-[24px] justify-center  w-full h-full">
                <div className="text flex flex-col gap-[10px] text-black">
                    <div className="title text-2xl tracking-wide">
                        AI Powered All in One Conversation Management System
                    </div>
                    <div className="helper text-xl tracking-wider opacity-80">Capture the invisible dynamics within every exchange—clarity, trust, emotion, reasoning, and relevance. We help organizations:</div>
                </div>

                <div className="feature flex items-center justify-center h-3/4 w-full bg-black bg-opacity-10 rounded-[15px] ">
                        <div className="categories w-full gap-[20px] flex justify-center">
                            <div className="px-[12px] py-[4px] bg-black bg-opacity-50  text-lg rounded-[5px] transition-colors duration-300 inline-block">Inspire Dialogue</div>
                            <div className="px-[12px] py-[4px] bg-black bg-opacity-25  text-lg rounded-[5px] transition-colors duration-300 inline-block">Listen For Details</div>
                            <div className="px-[12px] py-[4px] bg-black bg-opacity-25  text-lg rounded-[5px] transition-colors duration-300 inline-block">See The Big Picture</div>
                        </div>

                </div>
            </div>
        </div>

    </div>
  )
}

export default Frame1
