"use client"
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useQuery,useQueryClient } from "react-query";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import MotionTerminology from "@/app/DataQuery/MotionTerminology/page";
import TermsComponent from "@/app/Components/TermsComponents";
import { useRouter } from 'next/navigation';
import Rive from "rive-react";
import RiveComponents from "@/app/Components/RiveComponents/page";
import MotionIcons from "@/app/Components/MotionIcons";
import { useContext } from "react";
import {ReadTerms} from "@/app/ContextAPI/CheckBoxContext";


async function GetDoc (id){
  return await getDocs(query(collection(db, "Motion Graphics Term"), where("id", "==", id)))
}

export function generateStaticParams() {
  const Static = useQuery("staticprams", getDocs(collection(db, "Motion Graphics Term")))
  const StaticId = Static.data?.docs.map(x=>{
    return{
      ...x.data()
    }
  })
  return StaticId?.foreach(x=>{
   id: x.id
  })
}

export default function FurtherEx({params: params}) {
  const router = useRouter()
  const QueryId = params.id
  const QueryIni = useQueryClient()

  const {readFunction} = useContext(ReadTerms)

    const QuerySnap = useQuery(["SingleQuery",QueryId], ()=>GetDoc(+QueryId),{
      refetchOnMount:false,
      refetchOnWindowFocus:false,
      refetchIntervalInBackground:false,
      initialData: ()=>{
        const queryInitial = QueryIni.getQueryData("MotionData")?.data?.docs.map(x=>{
          return {
            ...x.data()
          }
        })
        const Maindata = queryInitial?.find(x=>parseInt(x.id) === parseInt(QueryId))
        if(Maindata){
          return{ QuerySnap: Maindata}
        } 
          else { return undefined }
       
      }
    } )

    const MotionQuery = MotionTerminology()

    const MotionData = MotionQuery.data?.docs.map(doc=>{
      return{
        ...doc.data()
      }
    })

    const filterData = MotionData?.filter(x=>parseInt(x.id) !== parseInt(QueryId))
    
    if(QuerySnap.isLoading){
      return (
     <div className="w-full sm:w-[50%] mx-auto px-2 h-screen" >
      <div className="w-full h-[35%] bg-darkColor2 animate-pulse rounded-sm" />
      <div className="w-full h-[20%] bg-darkColor2 animate-pulse rounded-sm mt-5" />
      <div className="w-full h-[35%] bg-darkColor2 animate-pulse rounded-sm mt-10" />
     </div>
      )
    }
    
    const getdata = QuerySnap.data?.docs.map((dat)=>{
      return {
        ...dat.data()
      }
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
          <Link href={`/MainBody/Terminology/${dat.id}/${dat.Terminology}`}>
          <button className=" text-xl hover:text-green-700 ">
          <FiEdit/>
          </button>
          </Link>
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
    {filterData.map(filtered=>(
      <div key={filtered.id} onClick={()=>readFunction(filtered.id)}>
        {TermsComponent(filtered)}
      </div>
    ))}
   </div>
   </>
  )
}
