"use client"
import { motion } from "framer-motion"
import { clamp, useTime, useTransform, AnimatePresence } from "framer-motion"

export default function TextAnimationAcross() {
    const winWidth = window.innerWidth
    const time = useTime()
    const Scroll = useTransform(time, [0,5000],[0,360], {clamp:false} )
    
    console.log(winWidth);
  return (
    <>
      <motion.div 
    initial={{x:"-100vw"}}
    animate={{ x: "100vw" }}
    transition={{duration: 15, repeat:Infinity , ease:"linear"}}
    className="overflow-x-clip origin-left"
    >
        <div className=""><p className="whitespace-nowrap text-2xl sm:text-4xl opacity-50 "><span>Motion design is fun. Be Creative</span><span> Motion design is fun. Be Creative</span></p></div>
    </motion.div>
       <motion.div 
       initial={{x:"-100vw"}}
       animate={{ x: "100vw" }}
       transition={{duration: 15, repeat:Infinity , ease:"linear", delay:7}}
       className="overflow-x-clip origin-left"
       >
           <div className=""><p className="whitespace-nowrap text-2xl sm:text-4xl opacity-50 "><span>Motion design is fun. Be Creative</span><span> Motion design is fun. Be Creative</span></p></div>
       </motion.div>
       </>
  )
}
