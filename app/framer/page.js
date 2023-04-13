"use client"
import { motion, Variants, useScroll, useTransform, useAnimation } from "framer-motion"
import { useState } from "react"


export default function page() {
    const [show, setShow] = useState(false)
    const animate = useAnimation()

    const {scrollY} = useScroll()

    const opacity = useTransform(
        scrollY,
        [0,'200vh'],
        [100,0]
    )

    const test ={
            ini:{
                opacity:0,
                y:20,
                transition:{
                    delay:0.5,
                    duration:2,
                    when: "beforeChildren",
                    staggerChildren: 2,
                }
            },
            complete:{
                opacity:1,
                y:0,
            }

    }
    const child ={
        ini:{
            opacity:0,
            y:30,
            transition:{
                delay:6,
                duration:10
            }
        },
        complete:{
            opacity:1,
            y:0
        }
    }

  return (
        <>
        <motion.div>
        <motion.button
            whileHover={{
                scale:1.5,
                y:10,
            }}
            onHoverStart={()=>setShow(!show)}
            onHoverEnd={()=>setShow(!show)}
        >
            Button
        </motion.button>
        <div style={{display: show ? "flex" : "none" }}  ><p>Just Click the Button</p></div>
        <div className="w-full flex justify-center">
            <motion.div 
            variants={test}
            initial='ini'
            animate='complete'
            className="h-[100px] w-[100px] bg-green-500 ">
                <motion.div className="h-[50px] w-[50px] rounded-full bg-slate-500"
                variants={child}
                >
                    
                </motion.div>
            </motion.div>
        </div>
        </motion.div>
        <motion.div className="h-[10px] w-screen bg-red-500 fixed origin-left" />
        <div className="h-[200vh] flex justify-center items-center">
            <h1 className="text-8xl" style={{opacity}}>Scroll</h1>
        </div>
        </>
  )
}
