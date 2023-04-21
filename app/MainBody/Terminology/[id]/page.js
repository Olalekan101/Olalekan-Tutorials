"use client"
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery } from "react-query";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import TermsComponent from "@/app/Components/TermsComponents";
import MotionIcons from "@/app/Components/MotionIcons";
import { useContext } from "react";
import {ReadTerms} from "@/app/ContextAPI/CheckBoxContext";
import { AuthContext } from "@/app/ContextAPI/auth-context";
import {LoadingPlane} from "../../../../lib/Lottie/index"
import Lottie from "lottie-react";
import { useState,useMemo } from "react";
import {MdDeleteForever} from "react-icons/md"
import { redirect, useRouter } from "next/navigation";


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
  

  const deleteHandler = async (id)=>{
    const Del = doc(db, "Motion Graphics Term", id);
    try {
      await deleteDoc(Del);
      router.push("/MotionTerms")
      
    } catch (error) {
      console.log(error);
    }
    
  }

  const {data, isLoading,isError} = useQuery("MotionData", TermCache,{
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  const Terms = data?.docs.map((x)=>{
    return{
      ID: x.id,
      ...x.data()
    }
  })

  const TermData = useMemo(()=>data?.docs.map((d)=>{
    return{
      ID: d.id,
      ...d.data()
    }
  }),[data])

    const QuerySnap = useQuery(["SingleQuery",QueryId], ()=>GetDoc(QueryId),{
      refetchOnMount:false,
      refetchOnWindowFocus:false,
      refetchIntervalInBackground:false} )

    
    if(QuerySnap.isLoading){
      return <Lottie animationData={LoadingPlane}  loop={true} />
    }
    
    const getdata = QuerySnap.data?.docs.map((dat)=>{
      return {
        ID:dat.id,
        ...dat.data()
      }
    })
    const filteredData = Terms?.filter(x=>{
      return x.id !== QueryId
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
          { user?.uid === admin2 ?
          <div className="flex text-xl" >
            <Link href={`/MainBody/Terminology/${dat.id}/${dat.ID}`}>
          <button className=" text-xl hover:text-green-700 ">
          <FiEdit/>
          </button>
          </Link>
           <button className=" text-xl hover:text-green-700" onClick={()=>deleteHandler(dat.ID)} >
           <MdDeleteForever/>
           </button>
          </div>
          : "🆓"}
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
