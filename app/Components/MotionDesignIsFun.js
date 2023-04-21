"use client"

import { useRive } from "rive-react";


export default function MotionDesignIsFun() {

    const {rive, RiveComponent} = useRive({
        src:"Scroll1.riv",
        autoplay:true
    })

    const handlePause=()=>{
        if(rive){
            rive.pause();
        }
    }

    const handlePlay=()=>{
        if(rive){
            rive.play();
        }
    }

  return (
    <div className="w-full h-[100px] opacity-50 relative " >
        <RiveComponent onMouseEnter={handlePause} onMouseLeave={handlePlay} />
        <div className="absolute object-cover" >
        </div>
    </div>
  )
}
