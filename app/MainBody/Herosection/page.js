"use client"
import Lottie from "lottie-react";
import CurveAnimation from "@/lib/Lottie/CurveAnimation"
import { Button } from "@/app/Components/Button";




const HeroSection = () => {

  // const [windowSize, setWindowSize] = useState(window.innerWidth);

    return ( 
        <>
        <header className="w-full flex flex-col mb-2 sm:mb-6 ">
          <div className="flex flex-col sm:flex-row justify-between align-middle items-center sm:px-0 mb-2 sm:mb-4">
          <section className=" w-full sm:flex-1 text-xl flex flex-col sm:pl-6 ">
                <h1 className="font-black text-center sm:text-start text-xl md:text-3xl lg:text-5xl opacity-50 leading-normal">
                All the important concepts <br/> you need to know about motion design
                  </h1>
               <div className="w-full flex-col align-middle flex sm:flex-row sm:items-center  mt-2 sm:mt-4 gap-2">
                <div className="flex justify-center">{Button("Learn","/MotionTerms")} </div>
               <div className="flex justify-center">
                <p className="text-xs text-green-500 "><span className="font-bold">100+</span> Students</p>
               </div>
               </div>
            </section>
            <section className=" w-full sm:h-full sm:flex-1 flex sm:justify-center justify-start order-first sm:order-none">
            <div className="w-full opacity-50 text-green-600 ">
                <Lottie animationData={CurveAnimation} loop={true} />
                </div>
            </section>
          </div>
            <section className="w-full h-[100px] opacity-50">

            </section>
        </header>
        </>
     );
}
 
export default HeroSection;


