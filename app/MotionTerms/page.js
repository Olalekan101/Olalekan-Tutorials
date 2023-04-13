"use client"

import TermsComponent from "../Components/TermsComponents"
import MotionTerminology from "../DataQuery/MotionTerminology/page"
import Link from "next/link"
import {BiArrowBack} from "react-icons/bi"
import { useState, useDeferredValue, useCallback,useMemo, useEffect } from "react"
import { Button } from "@/app/Components/Button";
import { useContext } from "react"
import { ReadTerms } from "../ContextAPI/CheckBoxContext"
import { useRouter } from "next/navigation"
import ComfirmDialog from "../Components/ComfirmDialog"


export default function MotionTermsPage() {
    const {data, isLoading,isError} = MotionTerminology()
    const [input, setInput] = useState('')
    const deValue = useDeferredValue(input)
    const {removeFunction,readFunction,read} = useContext(ReadTerms)
    const router  = useRouter();
    const localLength = read.length
    const [confirm, setConfirm] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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
        ...x.data()
      }
    }),[data])
    const filterTerm = Terms?.filter( (x) => x.Terminology.toLowerCase().includes(deValue.toLowerCase()))
    const ran = useMemo(()=>Math.floor(Math.random() * (Terms?.length - 1 + 1) + 1 ),[Terms])
  
    if(isLoading){
      return <div>Loading...</div>
    }
    if(isError){
      return <div>Sorry Something Want Wrong</div>
    }
  return (
    <>
      {ComfirmDialog(isOpen,handleIsOpen)}
      {/* <Link href={"/"}><BiArrowBack className="text-xl opacity-50"/></Link> */}
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
        TermsComponent(term)
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
