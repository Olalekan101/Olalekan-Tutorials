"use client"

import Link from "next/link";
import MotionTerminology from "@/app/DataQuery/MotionTerminology/page";
import TermsComponent from "@/app/Components/TermsComponents";
import { FiArrowUpLeft } from "react-icons/fi";
import { useContext } from "react";
import {ReadTerms} from "@/app/ContextAPI/CheckBoxContext";

const loader = [
  {
    id: 1,
    load:''
  },
  {
    id: 2,
    load:''
  },
  {
    id: 3,
    load:''
  },
  {
    id: 4,
    load:''
  },
  {
    id: 5,
    load:''
  },
  {
    id: 6,
    load:''
  },
  {
    id: 7,
    load:''
  }
]


export default function Terminology() {
  const {data,isLoading,isSuccess} = MotionTerminology()
  const {read,readFunction,removeFunction} = useContext(ReadTerms)

   if(isLoading){
     return <div>Loading...</div>
   }
    const datxa = data?.docs.map((doc)=>{
      return{
        ...doc.data()
      }})
      const dataa = datxa.slice(0,8)
  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-full font-bold text-xl sm:text-2xl opacity-50 px-2 sm:p-4 pb-6"><p>Terms you should know</p></div>
       <section className="gridsetup relative">
          {isSuccess && dataa.map(da=>(
            <div key={da.id} onClick={()=>readFunction(da.id)} >
              {TermsComponent(da)}
            </div>
              ))}
        </section>
        <div className=" my-4 flex justify-center w-full "><Link href='/MotionTerms ' className="p-2 border border-green-500 rounded-md hover:bg-green-500" >Show More</Link></div>
    </div>
  )
          }


