"use client"
import Link from "next/link";
import MotionIcons from "./MotionIcons";
import {ImCheckboxChecked} from "react-icons/im"
import {ImCheckboxUnchecked} from "react-icons/im"
import { useContext } from "react";
import {ReadTerms} from "../ContextAPI/CheckBoxContext";



export default function TermsComponent(da) {

  const {read,readFunction} = useContext(ReadTerms)
  const check = read.includes(parseInt(da.id))


    return (
  <div key={da.ID}> 
      <Link href={`/MainBody/Terminology/${da.id}`} className="terms" onClick={()=>readFunction(da.id)}  >
      <div className=" relative bg-darkColor2 rounded-md hover:scale-105 transition-all duration-150 delay-75 ease-in-out "
      >
        <div className="absolute right-0 top-0 p-2 text-sm text-green-500 opacity-50" >
        {check ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/> }
        </div>
        <div className=" flex flex-col items-center p-2" >
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

