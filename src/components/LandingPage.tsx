import { FC } from "react"

import { useNavigate } from "react-router-dom";



const LandingPage:FC= () => {

    const navigate = useNavigate()

    return (
      <div className="relative h-screen overflow-hidden cursor-default bg-gradient-to-tr from-[#F0E3D0] to-[#F3C278]">

        <div className="relative flex flex-col items-center justify-center h-full px-6">
         
          <div className="mb-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-2xl text-amber-700">📝</span>
            </div>
          </div>
  
  
          <div className="w-full max-w-md backdrop-blur-sm bg-white/30 rounded-2xl p-8 shadow-xl ">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-amber-900 mb-3">
                Welcome to MindMemo
              </h2>
              <p className="text-lg text-amber-800 mb-8">
                Your personal journal for mindful reflection.
              </p>
            </div>
  
            <div className="space-y-4">
              <button className="w-full px-6 py-3 text-white font-medium 
                bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors
                duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" onClick={()=>navigate("/signup")}>
                Sign Up
              </button>
  
              <button className="w-full px-6 py-3 text-amber-700 font-medium 
                bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors
                duration-200 border border-amber-200 shadow-md hover:shadow-lg
                transform hover:-translate-y-0.5" onClick={()=>navigate("/login")}>
                Sign In
              </button>
            </div>
          </div>
  
          <p className="mt-8 text-amber-800 text-sm">
            Start your journaling journey today
          </p>

          <div className="md:text-md text-sm absolute bottom-3 text-amber-700">developed by <a className="underline" href="https://github.com/shounaklohokare">shounaklohokare</a></div>

        </div>
      </div>
    );
  };

export default LandingPage;