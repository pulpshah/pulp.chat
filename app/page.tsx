"use client"; // Add this line to make the component a client component

import Image from "next/image";
import Link from "next/link";
import Frame1
 from "@/components/Frame1";
export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Meet you at your inbox!'); // Replace this with your actual submission logic
  };

  return (
    <div className="">

    
    <div className="bg-cover bg-center bg-[url('/images/background.png')]">

    
    <div className="min-h-screen flex-col max-w-[1700px] p-[20px] mx-auto flex justify-start items-center h-screen">

      <div className="nav min-w-[290px] flex justify-between w-full items-center">

        <Link href={'/'}>
        <Image src={'/images/logo.svg'} height={8} width={68} alt="Logo" /> {/* Added alt attribute */}
        </Link>


        <div className="buttons flex gap-[20px]">
        <button className="px-[12px] py-[4px]  bg-opacity-15 hover:bg-opacity-25 text-lg rounded-[5px] transition-opacity">Contact</button>

          <button className="px-[12px] py-[4px] bg-white bg-opacity-15 hover:bg-opacity-25 text-lg rounded-[5px] transition-colors duration-300">Sign Up</button>
        </div>
      </div>

      <div className="card flex min-h-[470px] my-[20px] justify-center items-center w-full h-full">
        <div className="sign-up w-[370px] h-[470px] bg-black bg-opacity-50 rounded-[15px] p-[30px] flex flex-col justify-between">

          <div className="text w-full h-fit flex flex-col gap-[20px]">
              <div className="text-3xl text-white tracking-wide">
                The  Ultimate  Conversation Toolkit. 
                Reveal The True Value Of Being Deliberate.</div>
              <div className="text-base tracking-wider">
                Identify and extract everything that matters. 
                <span className="opacity-80"> Discover opportunities in the engagement happening around your organization, audience, and stakeholders.</span>
              </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
              <input type="email" placeholder="Enter your email" className="px-[12px] py-[4px] rounded-[5px] bg-white bg-opacity-15 border-[.5px] border-white text-lg" required />
              <button type="submit" className="px-[12px] py-[6px] bg-black text-lg rounded-[5px] ">Join Waitlist</button>
          </form>

        </div>
      </div>

    <div className="footer min-w-[278px] flex justify-between w-full">

    <button className="px-[12px] py-[4px] bg-white bg-opacity-15 hover:bg-opacity-25 text-lg rounded-[5px] transition-colors duration-300">Features</button>



          <button className="px-[12px] py-[4px] bg-white bg-opacity-15 hover:bg-opacity-25 text-lg rounded-[5px] transition-colors duration-300">Scroll to Bottom</button>
        </div>
    
    </div>
    </div>
    <Frame1></Frame1>
    </div>
  );
}
