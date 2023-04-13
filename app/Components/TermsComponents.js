"use client"
import Link from "next/link";
import MotionIcons from "./MotionIcons";
import {ImCheckboxChecked} from "react-icons/im"
import {ImCheckboxUnchecked} from "react-icons/im"
import { useContext } from "react";
import {ReadTerms} from "../ContextAPI/CheckBoxContext";
import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";


// const staggerTerms = stagger(0.1, { startDelay: 0.15 });

function handleStagger(isOpen){
  const [scope,animate] = useAnimate();
  useEffect(()=>{
    animate(
      scope.current,
      isOpen
      ? { opacity: 1}
      : { opacity: 0},
      {
        duration: 0.2,
        delay: isOpen ? stagger(0.2) : 0
      }
    )


  },[isOpen])

  return scope

}



export default function TermsComponent(da, i) {

  const {read,readFunction,removeFunction} = useContext(ReadTerms)
  const check = read.includes(parseInt(da.id))
  // const [isOpen, setIsOpen] = useState(false);
  // const scope = handleStagger(isOpen);

  // useEffect(()=>{
  //   setIsOpen(!isOpen)
  // },[])

    return (
  <div>
      <Link href={`/MainBody/Terminology/${da.id}`} key={da.id} className="terms" onClick={()=>readFunction(da.id)}  >
      <div key={da.id} className=" relative bg-darkColor2 rounded-md hover:scale-105 transition-all duration-150 delay-75 ease-in-out "
      >
        <div className="absolute right-0 top-0 p-2 text-sm text-green-500 opacity-50" >
        {check ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/> }
        </div>
        <div className=" flex flex-col items-center p-2" key={da.id}>
        <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
      {MotionIcons(da.Terminology,'iconStyle')}  
          </div>
          <div className="font-bold text-center overflow-x-hidden text-ellipsis text-sm sm:text-base whitespace-nowrap">{da.Terminology}
          </div>
          <div className="line-clamp-2 text-sm text-center">
            {da.Explanation}
          </div>
        </div>
      </div>
    </Link>
  </div>
    )
  }

