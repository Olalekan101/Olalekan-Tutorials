"use client"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "react-query";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import TermsComponent from "@/app/Components/TermsComponents";
import { useRouter } from 'next/navigation';
import MotionIcons from "@/app/Components/MotionIcons";
import { useContext } from "react";
import {ReadTerms} from "@/app/ContextAPI/CheckBoxContext";
import { AuthContext } from "@/app/ContextAPI/auth-context";
import {LoadingPlane} from "../../../../lib/Lottie/index"
import Lottie from "lottie-react";
import { useState,useMemo } from "react";


async function GetDoc (id){
  return await getDocs(query(collection(db, "Motion Graphics Term"), where("id", "==", id)))
}

const TermCache = async()=>{
  return await getDocs(collection(db, "Motion Graphics Term"));
}


export default function FurtherEx({params: params}) {
  const router = useRouter()
  const QueryId = params.id
  const {user} = useContext(AuthContext)
  const {readFunction} = useContext(ReadTerms)
  const admin2 = process.env.NEXT_PUBLIC_ADMIN_ID
  const admin3 = process.env.SECRET_ADMIN_ID
  
  const {data, isLoading,isError} = useQuery("MotionData", TermCache,{
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  const Terms = useMemo(()=>data?.docs.map((x)=>{
    return{
      ID: x.id,
      ...x.data()
    }
  }),[data])

  const TermData = useMemo(()=>data?.docs.map((d)=>{
    return{
      ...d.data()
    }
  }),[data])

    const QuerySnap = useQuery(["SingleQuery",QueryId], ()=>GetDoc(+QueryId),{
      refetchOnMount:false,
      refetchOnWindowFocus:false,
      refetchIntervalInBackground:false} )

    
    if(QuerySnap.isLoading){
      return <Lottie animationData={LoadingPlane}  loop={true} />
    }
    
    const getdata = QuerySnap.data?.docs.map((dat)=>{
      return {
        ...dat.data()
      }
    })
    

    const filteredData = Terms?.filter(x=>{
      return parseInt(x.id) !== parseInt(QueryId)
    })

  return (
    <>
   <section className="flex flex-col sm:flex-row">
     <div className=" w-full sm:w-[50%] mx-auto px-2">
      { QuerySnap.isSuccess && getdata.map((dat)=>{
        return(
          <div key={dat.id}>
          <div className="font-bold text-2xl sm:text-4xl opacity-50 py-2">{dat.Terminology}</div>
          <div className="text-sm sm:text-base">{dat.Explanation}</div>
          <div className="flex justify-between">
          <button className=" text-xl hover:text-green-700 " onClick={()=>router.back()}>
          <BiArrowBack/>
          </button>
          { user?.uid === admin2 ? <Link href={`/MainBody/Terminology/${dat.id}/${dat.Terminology}`}>
          <button className=" text-xl hover:text-green-700 ">
          <FiEdit/>
          </button>
          </Link> : "🆓"}
          </div>
          </div>
        )
      })}
      </div>
      <div className=" flex justify-center items-center w-full sm:w-[50%] order-first sm:order-none">
        <div className="h-[100px]"/>
        { QuerySnap.isSuccess && getdata.map((dat)=>{
          return (
              <div key={dat.id} >
              {MotionIcons(dat.Terminology,'iconStyle2')}
              </div>
          )
        })}
      </div>
   </section>
   <div className="gridsetup pt-5">
    {filteredData.map(filtered=>(
      <div key={filtered.id} onClick={()=>readFunction(filtered.id)}>
        {TermsComponent(filtered)}
      </div>
    ))}
   </div>
   </>
  )
}
