"use client"

import Link from "next/link";
import TermsComponent from "@/app/Components/TermsComponents";
import { useContext } from "react";
import {ReadTerms} from "@/app/ContextAPI/CheckBoxContext";
import { useQuery } from "react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {LoadingPlane} from "../../../lib/Lottie/index"
import Lottie from "lottie-react";

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

const TermCache = async()=>{
  return await getDocs(collection(db, "Motion Graphics Term"));
}


export default function Terminology() {
  const {data,isLoading,isSuccess} = useQuery("MotionData", TermCache,{
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  const {read,readFunction,removeFunction} = useContext(ReadTerms)

   if(isLoading){
     return <Lottie animationData={LoadingPlane} loop={true} />
   }
    const datxa = data?.docs.map((doc)=>{
      return{
        ID: doc.id,
        ...doc.data()
      }})
      const dataa = datxa.slice(0,8)
  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-full font-bold text-xl sm:text-2xl opacity-50 px-2 sm:p-4 pb-6"><p>Terms you should know</p></div>
       <section className="gridsetup relative">
          {dataa?.map(da=>(
            <div key={da.id} onClick={()=>readFunction(da.id)} >
              {TermsComponent(da)}
            </div>
              ))}
        </section>
        <div className=" my-4 flex justify-center w-full "><Link href='/MotionTerms ' className="p-2 border border-green-500 rounded-md hover:bg-green-500" >Show More</Link></div>
    </div>
  )
          }


