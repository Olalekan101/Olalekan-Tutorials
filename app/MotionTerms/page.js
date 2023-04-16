"use client"

import Link from "next/link"
import { useState, useDeferredValue, useCallback,useMemo, useEffect } from "react"
import { useContext } from "react"
import { ReadTerms } from "../ContextAPI/CheckBoxContext"
import ComfirmDialog from "../Components/ComfirmDialog"
import {LoadingPlane} from "../../lib/Lottie/index"
import Lottie from "lottie-react";

import MotionIcons from "../Components/MotionIcons"
import {ImCheckboxChecked} from "react-icons/im"
import {ImCheckboxUnchecked} from "react-icons/im"
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TermCache = async()=>{
  return await getDocs(collection(db, "Motion Graphics Term"));
}


export default function MotionTermsPage() {
  
  const [input, setInput] = useState('')
  const deValue = useDeferredValue(input)
  const {readFunction,read} = useContext(ReadTerms)
  const [isOpen, setIsOpen] = useState(false)
  const TermsIDs =[]
  
  const {data, isLoading,isError} = useQuery("MotionData", TermCache,{
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

    const handleIsOpen = ()=>{
      setIsOpen(!isOpen)
    }

    const handleRefresh=()=>{
      return Refresh.refresh()
    }

    const HandleChange=(e)=>{
      e.preventDefault()
      setInput(e.target.value)
    }
    const Terms = useMemo(()=>data?.docs.map((x)=>{
      return{
        ID: x.id,
        ...x.data()
      }
    }),[data])
    

    const filterTerm = Terms?.filter( (x) => x.Terminology.toLowerCase().includes(deValue.toLowerCase()))
    const ran = useMemo(()=>Math.floor(Math.random() * (Terms?.length - 1 + 1) + 1 ),[Terms])
    const populateID = Terms?.forEach(x=>TermsIDs.push(x.id))
    console.log(TermsIDs);
    if(isLoading){
      return <Lottie animationData={LoadingPlane} loop={true} />
    }
    if(isError){
      return <div>Sorry Something Want Wrong</div>
    }

    const check = read.includes(TermsIDs)

  return (
    <>
      {ComfirmDialog(isOpen,handleIsOpen)}
      <section className="mb-6 mt-2 flex gap-2 align-middle">
        <div>
          <p className="font-extrabold text-3xl sm:text-5xl opacity-50" >Concept that you<br/> need to understand</p>
          </div>
      </section>
      <section>
        <div className="h-[100px] w-full"/>
      </section>
      <section className="flex justify-center my-5 focus:ring-slate-200 ">
        <input type={"search"} value={input} onChange={HandleChange} placeholder="Search" 
        className="bg-transparent rounded-lg text-sm w-[70%] sm:text-lg sm:w-[50%] focus:ring-green-500 focus:ring-2 "
        />
      </section>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 px-2 sm:px-0  w-full">
      {filterTerm?.map(term=>(
        <div key={term.ID}>
      <Link href={`/MainBody/Terminology/${term.id}`} className="terms" onClick={()=>readFunction(term.id)}  >
      <div className=" relative bg-darkColor2 rounded-md hover:scale-105 transition-all duration-150 delay-75 ease-in-out "
      >
        <div className="absolute right-0 top-0 p-2 text-sm text-green-500 opacity-50" >
        {check ? <ImCheckboxChecked/> : <ImCheckboxUnchecked/> }
        </div>
        <div className=" flex flex-col items-center p-2" >
        <div className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
      {MotionIcons(term.Terminology,'iconStyle')}  
          </div>
          <div className="font-bold text-center overflow-x-hidden text-ellipsis text-sm sm:text-base whitespace-nowrap">{term.Terminology}
          </div>
          <div className="line-clamp-2 text-sm text-center">
            {term.Explanation}
          </div>
        </div>
      </div>
    </Link>
  </div>
      ))}
      </section>
      { filterTerm?.length === 0 ? <div className="w-full flex justify-center flex-col items-center" >
        <div>
        <p className="opacity-50">No matching results 😞</p>
        </div>
        <Link href={`/MainBody/Terminology/${ran}`} 
        onClick={()=>readFunction(parseInt(ran))}
        className="p-2 sm:p-4 text-sm sm:text-base bg-darkColor2 font-bold rounded-md mt-2"
        >Pick Random</Link>
        </div> 
        : "" }
        {
          filterTerm?.length === 0 ? "" : 
            read?.length === 0 ? "" : 
            <section className="flex justify-center w-full my-5 ">
          <button className="btnStyle" onClick={()=> handleIsOpen()} >
            Reset Lesson</button>
        </section>
          
        }
    </>
  )
}
